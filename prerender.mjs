/**
 * prerender.mjs
 * Rellena en index.html las 4 listas (noticias, tutoriales, apps, prompts)
 * con HTML real, para que Google las vea sin ejecutar JavaScript.
 *
 * - Lee los feeds y las listas estáticas directamente de app.js (fuente única).
 * - Trae los RSS desde el servidor (aquí no hay problema de CORS, no hace falta rss2json).
 * - Solo escribe entre los marcadores <!-- PRERENDER:xxx:START --> y <!-- PRERENDER:xxx:END -->.
 * - Si todos los feeds fallan, deja las noticias como estaban.
 */

import fs from 'node:fs';
import vm from 'node:vm';
import Parser from 'rss-parser';

const INDEX_FILE = 'index.html';
const APP_FILE = 'app.js';

// ---------- Utilidades ----------

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const safeUrl = (u) => (/^https?:\/\//i.test(u || '') ? u : '#');

function decodeEntities(s) {
  return String(s ?? '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&amp;/g, '&');
}

function limpiarTexto(html, max = 200) {
  const plano = decodeEntities(String(html ?? '').replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
  return plano ? plano.substring(0, max) + '...' : '';
}

function formatDate(d) {
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
}

function isoDate(d) {
  const date = new Date(d);
  return Number.isNaN(date.getTime()) ? '' : date.toISOString();
}

const porFechaDesc = (a, b) => new Date(b.date) - new Date(a.date);

// ---------- Datos desde app.js ----------

function cargarDatos() {
  const code = fs.readFileSync(APP_FILE, 'utf8');
  const noop = () => {};
  const ctx = vm.createContext({
    document: { getElementById: () => null, addEventListener: noop },
    console: { log: noop, warn: noop, error: noop },
    fetch: async () => {
      throw new Error('fetch no disponible en el pre-render de app.js');
    },
  });
  return vm.runInContext(
    code + '\n;({ RSS_FEEDS, TUTORIAL_FEEDS, TUTORIALS, APPS, PROMPTS })',
    ctx
  );
}

// ---------- Feeds ----------

const parser = new Parser({
  timeout: 15000,
  headers: { 'User-Agent': 'Mozilla/5.0 (compatible; iaforall-prerender/1.0)' },
});

async function leerFeed(feed) {
  try {
    const data = await parser.parseURL(feed.url);
    const items = data.items || [];
    console.log(`✅ ${feed.name}: ${items.length} elementos`);
    return items;
  } catch (e) {
    console.warn(`⚠️ ${feed.name}: ${e.message}`);
    return [];
  }
}

async function obtenerNoticias(RSS_FEEDS) {
  const todas = [];
  for (const feed of RSS_FEEDS) {
    const items = await leerFeed(feed);
    for (const item of items.slice(0, 8)) {
      todas.push({
        title: item.title || '',
        link: item.link || '',
        description: limpiarTexto(item.contentSnippet || item.content || item.summary),
        date: item.isoDate || item.pubDate || '',
        sourceName: feed.name,
      });
    }
  }
  return todas.filter((n) => n.title && n.link).sort(porFechaDesc);
}

async function obtenerTutoriales(TUTORIAL_FEEDS, TUTORIALS) {
  const todos = [];
  for (const feed of TUTORIAL_FEEDS) {
    const items = await leerFeed(feed);
    for (const item of items.slice(0, 4)) {
      const esYouTube = feed.source.startsWith('youtube-');
      const category = esYouTube ? 'Video' : item.categories?.[0] || 'Tutorial';
      const title = item.title || '';
      const texto = (title + ' ' + (item.contentSnippet || item.content || '')).toLowerCase();

      // Mismo filtro básico de portugués que app.js
      if (
        texto.includes('inteligência artificial') ||
        texto.includes('aprendizado de máquina') ||
        texto.includes('como fazer')
      ) {
        continue;
      }
      if (!title || !item.link) continue;

      todos.push({
        title,
        link: item.link,
        description: limpiarTexto(item.contentSnippet || item.content || item.summary),
        date: item.isoDate || item.pubDate || '',
        sourceName: feed.name,
        category,
      });
    }
  }

  if (todos.length === 0) return TUTORIALS;

  const faltan = Math.max(0, 9 - todos.length);
  if (faltan > 0) todos.push(...TUTORIALS.slice(0, faltan));
  return todos.sort(porFechaDesc);
}

// ---------- Plantillas (mismo HTML que genera app.js) ----------

const cardNoticia = (n) => `        <li class="card">
          <h3><a href="${esc(safeUrl(n.link))}" target="_blank" rel="noopener">${esc(n.title)}</a></h3>
          <p>${esc(n.description)}</p>
          <div class="meta">
            <span class="badge">${esc(n.sourceName)}</span>
            <time datetime="${esc(isoDate(n.date))}">${esc(formatDate(n.date))}</time>
          </div>
        </li>`;

const cardTutorial = (t) => `        <li class="card">
          <h3><a href="${esc(safeUrl(t.link))}" target="_blank" rel="noopener">${esc(t.title)}</a></h3>
          <p>${esc(t.description)}</p>
          <div class="meta">
            <span class="badge">${esc(t.category)}</span>
            ${t.sourceName ? `<span class="badge">${esc(t.sourceName)}</span>` : ''}
            <time datetime="${esc(isoDate(t.date))}">${esc(formatDate(t.date))}</time>
          </div>
        </li>`;

const cardApp = (a) => `        <li class="card">
          <h3><a href="${esc(safeUrl(a.link))}" target="_blank" rel="noopener">${esc(a.name)}</a></h3>
          <p>${esc(a.description)}</p>
          <div class="meta">
            <span class="badge">${esc(a.category)}</span>
            <span>${esc(a.rating)}</span>
          </div>
        </li>`;

const cardPrompt = (p) => `        <li class="card">
          <h3>${esc(p.title)}</h3>
          <p><strong>Prompt:</strong> ${esc(p.prompt)}</p>
          <p class="meta">${esc(p.example)}</p>
          <div class="meta">
            <span class="badge">${esc(p.category)}</span>
          </div>
        </li>`;

// ---------- Escritura en index.html ----------

function reemplazarBloque(html, clave, interior) {
  const re = new RegExp(
    `(<!-- PRERENDER:${clave}:START -->)[\\s\\S]*?(<!-- PRERENDER:${clave}:END -->)`
  );
  if (!re.test(html)) {
    throw new Error(
      `No encuentro los marcadores PRERENDER:${clave} en ${INDEX_FILE}. ` +
        `¿Has subido el index.html actualizado?`
    );
  }
  return html.replace(re, (_, inicio, fin) => `${inicio}\n${interior}\n        ${fin}`);
}

async function main() {
  const { RSS_FEEDS, TUTORIAL_FEEDS, TUTORIALS, APPS, PROMPTS } = cargarDatos();
  let html = fs.readFileSync(INDEX_FILE, 'utf8');

  const noticias = await obtenerNoticias(RSS_FEEDS);
  if (noticias.length > 0) {
    html = reemplazarBloque(html, 'news', noticias.map(cardNoticia).join('\n'));
  } else {
    console.warn('⚠️ Ningún feed de noticias respondió: se conservan las noticias anteriores');
  }

  const tutoriales = await obtenerTutoriales(TUTORIAL_FEEDS, TUTORIALS);
  html = reemplazarBloque(html, 'tutorials', tutoriales.map(cardTutorial).join('\n'));
  html = reemplazarBloque(html, 'apps', APPS.map(cardApp).join('\n'));
  html = reemplazarBloque(html, 'prompts', PROMPTS.map(cardPrompt).join('\n'));

  fs.writeFileSync(INDEX_FILE, html, 'utf8');
  console.log(
    `✅ index.html actualizado: ${noticias.length} noticias, ${tutoriales.length} tutoriales, ` +
      `${APPS.length} apps, ${PROMPTS.length} prompts`
  );
}

await main();
