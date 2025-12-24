// Data — editable content
const FEEDS = [
  { name: "Xataka IA", url: "https://www.xataka.com/tag/inteligencia-artificial/rss2.xml", lang: "es" },
  { name: "Mentes Artificiales (USEO)", url: "https://useo.es/mentes-artificiales/feed/", lang: "es" },
  { name: "Hipertextual IA", url: "https://hipertextual.com/tag/inteligencia-artificial/feed", lang: "es" },
  { name: "OpenAI", url: "https://openai.com/blog/rss.xml", lang: "en" },
  { name: "TechCrunch AI", url: "https://techcrunch.com/category/artificial-intelligence/feed/", lang: "en" },
  { name: "MIT Tech Review", url: "https://www.technologyreview.com/feed/", lang: "en" },
  { name: "VentureBeat AI", url: "https://venturebeat.com/category/ai/feed/", lang: "en" },
];

const TUTORIAL_FEEDS = [
  { name: "Hugging Face Blog", url: "https://huggingface.co/blog/feed.xml", category: "ML/AI" },
  { name: "Machine Learning Mastery", url: "https://machinelearningmastery.com/feed/", category: "Principiantes" },
  { name: "Analytics Vidhya", url: "https://www.analyticsvidhya.com/feed/", category: "Data Science" },
  { name: "AI News", url: "https://artificialintelligence-news.com/feed/", category: "Noticias IA" },
];

const APP_FEEDS = [
  // Los feeds de apps no funcionan bien con RSS2JSON, usamos contenido estático enriquecido
];

const PROMPT_FEEDS = [
  // Los feeds de prompts no funcionan de forma confiable con RSS2JSON, usamos contenido estático curado
];

const TUTORIALS = [
  { title: "Empezando con ChatGPT: trucos básicos", category: "Principiantes", summary: "Conceptos clave, ejemplos y buenas prácticas para tus primeros pasos.", url: "https://chat.openai.com/" },
  { title: "Automatiza tareas con IA y Zapier", category: "Automatización", summary: "Conecta apps y crea flujos con IA para ahorrar tiempo.", url: "https://zapier.com/" },
  { title: "Prompt Engineering: guía breve", category: "Prompts", summary: "Estructuras útiles para prompts claros y reutilizables.", url: "https://www.deeplearning.ai/short-courses/" },
  { title: "Vision AI en tu móvil", category: "Multimedia", summary: "Usa apps para reconocimiento de imagen y OCR con IA.", url: "https://lens.google/" },
];

const APPS = [
  { name: "Notion AI", category: "Productividad", review: "Excelente para resumir, reescribir y generar contenido en tus notas.", url: "https://www.notion.so/product/ai" },
  { name: "Perplexity", category: "Búsqueda", review: "Respuestas con fuentes y muy buenas capacidades de exploración.", url: "https://www.perplexity.ai/" },
  { name: "Midjourney", category: "Imagen", review: "Para generar imágenes creativas con prompts. Resultados sorprendentes.", url: "https://www.midjourney.com/" },
  { name: "CapCut", category: "Video", review: "Herramientas asistidas por IA para edición rápida y subtítulos.", url: "https://www.capcut.com/" },
  { name: "Claude", category: "Productividad", review: "Asistente de IA conversacional con excelente comprensión de contexto largo.", url: "https://claude.ai/" },
  { name: "Gamma", category: "Presentaciones", review: "Crea presentaciones profesionales con IA en minutos.", url: "https://gamma.app/" },
  { name: "Otter.ai", category: "Productividad", review: "Transcripción automática de reuniones y notas en tiempo real.", url: "https://otter.ai/" },
  { name: "Runway", category: "Video", review: "Suite completa de herramientas de IA para edición de video creativa.", url: "https://runwayml.com/" },
  { name: "Grammarly", category: "Escritura", review: "Mejora tu escritura con sugerencias de gramática, tono y claridad.", url: "https://www.grammarly.com/" },
  { name: "Fireflies.ai", category: "Productividad", review: "Asistente de reuniones que graba, transcribe y resume automáticamente.", url: "https://fireflies.ai/" },
  { name: "ChatGPT", category: "Asistentes IA", review: "El asistente de IA más popular. Sube archivos, analiza datos y obtén insights útiles.", url: "https://chat.openai.com/" },
  { name: "Grok", category: "Asistentes IA", review: "Asistente de IA con mínima censura, integrado en X. Excelente para generar imágenes.", url: "https://grok.x.ai/" },
  { name: "Gemini", category: "Asistentes IA", review: "Asistente de Google con ventana de contexto de 1M tokens. Genera resúmenes en audio.", url: "https://gemini.google.com/" },
  { name: "Synthesia", category: "Video", review: "Genera videos profesionales con avatares de IA sin cámara ni estudio.", url: "https://www.synthesia.io/" },
  { name: "OpusClip", category: "Video", review: "Convierte videos largos en clips virales para redes sociales automáticamente.", url: "https://www.opus.pro/" },
  { name: "Nano Banana", category: "Imagen", review: "Generador de imágenes con IA de última generación.", url: "https://nanobanana.com/" },
  { name: "Canva Magic Studio", category: "Diseño", review: "Suite de herramientas de IA para diseño gráfico profesional sin esfuerzo.", url: "https://www.canva.com/" },
  { name: "ElevenLabs", category: "Audio", review: "Generación de voz realista con IA en múltiples idiomas y tonos.", url: "https://elevenlabs.io/" },
  { name: "Suno", category: "Audio", review: "Crea música original con IA desde texto. Ideal para compositores y creadores.", url: "https://suno.ai/" },
  { name: "Cursor", category: "Programación", review: "Editor de código con IA integrada para programadores.", url: "https://www.cursor.com/" },
];

const PROMPTS = [
  { text: "Explícame este tema como si tuviera 12 años: [tema]", category: "Aprendizaje" },
  { text: "Actúa como asesor de productividad y crea un plan diario basado en estas tareas: [lista]", category: "Productividad" },
  { text: "Genera ideas de contenido para redes sobre [tema] en un tono casual y cercano", category: "Contenido" },
  { text: "Analiza este texto y crea un resumen accionable en 5 viñetas", category: "Resumen" },
  { text: "Propón 3 mejoras concretas para este proceso: [descripción]", category: "Mejora" },
  { text: "Eres un experto en [campo]. Dame una guía paso a paso para [objetivo]", category: "Aprendizaje" },
  { text: "Reformula este email para que suene más profesional pero amigable: [email]", category: "Escritura" },
  { text: "Genera 10 titulares llamativos para un artículo sobre: [tema]", category: "Contenido" },
  { text: "Actúa como coach personal. Ayúdame a definir objetivos SMART para: [meta]", category: "Productividad" },
  { text: "Crea una analogía simple para explicar [concepto técnico] a principiantes", category: "Aprendizaje" },
  { text: "Lista pros y contras de [decisión] considerando estos factores: [factores]", category: "Análisis" },
  { text: "Escribe un script de 60 segundos para video sobre [tema] dirigido a [audiencia]", category: "Contenido" },
  { text: "Actúa como asesor especializado en optimización de vuelos económicos. Propón rutas y recomendaciones basadas en ahorro, comparando opciones y condiciones.\n\n#INFORMACIÓN DEL USUARIO:\n- Origen: [ORIGEN]\n- Destino: [DESTINO]\n- Fechas del viaje (rango): [FECHAS]\n- Flexibilidad (sí/no y rango): [FLEXIBILIDAD]\n- Prioridad principal (precio/tiempo/escalas): [PRIORIDAD]\n\nDevuelve:\n1. Entre 3 y 5 rutas habituales con breve explicación.\n2. Mejor ventana estimada de compra y días convenientes para volar.\n3. Checklist para comparar rutas (tarifa base, equipaje, escalas, duración total).", category: "Productividad" },
];

// Helpers
const el = (sel) => document.querySelector(sel);
const formatDate = (d) => new Date(d).toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" });

// RSS fetch using RSS2JSON to bypass CORS
async function fetchFeed(url) {
  const proxy = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`;
  const res = await fetch(proxy);
  if (!res.ok) throw new Error(`Feed error: ${url}`);
  const data = await res.json();
  if (data.status !== 'ok') throw new Error(`Feed parse error: ${url}`);
  return data.items.map(item => ({
    title: item.title || "(sin título)",
    link: item.link || "",
    pubDate: item.pubDate || new Date().toISOString(),
    summary: item.description ? item.description.replace(/<[^>]*>/g, "").substring(0, 200) : "",
  }));
}

async function fetchFeeds() {
  const sourceSelect = el("#newsSourceFilter");
  // populate sources
  FEEDS.forEach((f) => {
    const opt = document.createElement("option");
    opt.value = f.name; opt.textContent = f.name; sourceSelect.appendChild(opt);
  });

  const results = [];
  await Promise.all(
    FEEDS.map(async (f) => {
      try {
        const items = await fetchFeed(f.url);
        const tagged = items.slice(0, 10).map((it) => ({ ...it, source: f.name }));
        results.push(...tagged);
      } catch (e) {
        console.warn("Feed fail:", f.name, e.message);
      }
    })
  );

  // sort by language first (español primero), then by date
  results.sort((a, b) => {
    const langA = FEEDS.find(f => f.name === a.source)?.lang || 'en';
    const langB = FEEDS.find(f => f.name === b.source)?.lang || 'en';
    if (langA !== langB) return langA === 'es' ? -1 : 1;
    return new Date(b.pubDate) - new Date(a.pubDate);
  });
  renderNews(results);
}

function renderNews(items) {
  const list = el("#newsList");
  list.innerHTML = "";
  items.forEach((it) => {
    const li = document.createElement("li");
    li.className = "card";
    li.innerHTML = `
      <h3><a href="${it.link}" target="_blank" rel="noopener">${it.title}</a></h3>
      <p class="meta">${it.source} · ${formatDate(it.pubDate)}</p>
      ${it.summary ? `<p>${it.summary.replace(/<[^>]*>/g, "")}</p>` : ""}
    `;
    list.appendChild(li);
  });
}

async function fetchTutorialFeeds() {
  const catSelect = el("#tutorialCategorySelect");
  const results = [];
  
  await Promise.all(
    TUTORIAL_FEEDS.map(async (f) => {
      try {
        const items = await fetchFeed(f.url);
        const tagged = items.slice(0, 8).map((it) => ({
          title: it.title,
          url: it.link,
          category: f.category,
          summary: it.summary || "Tutorial sobre IA y machine learning.",
        }));
        results.push(...tagged);
      } catch (e) {
        console.warn("Tutorial feed fail:", f.name, e.message);
      }
    })
  );

  // Merge with static tutorials
  const allTutorials = [...TUTORIALS, ...results];
  
  // Populate categories
  const cats = Array.from(new Set(allTutorials.map((d) => d.category)));
  cats.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    catSelect.appendChild(opt);
  });

  renderTutorials(allTutorials);
}

function renderTutorials(data) {
  const list = el("#tutorialsList");
  list.innerHTML = "";
  data.forEach((t) => {
    const li = document.createElement("li");
    li.className = "card";
    li.innerHTML = `
      <h3><a href="${t.url}" target="_blank" rel="noopener">${t.title}</a></h3>
      <span class="badge">${t.category}</span>
      <p>${t.summary}</p>
    `;
    list.appendChild(li);
  });
}

async function fetchAppFeeds() {
  const catSelect = el("#appCategorySelect");
  const results = [];
  
  await Promise.all(
    APP_FEEDS.map(async (f) => {
      try {
        const items = await fetchFeed(f.url);
        const tagged = items.slice(0, 6).map((it) => ({
          name: it.title,
          url: it.link,
          category: f.category,
          review: it.summary ? it.summary.substring(0, 150) + "..." : "Nueva herramienta de IA recomendada.",
        }));
        results.push(...tagged);
      } catch (e) {
        console.warn("App feed fail:", f.name, e.message);
      }
    })
  );

  // Merge with static apps
  const allApps = [...APPS, ...results];
  
  // Populate categories
  const cats = Array.from(new Set(allApps.map((d) => d.category)));
  cats.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    catSelect.appendChild(opt);
  });

  renderApps(allApps);
}

function renderApps(data) {
  const list = el("#appsList");
  list.innerHTML = "";
  data.forEach((a) => {
    const li = document.createElement("li");
    li.className = "card";
    li.innerHTML = `
      <h3><a href="${a.url}" target="_blank" rel="noopener">${a.name}</a></h3>
      <span class="badge">${a.category}</span>
      <p>${a.review}</p>
    `;
    list.appendChild(li);
  });
}

async function fetchPromptFeeds() {
  const catSelect = el("#promptCategorySelect");
  const results = [];
  
  await Promise.all(
    PROMPT_FEEDS.map(async (f) => {
      try {
        const items = await fetchFeed(f.url);
        const tagged = items.slice(0, 6).map((it) => ({
          text: it.title + (it.summary ? ": " + it.summary.substring(0, 100) : ""),
          category: f.category,
        }));
        results.push(...tagged);
      } catch (e) {
        console.warn("Prompt feed fail:", f.name, e.message);
      }
    })
  );

  // Merge with static prompts
  const allPrompts = [...PROMPTS, ...results];
  
  // Populate categories
  const cats = Array.from(new Set(allPrompts.map((d) => d.category)));
  cats.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    catSelect.appendChild(opt);
  });

  renderPrompts(allPrompts);
}

function renderPrompts(data) {
  const list = el("#promptsList");
  list.innerHTML = "";
  data.forEach((p) => {
    const li = document.createElement("li");
    li.className = "card";
    li.innerHTML = `
      <p>${p.text}</p>
      <span class="badge">${p.category}</span>
    `;
    list.appendChild(li);
  });
}

// Search and filter logic
function applyFilters() {
  const q = el("#searchInput").value.trim().toLowerCase();
  const newsSource = el("#newsSourceFilter").value;
  const tutCat = el("#tutorialCategorySelect").value;
  const appCat = el("#appCategorySelect").value;
  const promptCat = el("#promptCategorySelect").value;

  // Filter news
  const newsCards = [...el("#newsList").children];
  newsCards.forEach((card) => {
    const text = card.textContent.toLowerCase();
    const sourceText = card.querySelector(".meta")?.textContent || "";
    const sourceMatch = !newsSource || sourceText.includes(newsSource);
    const searchMatch = !q || text.includes(q);
    card.style.display = sourceMatch && searchMatch ? "" : "none";
  });

  // Filter tutorials
  const tutCards = [...el("#tutorialsList").children];
  tutCards.forEach((card) => {
    const text = card.textContent.toLowerCase();
    const badge = card.querySelector(".badge")?.textContent || "";
    const catMatch = !tutCat || badge === tutCat;
    const searchMatch = !q || text.includes(q);
    card.style.display = catMatch && searchMatch ? "" : "none";
  });

  // Filter apps
  const appCards = [...el("#appsList").children];
  appCards.forEach((card) => {
    const text = card.textContent.toLowerCase();
    const badge = card.querySelector(".badge")?.textContent || "";
    const catMatch = !appCat || badge === appCat;
    const searchMatch = !q || text.includes(q);
    card.style.display = catMatch && searchMatch ? "" : "none";
  });

  // Filter prompts
  const promptCards = [...el("#promptsList").children];
  promptCards.forEach((card) => {
    const text = card.textContent.toLowerCase();
    const badge = card.querySelector(".badge")?.textContent || "";
    const catMatch = !promptCat || badge === promptCat;
    const searchMatch = !q || text.includes(q);
    card.style.display = catMatch && searchMatch ? "" : "none";
  });
}

function initEvents() {
  ["#searchInput", "#newsSourceFilter", "#tutorialCategorySelect", "#appCategorySelect", "#promptCategorySelect"].forEach((sel) => {
    el(sel).addEventListener("input", applyFilters);
    el(sel).addEventListener("change", applyFilters);
  });
  el("#clearSearch").addEventListener("click", () => { el("#searchInput").value = ""; applyFilters(); });
}

async function init() {
  renderApps(APPS);
  renderPrompts(PROMPTS);
  initEvents();
  await Promise.all([fetchFeeds(), fetchTutorialFeeds()]);
}

// Boot
init();
