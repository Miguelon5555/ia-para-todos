#!/usr/bin/env python3
"""
generar_pagina.py
Genera UNA guía original (página propia con su URL) para el blog IA para todos.

Qué hace en cada ejecución:
  1. Coge el siguiente tema pendiente de paginas.json.
  2. Pide a Claude que escriba la guía (JSON estructurado).
  3. Crea prompts/<slug>/index.html con SEO completo (title, description,
     canonical, JSON-LD Article y FAQPage).
  4. Actualiza guias.json, sitemap.xml, la home (bloque de guías) y los
     enlaces "Más guías" de todas las páginas ya creadas.
  5. Escribe pr_body.md (texto legible para revisar) y deja slug/titulo
     como salidas del workflow.

Requiere la variable de entorno ANTHROPIC_API_KEY.
"""

import os
import re
import json
import html
import datetime
from pathlib import Path

SITE = "https://iaforall.netlify.app"
MODEL = "claude-sonnet-4-6"

CARPETA = Path("prompts")
GUIAS_JSON = Path("guias.json")
TEMAS_JSON = Path("paginas.json")
SITEMAP = Path("sitemap.xml")
INDEX = Path("index.html")
PR_BODY = Path("pr_body.md")

MESES = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
]

SYSTEM_PROMPT = """Eres el redactor de "IA para todos", un blog en español sobre inteligencia artificial para gente que no es técnica. Escribes guías prácticas y honestas sobre cómo usar prompts.

OBJETIVO
Cada guía debe ser realmente útil y distinta de lo que ya hay por ahí: quien la lea tiene que poder aplicar el prompt en 5 minutos y entender por qué funciona.

TONO
- Casual y cercano, tuteo, español de España neutro. Como explicarle algo a un amigo: frases cortas, alguna expresión coloquial natural (sin pasarte) y hablándole directamente al lector.
- Directo: nada de introducciones genéricas del tipo "En la era de la IA..." ni conclusiones de relleno.
- Evita las fórmulas de manual del tipo "el truco no está en X, sino en Y" y los listados de ideas abstractas: mejor una situación concreta.
- Sin emojis.

CONTENIDO
- Respuesta directa y concreta arriba (campo "resumen").
- Ejemplos concretos y realistas, con situaciones cotidianas (trabajo, estudios, vida diaria).
- Explica el porqué: qué hace cada parte del prompt y qué pasa si se quita.
- Sé honesto con las limitaciones: cuándo el resultado puede fallar, qué conviene revisar y cuándo no conviene usar IA.

REGLAS DE VERACIDAD (muy importantes)
- No inventes cifras, estudios, estadísticas, citas, precios, funciones de herramientas ni versiones de modelos.
- Menciona herramientas solo de forma genérica (por ejemplo "un asistente de IA como ChatGPT, Claude o Gemini") y sin prometer funciones concretas.
- Lo que "suele devolver" la IA es un ejemplo ilustrativo, no un resultado medido: no lo presentes como garantizado.
- No escribas como si tuvieras experiencia personal ("yo probé...", "en mi experiencia..."): esa parte la añade el autor aparte.
- No hagas afirmaciones categóricas sobre cómo se comporta la IA ("siempre", "nunca", "tiende a", "cambia el resultado de forma notable"): usa "suele", "puede", "es fácil que". Nunca prometas que el resultado sea fiable ni que el lector no tenga que comprobarlo.
- El título no puede prometer resultados absolutos ("sin perder nada", "perfecto", "garantizado").
- Si te refieres al prompt de partida, cítalo literalmente la primera vez (en "resumen" o en el primer bloque de "como_funciona"). Nunca hables de "el prompt original" o "el prompt básico" sin haberlo mostrado antes.
- Coherencia: el ejemplo y lo que "suele devolver" la IA no pueden contradecir "cuando_no_usarlo". Si el ejemplo usa un texto delicado (legal, médico, financiero), deja claro para qué sirve el resultado (por ejemplo preparar o entender, no citar ni decidir) y que hay que comprobarlo.

FORMATO
- Texto plano. Sin HTML, sin Markdown, sin enlaces. Separa párrafos con una línea en blanco.
- Longitud total aproximada: 800-1100 palabras.
- Usa la palabra clave principal de forma natural en el título, el resumen y el primer párrafo, sin repetirla en exceso.
- En los prompts usa [corchetes] para las partes que el lector debe sustituir.
- "titulo": máximo 52 caracteres. "descripcion_meta": entre 120 y 155 caracteres, sin comillas.
- "como_funciona": 3 o 4 bloques. "variantes": 2 o 3. "errores_comunes": 3 o 4 frases. "faqs": 3 preguntas que alguien se haría de verdad.

SALIDA
Responde SOLO con un objeto JSON válido (sin texto antes ni después y sin backticks), con exactamente esta estructura:

{
  "titulo": "...",
  "descripcion_meta": "...",
  "resumen": "...",
  "para_quien": "...",
  "como_funciona": [{"titulo": "...", "texto": "..."}],
  "ejemplo": {"situacion": "...", "entrada": "...", "salida_resumida": "..."},
  "prompt_mejorado": "...",
  "variantes": [{"nombre": "...", "prompt": "..."}],
  "errores_comunes": ["..."],
  "cuando_no_usarlo": "...",
  "faqs": [{"pregunta": "...", "respuesta": "..."}]
}
"""

STYLE_HOME = """  <!-- GUIAS:STYLE -->
  <style>
    #guias { padding: 1.5rem; border-radius: 12px; background: rgba(227, 242, 253, 0.85); }
    #guias h2 { position: relative; z-index: 2; margin-bottom: 1rem; }
    #guias .section-note { position: relative; z-index: 3; }
    #guias .card-list { position: relative; z-index: 3; }
    #guias .card { background: rgba(255, 255, 255, 0.95); border: 1px solid rgba(33, 150, 243, 0.3); box-shadow: 0 4px 12px rgba(33, 150, 243, 0.2); border-radius: 12px; padding: 0.9rem; display: flex; flex-direction: column; gap: 0.4rem; }
    #guias .card h3 { margin: 0; font-size: 1.05rem; }
    #guias .card p { margin: 0.1rem 0; color: var(--muted); }
    #guias .card a { color: var(--link); text-decoration: none; }
    #guias .card a:hover { text-decoration: underline; }
  </style>
"""

PLANTILLA = """<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{{TITULO}} | IA para todos</title>
  <meta name="description" content="{{DESCRIPCION}}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="{{URL}}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="{{URL}}" />
  <meta property="og:title" content="{{TITULO}}" />
  <meta property="og:description" content="{{DESCRIPCION}}" />
  <meta property="og:locale" content="es_ES" />
  <meta property="og:site_name" content="IA para todos" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="{{TITULO}}" />
  <meta name="twitter:description" content="{{DESCRIPCION}}" />
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🤖</text></svg>" />
  <script type="application/ld+json">{{JSONLD_ARTICLE}}</script>
  <script type="application/ld+json">{{JSONLD_FAQ}}</script>
  <link rel="stylesheet" href="/styles.css" />
  <style>
    .guia { position: relative; z-index: 1; background: rgba(255, 255, 255, 0.96); color: #263238; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; line-height: 1.65; box-shadow: 0 4px 12px rgba(33, 150, 243, 0.2); }
    .guia h1 { margin-top: 0; color: var(--text); line-height: 1.25; }
    .guia h2 { color: var(--text); margin-top: 2rem; }
    .guia h3 { color: var(--text); margin-bottom: 0.3rem; }
    .guia a { color: var(--link); }
    .guia .migas, .guia .meta { color: var(--muted); font-size: 0.9rem; }
    .guia .resumen { font-size: 1.1rem; background: #e3f2fd; border-left: 4px solid var(--accent); padding: 0.8rem 1rem; border-radius: 6px; }
    .guia .bloque { white-space: pre-wrap; word-break: break-word; background: #f5f9ff; border: 1px solid var(--border); border-radius: 8px; padding: 0.9rem 1rem; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 0.92rem; line-height: 1.5; margin: 0.5rem 0 1rem; }
    .guia .prompt { background: #0d47a1; color: #ffffff; border-color: #0d47a1; }
    .guia .copiar { padding: 0.5rem 0.9rem; border-radius: 8px; border: 1px solid var(--accent); background: #ffffff; color: var(--text); cursor: pointer; font-weight: 600; }
    .guia .copiar:hover { background: #e3f2fd; }
    .guia .nota { background: #fff8e1; border-left: 4px solid #ffb300; padding: 0.8rem 1rem; border-radius: 6px; margin: 1.5rem 0; }
    .guia .mas-guias ul { padding-left: 1.2rem; }
    .guia .mas-guias li { margin: 0.4rem 0; }
  </style>
</head>
<body>
  <header class="site-header">
    <div class="container">
      <p class="tagline"><a href="/">IA para todos</a> — Noticias, tutoriales, apps y prompts, en tono casual.</p>
      <nav class="nav">
        <a href="/">Inicio</a>
        <a href="/#guias">Guías</a>
        <a href="/#noticias">Noticias</a>
        <a href="/#tutoriales">Tutoriales</a>
      </nav>
    </div>
  </header>

  <main class="container">
    <article class="guia">
{{CUERPO}}
    </article>
  </main>

  <footer class="site-footer">
    <div class="container">
      <p>¿Tienes algo que contarme? Escríbeme a mi buzón:
        <a href="mailto:cacharritos2002@gmail.com">cacharritos2002@gmail.com</a>
      </p>
      <p class="small">Hecho con cariño y café ☕️ — IA sin complicaciones.</p>
    </div>
  </footer>

  <script>
    document.querySelectorAll('.copiar').forEach(function (b) {
      b.addEventListener('click', function () {
        var el = document.getElementById(b.dataset.target);
        if (!el || !navigator.clipboard) return;
        navigator.clipboard.writeText(el.textContent).then(function () {
          var t = b.textContent;
          b.textContent = '¡Copiado!';
          setTimeout(function () { b.textContent = t; }, 1500);
        });
      });
    });
  </script>
</body>
</html>
"""


# ---------- Utilidades ----------

def esc(s):
    return html.escape(str(s), quote=True)


def hoy():
    return datetime.datetime.now(datetime.timezone.utc).date()


def fecha_legible(d):
    return f"{d.day} de {MESES[d.month - 1]} de {d.year}"


def leer_json(ruta, defecto):
    if ruta.exists():
        return json.loads(ruta.read_text(encoding="utf-8"))
    return defecto


def escribir_json(ruta, datos):
    ruta.write_text(json.dumps(datos, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def recortar(texto, maximo):
    texto = " ".join(str(texto).split())
    if len(texto) <= maximo:
        return texto
    corte = texto[:maximo].rsplit(" ", 1)[0].rstrip(" ,;:.-")
    return corte


def parrafos(texto):
    bloques = [b.strip() for b in re.split(r"\n\s*\n", str(texto).strip()) if b.strip()]
    return "\n".join(f"      <p>{esc(' '.join(b.split()))}</p>" for b in bloques)


def salida_workflow(**kv):
    ruta = os.environ.get("GITHUB_OUTPUT")
    if not ruta:
        return
    with open(ruta, "a", encoding="utf-8") as f:
        for k, v in kv.items():
            f.write(f"{k}={str(v).replace(chr(10), ' ')}\n")


# ---------- Temas ----------

def siguiente_tema(guias):
    temas = leer_json(TEMAS_JSON, [])
    hechos = {g["slug"] for g in guias}
    for t in temas:
        slug = t.get("slug", "")
        if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", slug):
            raise ValueError(f"Slug no válido en paginas.json: {slug!r}")
        if slug not in hechos and not (CARPETA / slug).exists():
            return t
    return None


# ---------- Claude ----------

def llamar_claude(system, user):
    from anthropic import Anthropic

    client = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
    msg = client.messages.create(
        model=MODEL,
        max_tokens=4500,
        system=system,
        messages=[{"role": "user", "content": user}],
    )
    return msg.content[0].text


def extraer_json(texto):
    texto = texto.strip()
    inicio, fin = texto.find("{"), texto.rfind("}")
    if inicio == -1 or fin == -1:
        raise ValueError("La respuesta no contiene un objeto JSON")
    return json.loads(texto[inicio : fin + 1])


def _texto(c, clave):
    v = c.get(clave)
    if not isinstance(v, str) or not v.strip():
        raise ValueError(f"Falta o está vacío: {clave}")


def _lista(c, clave, minimo, maximo, claves=None):
    v = c.get(clave)
    if not isinstance(v, list) or not (minimo <= len(v) <= maximo):
        raise ValueError(f"{clave} debe ser una lista de {minimo} a {maximo} elementos")
    for item in v:
        if claves:
            if not isinstance(item, dict) or any(
                not isinstance(item.get(k), str) or not item[k].strip() for k in claves
            ):
                raise ValueError(f"Elemento no válido en {clave}")
        elif not isinstance(item, str) or not item.strip():
            raise ValueError(f"Elemento no válido en {clave}")


def validar(c):
    if not isinstance(c, dict):
        raise ValueError("La respuesta no es un objeto")
    for k in ["titulo", "descripcion_meta", "resumen", "para_quien", "prompt_mejorado", "cuando_no_usarlo"]:
        _texto(c, k)
    _lista(c, "como_funciona", 3, 5, ["titulo", "texto"])
    _lista(c, "variantes", 2, 4, ["nombre", "prompt"])
    _lista(c, "errores_comunes", 3, 5)
    _lista(c, "faqs", 3, 5, ["pregunta", "respuesta"])
    e = c.get("ejemplo")
    if not isinstance(e, dict) or any(
        not isinstance(e.get(k), str) or not e[k].strip() for k in ["situacion", "entrada", "salida_resumida"]
    ):
        raise ValueError("ejemplo incompleto")
    c["titulo"] = recortar(c["titulo"], 60)
    c["descripcion_meta"] = recortar(c["descripcion_meta"], 160)


def generar_contenido(tema, intentos=3):
    user = (
        f"Escribe la guía sobre este tema.\n\n"
        f"Tema: {tema['tema']}\n"
        f"Prompt de partida: {tema['prompt_base']}\n"
        f"Categoría: {tema['categoria']}\n"
        f"Palabra clave principal: {tema['palabra_clave']}\n"
        f"Ángulo / a quién ayudar: {tema.get('angulo', 'público general')}\n"
    )
    ultimo_error = None
    for n in range(1, intentos + 1):
        try:
            c = extraer_json(llamar_claude(SYSTEM_PROMPT, user))
            validar(c)
            return c
        except Exception as e:  # JSON roto, claves que faltan, etc.
            ultimo_error = e
            print(f"⚠️ Intento {n}/{intentos} no válido: {e}")
    raise RuntimeError(f"No se pudo generar una guía válida: {ultimo_error}")


# ---------- Render de la página ----------

def bloque_copiable(ident, texto, clase="bloque prompt"):
    return (
        f'      <div class="copiable">\n'
        f'        <pre id="{ident}" class="{clase}">{esc(texto)}</pre>\n'
        f'        <button type="button" class="copiar" data-target="{ident}">Copiar prompt</button>\n'
        f"      </div>"
    )


def render_cuerpo(c, tema, fecha):
    p = []
    p.append('      <p class="migas"><a href="/">Inicio</a> › <a href="/#guias">Guías de prompts</a></p>')
    p.append(f"      <h1>{esc(c['titulo'])}</h1>")
    p.append(
        f'      <p class="meta">Actualizado el {fecha_legible(fecha)} · '
        f'<span class="badge">{esc(tema["categoria"])}</span></p>'
    )
    p.append(f'      <p class="resumen">{esc(c["resumen"])}</p>')

    p.append("      <h2>Para quién es útil</h2>")
    p.append(parrafos(c["para_quien"]))

    p.append("      <h2>Cómo funciona</h2>")
    for s in c["como_funciona"]:
        p.append(f"      <h3>{esc(s['titulo'])}</h3>")
        p.append(parrafos(s["texto"]))

    e = c["ejemplo"]
    p.append("      <h2>Ejemplo paso a paso</h2>")
    p.append(f"      <p><strong>Situación:</strong> {esc(e['situacion'])}</p>")
    p.append("      <p><strong>Lo que le pides a la IA:</strong></p>")
    p.append(f'      <pre class="bloque">{esc(e["entrada"])}</pre>')
    p.append("      <p><strong>Qué suele devolver</strong> (ejemplo ilustrativo; el resultado real varía):</p>")
    p.append(f'      <pre class="bloque">{esc(e["salida_resumida"])}</pre>')

    p.append("      <h2>El prompt listo para copiar</h2>")
    p.append(bloque_copiable("prompt-principal", c["prompt_mejorado"]))

    p.append("      <h2>Variantes para otros casos</h2>")
    for i, v in enumerate(c["variantes"], start=1):
        p.append(f"      <h3>{esc(v['nombre'])}</h3>")
        p.append(bloque_copiable(f"variante-{i}", v["prompt"]))

    p.append("      <h2>Errores comunes</h2>")
    p.append("      <ul>")
    for er in c["errores_comunes"]:
        p.append(f"        <li>{esc(er)}</li>")
    p.append("      </ul>")

    p.append("      <h2>Cuándo no usarlo</h2>")
    p.append(parrafos(c["cuando_no_usarlo"]))

    nota = (tema.get("nota_personal") or "").strip()
    if nota:
        p.append(f'      <aside class="nota"><strong>Mi experiencia:</strong> {esc(nota)}</aside>')

    p.append("      <h2>Preguntas frecuentes</h2>")
    for f in c["faqs"]:
        p.append(f"      <h3>{esc(f['pregunta'])}</h3>")
        p.append(parrafos(f["respuesta"]))

    p.append("      <!-- REL:START -->")
    p.append("      <!-- REL:END -->")
    return "\n".join(p)


def json_ld(obj):
    return json.dumps(obj, ensure_ascii=False).replace("</", "<\\/")


def render_pagina(c, tema, fecha):
    url = f"{SITE}/prompts/{tema['slug']}/"
    articulo = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": c["titulo"],
        "description": c["descripcion_meta"],
        "inLanguage": "es",
        "datePublished": fecha.isoformat(),
        "dateModified": fecha.isoformat(),
        "mainEntityOfPage": url,
        "author": {"@type": "Organization", "name": "IA para todos"},
        "publisher": {"@type": "Organization", "name": "IA para todos"},
    }
    faq = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": f["pregunta"],
                "acceptedAnswer": {"@type": "Answer", "text": " ".join(f["respuesta"].split())},
            }
            for f in c["faqs"]
        ],
    }
    reemplazos = {
        "{{TITULO}}": esc(c["titulo"]),
        "{{DESCRIPCION}}": esc(c["descripcion_meta"]),
        "{{URL}}": esc(url),
        "{{JSONLD_ARTICLE}}": json_ld(articulo),
        "{{JSONLD_FAQ}}": json_ld(faq),
        "{{CUERPO}}": render_cuerpo(c, tema, fecha),
    }
    pagina = PLANTILLA
    for k, v in reemplazos.items():
        pagina = pagina.replace(k, v)
    return pagina


# ---------- Enlaces internos, home y sitemap ----------

def reemplazar_marcadores(texto, inicio, fin, interior):
    patron = re.compile(f"({re.escape(inicio)})[\\s\\S]*?({re.escape(fin)})")
    if not patron.search(texto):
        raise ValueError(f"No encuentro los marcadores {inicio} ... {fin}")
    return patron.sub(lambda m: f"{m.group(1)}\n{interior}{m.group(2)}", texto, count=1)


def seccion_relacionadas(slug, guias):
    actual = next(g for g in guias if g["slug"] == slug)
    otras = [g for g in reversed(guias) if g["slug"] != slug]  # más nuevas primero
    otras.sort(key=lambda g: g["categoria"] != actual["categoria"])  # misma categoría antes
    otras = otras[:4]
    if not otras:
        return ""
    items = "\n".join(
        f'          <li><a href="/prompts/{g["slug"]}/">{esc(g["titulo"])}</a> — {esc(g["descripcion"])}</li>'
        for g in otras
    )
    return (
        '      <div class="mas-guias">\n'
        "        <h2>Más guías</h2>\n"
        "        <ul>\n"
        f"{items}\n"
        "        </ul>\n"
        "      </div>\n      "
    )


def actualizar_relacionadas(guias):
    for g in guias:
        ruta = CARPETA / g["slug"] / "index.html"
        if not ruta.exists():
            continue
        texto = ruta.read_text(encoding="utf-8")
        texto = reemplazar_marcadores(
            texto, "<!-- REL:START -->", "<!-- REL:END -->", seccion_relacionadas(g["slug"], guias)
        )
        ruta.write_text(texto, encoding="utf-8")


def preparar_home(texto):
    """Si la home aún no tiene los marcadores de guías, los inserta (una sola vez)."""
    if "<!-- GUIAS:START -->" in texto:
        return texto
    if "</head>" not in texto or '<nav class="nav">' not in texto or not re.search(r"<main[^>]*>", texto):
        raise ValueError("index.html no tiene la estructura esperada (head, nav o main)")
    texto = texto.replace("</head>", STYLE_HOME + "</head>", 1)
    texto = texto.replace(
        '<nav class="nav">',
        '<nav class="nav">\n        <!-- GUIAS_NAV:START -->\n        <!-- GUIAS_NAV:END -->',
        1,
    )
    texto = re.sub(
        r"(<main[^>]*>)",
        lambda m: f"{m.group(1)}\n    <!-- GUIAS:START -->\n    <!-- GUIAS:END -->",
        texto,
        count=1,
    )
    return texto


def actualizar_home(guias):
    texto = preparar_home(INDEX.read_text(encoding="utf-8"))
    tarjetas = "\n".join(
        '        <li class="card">\n'
        f'          <h3><a href="/prompts/{g["slug"]}/">{esc(g["titulo"])}</a></h3>\n'
        f'          <p>{esc(g["descripcion"])}</p>\n'
        f'          <div class="meta"><span class="badge">{esc(g["categoria"])}</span></div>\n'
        "        </li>"
        for g in reversed(guias)
    )
    seccion = (
        '    <section id="guias" aria-labelledby="guias-title">\n'
        '      <h2 id="guias-title">Guías de prompts</h2>\n'
        '      <p class="section-note">Guías originales con ejemplos y el prompt listo para copiar.</p>\n'
        '      <ul id="guiasList" class="card-list">\n'
        f"{tarjetas}\n"
        "      </ul>\n"
        "    </section>\n    "
        if guias
        else ""
    )
    nav = '<a href="#guias">Guías</a>\n        ' if guias else ""
    texto = reemplazar_marcadores(texto, "<!-- GUIAS:START -->", "<!-- GUIAS:END -->", seccion)
    texto = reemplazar_marcadores(texto, "<!-- GUIAS_NAV:START -->", "<!-- GUIAS_NAV:END -->", nav)
    INDEX.write_text(texto, encoding="utf-8")


def actualizar_sitemap(slug, fecha):
    texto = SITEMAP.read_text(encoding="utf-8")
    url = f"{SITE}/prompts/{slug}/"
    if f"<loc>{url}</loc>" not in texto:
        entrada = (
            "  <url>\n"
            f"    <loc>{url}</loc>\n"
            f"    <lastmod>{fecha.isoformat()}</lastmod>\n"
            "    <changefreq>monthly</changefreq>\n"
            "    <priority>0.8</priority>\n"
            "  </url>\n"
        )
        texto = texto.replace("</urlset>", entrada + "</urlset>")
    # La home cambia cada vez que se añade una guía
    texto = re.sub(
        r"(<loc>" + re.escape(SITE) + r"/</loc>\s*<lastmod>)[^<]*(</lastmod>)",
        lambda m: f"{m.group(1)}{fecha.isoformat()}{m.group(2)}",
        texto,
        count=1,
    )
    SITEMAP.write_text(texto, encoding="utf-8")


# ---------- Texto para revisar en el Pull Request ----------

def texto_para_revisar(c, tema, url):
    l = []
    l.append(f"## Nueva guía: {c['titulo']}\n")
    l.append(f"**URL prevista:** {url}  ")
    l.append(f"**Meta descripción:** {c['descripcion_meta']}\n")
    l.append("### Revisa antes de aprobar")
    l.append("- [ ] ¿Hay cifras, herramientas, precios o funciones inventadas?")
    l.append("- [ ] ¿El ejemplo es realista y el prompt se puede copiar y usar tal cual?")
    l.append("- [ ] ¿Suena a ti? Para las próximas guías puedes añadir tu experiencia real en `nota_personal` de `paginas.json`.")
    l.append("- [ ] Si hay Deploy Preview de Netlify en este PR, ábrela y mira cómo se ve.\n")
    l.append("---\n")
    l.append(f"**Resumen:** {c['resumen']}\n")
    l.append(f"**Para quién es útil:** {c['para_quien']}\n")
    l.append("### Cómo funciona")
    for s in c["como_funciona"]:
        l.append(f"**{s['titulo']}**\n\n{s['texto']}\n")
    e = c["ejemplo"]
    l.append("### Ejemplo")
    l.append(f"**Situación:** {e['situacion']}\n")
    l.append(f"```\n{e['entrada']}\n```\n")
    l.append(f"**Qué suele devolver (ilustrativo):**\n\n```\n{e['salida_resumida']}\n```\n")
    l.append("### Prompt listo para copiar")
    l.append(f"```\n{c['prompt_mejorado']}\n```\n")
    l.append("### Variantes")
    for v in c["variantes"]:
        l.append(f"**{v['nombre']}**\n\n```\n{v['prompt']}\n```\n")
    l.append("### Errores comunes")
    l.extend(f"- {x}" for x in c["errores_comunes"])
    l.append(f"\n### Cuándo no usarlo\n{c['cuando_no_usarlo']}\n")
    l.append("### Preguntas frecuentes")
    for f in c["faqs"]:
        l.append(f"**{f['pregunta']}**\n\n{f['respuesta']}\n")
    return "\n".join(l)


# ---------- Principal ----------

def main():
    guias = leer_json(GUIAS_JSON, [])
    tema = siguiente_tema(guias)
    if not tema:
        print("✅ No quedan temas pendientes en paginas.json. Añade más para seguir.")
        salida_workflow(slug="", titulo="")
        return

    print(f"📝 Generando guía: {tema['slug']}")
    c = generar_contenido(tema)
    fecha = hoy()

    carpeta = CARPETA / tema["slug"]
    carpeta.mkdir(parents=True, exist_ok=True)
    (carpeta / "index.html").write_text(render_pagina(c, tema, fecha), encoding="utf-8")

    guias.append(
        {
            "slug": tema["slug"],
            "titulo": c["titulo"],
            "descripcion": c["descripcion_meta"],
            "categoria": tema["categoria"],
            "fecha": fecha.isoformat(),
        }
    )
    escribir_json(GUIAS_JSON, guias)
    actualizar_relacionadas(guias)
    actualizar_home(guias)
    actualizar_sitemap(tema["slug"], fecha)

    url = f"{SITE}/prompts/{tema['slug']}/"
    PR_BODY.write_text(texto_para_revisar(c, tema, url), encoding="utf-8")
    salida_workflow(slug=tema["slug"], titulo=c["titulo"])
    print(f"✅ Guía creada: {url}")


if __name__ == "__main__":
    main()
