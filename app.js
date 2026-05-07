// IA para todos - Blog de Inteligencia Artificial

// RSS Feeds configuration (Spanish AI news sources)
const RSS_FEEDS = [
  {
    name: 'Genbeta',
    url: 'https://feeds.weblogssl.com/genbeta',
    source: 'genbeta'
  },
  {
    name: 'Hipertextual',
    url: 'https://hipertextual.com/feed',
    source: 'hipertextual'
  },
  {
    name: 'Wired en Español',
    url: 'https://es.wired.com/feed',
    source: 'wired'
  },
  {
    name: 'Google News IA',
    url: 'https://news.google.com/rss/search?q=inteligencia+artificial+IA&hl=es&gl=ES&ceid=ES:es',
    source: 'googlenews'
  }
];

// Tutorial RSS Feeds (Spanish AI tutorials)
const TUTORIAL_FEEDS = [
  {
    name: 'freeCodeCamp Español',
    url: 'https://www.freecodecamp.org/espanol/news/tag/inteligencia-artificial/rss/',
    source: 'freecodecamp'
  },
  {
    name: 'Juan Sensio IA',
    url: 'https://www.juansensio.com/blog/index.xml',
    source: 'juansensio'
  },
  {
    name: 'YouTube - Digital Sapiens AI',
    url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCqZXjWv5JHl3rKfzqLvGKjQ',
    source: 'youtube-digitalisapiens'
  },
  {
    name: 'YouTube - AndreaEducaTips',
    url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UC8xHq4J8qF9J6z5K8xHq4J8',
    source: 'youtube-andreaeducatips'
  },
  {
    name: 'YouTube - Rays IA',
    url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCRaysIA123456789',
    source: 'youtube-raysia'
  },
  {
    name: 'Cyberhades IA',
    url: 'https://www.cyberhades.com/category/inteligencia-artificial/feed/',
    source: 'cyberhades'
  }
];

// Static content for tutorials (guaranteed fallback)
const TUTORIALS = [
  {
    title: 'Crear imágenes con FLUX AI',
    description: 'Tutorial completo para generar imágenes profesionales usando FLUX, la nueva herramienta de IA.',
    category: 'Imágenes',
    link: '#',
    date: '2024-03-15'
  },
  {
    title: 'Crear videos con Kling AI',
    description: 'Aprende a generar videos increíbles con inteligencia artificial usando Kling AI paso a paso.',
    category: 'Video',
    link: '#',
    date: '2024-03-20'
  },
  {
    title: 'Curso completo de IA: De cero a agentes',
    description: 'Guía completa desde los fundamentos hasta crear agentes con N8N y automatizaciones con Make.',
    category: 'Automatización',
    link: '#',
    date: '2024-03-25'
  },
  {
    title: 'IA para principiantes - Curso básico',
    description: 'Entiende la inteligencia artificial sin conocimientos técnicos previos. Ideal para empezar.',
    category: 'Educación',
    link: '#',
    date: '2024-04-01'
  },
  {
    title: 'Crear contenido con IA - Curso 2024',
    description: 'Aprende a crear contenido profesional usando herramientas de IA como ChatGPT, Midjourney y más.',
    category: 'Creatividad',
    link: '#',
    date: '2024-04-05'
  },
  {
    title: 'Automatización con Make y N8N',
    description: 'Tutorial práctico para automatizar tareas con Make y crear agentes personalizados con N8N.',
    category: 'Automatización',
    link: '#',
    date: '2024-04-10'
  },
  {
    title: 'Ingeniería de Prompts avanzada',
    description: 'Domina ChatGPT y otras IA con técnicas avanzadas de prompts para obtener mejores resultados.',
    category: 'Prompts',
    link: '#prompts',
    date: '2024-04-15'
  },
  {
    title: 'Crear GPTs personalizados',
    description: 'Cómo crear tus propios GPTs personalizados para tareas específicas y aumentar tu productividad.',
    category: 'ChatGPT',
    link: 'https://chat.openai.com',
    date: '2024-04-20'
  },
  {
    title: 'Canva IA para diseño rápido',
    description: 'Usa Canva con IA para crear diseños profesionales en minutos sin experiencia en diseño.',
    category: 'Diseño',
    link: 'https://www.canva.com',
    date: '2024-04-25'
  },
  {
    title: 'Fundamentos de IA - Elementos AI',
    description: 'Curso gratuito de la Universidad de Helsinki con ejercicios prácticos sobre fundamentos de IA.',
    category: 'Educación',
    link: '#',
    date: '2024-05-01'
  }
];

// Static content for recommended apps
const APPS = [
  {
    name: 'ChatGPT',
    description: 'El asistente de IA más popular para conversar y resolver dudas.',
    category: 'Asistentes',
    link: 'https://chat.openai.com',
    rating: '⭐⭐⭐⭐⭐'
  },
  {
    name: 'Midjourney',
    description: 'Genera imágenes increíbles a partir de descripciones de texto.',
    category: 'Imágenes',
    link: 'https://www.midjourney.com',
    rating: '⭐⭐⭐⭐⭐'
  },
  {
    name: 'Claude',
    description: 'IA conversacional avanzada de Anthropic, gran alternativa a ChatGPT.',
    category: 'Asistentes',
    link: 'https://claude.ai',
    rating: '⭐⭐⭐⭐'
  },
  {
    name: 'Canva IA',
    description: 'Diseño gráfico potenciado con inteligencia artificial.',
    category: 'Diseño',
    link: 'https://www.canva.com',
    rating: '⭐⭐⭐⭐'
  },
  {
    name: 'Grammarly',
    description: 'Corrección y mejora de textos usando IA.',
    category: 'Productividad',
    link: 'https://www.grammarly.com',
    rating: '⭐⭐⭐⭐'
  }
];

// Static content for useful prompts
const PROMPTS = [
  {
    title: 'Resumir textos largos',
    prompt: 'Resume el siguiente texto en 3 puntos clave manteniendo la información más importante:',
    category: 'Productividad',
    example: 'Pega aquí tu texto largo y la IA lo resumirá'
  },
  {
    title: 'Generar ideas de contenido',
    prompt: 'Dame 10 ideas creativas para [tema] dirigidas a [audiencia]:',
    category: 'Creatividad',
    example: 'Reemplaza [tema] y [audiencia] con tu caso específico'
  },
  {
    title: 'Traducir texto',
    prompt: 'Traduce el siguiente texto al inglés manteniendo el tono y estilo original:',
    category: 'Idiomas',
    example: 'Pega el texto que quieres traducir'
  },
  {
    title: 'Explicar conceptos complejos',
    prompt: 'Explícame [concepto] como si tuviera 10 años, con ejemplos sencillos:',
    category: 'Educación',
    example: 'Sustituye [concepto] por algo que quieras aprender'
  },
  {
    title: 'Generar código',
    prompt: 'Escribe un código en [lenguaje] que haga [funcionalidad]. Incluye comentarios explicativos:',
    category: 'Programación',
    example: 'Especifica el lenguaje y qué debe hacer el código'
  },
  {
    title: 'Mejorar emails profesionales',
    prompt: 'Reescribe este email de forma más profesional y clara:',
    category: 'Productividad',
    example: 'Pega tu email y la IA lo mejorará'
  }
];

// State
let newsItems = [];
let tutorialItems = [];
let currentNewsSource = '';
let currentTutorialCategory = '';
let currentAppCategory = '';
let currentPromptCategory = '';
let searchQuery = '';

// Fetch RSS feeds using rss2json API
async function fetchNewsFeeds() {
  const newsList = document.getElementById('newsList');
  const sourceFilter = document.getElementById('newsSourceFilter');
  
  if (!newsList) return;
  
  newsList.innerHTML = '<li class="loading">Cargando noticias...</li>';
  
  const allNews = [];
  const sources = new Set();
  let successCount = 0;
  
  for (const feed of RSS_FEEDS) {
    try {
      const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`;
      const response = await fetch(proxyUrl);
      const data = await response.json();
      
      if (data.status === 'ok' && data.items && data.items.length > 0) {
        data.items.slice(0, 8).forEach(item => {
          allNews.push({
            title: item.title,
            link: item.link,
            description: item.description?.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
            date: item.pubDate,
            source: feed.source,
            sourceName: feed.name
          });
          sources.add(feed.source);
        });
        successCount++;
        console.log(`✅ ${feed.name}: ${data.items.length} noticias cargadas`);
      } else {
        console.warn(`⚠️ ${feed.name}: Sin noticias o feed no disponible`);
      }
    } catch (error) {
      console.error(`❌ Error fetching ${feed.name}:`, error.message);
    }
  }
  
  if (allNews.length === 0) {
    newsList.innerHTML = '<li class="empty">No se pudieron cargar las noticias. Intenta más tarde.</li>';
    console.error('❌ Ningún feed RSS cargó correctamente');
    return;
  }
  
  // Sort by date (newest first)
  allNews.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  newsItems = allNews;
  
  console.log(`✅ Total: ${allNews.length} noticias de ${successCount} fuentes`);
  
  // Populate source filter
  if (sourceFilter) {
    sourceFilter.innerHTML = '<option value="">Todas</option>';
    Array.from(sources).sort().forEach(source => {
      const feed = RSS_FEEDS.find(f => f.source === source);
      const option = document.createElement('option');
      option.value = source;
      option.textContent = feed.name;
      sourceFilter.appendChild(option);
    });
  }
  
  renderNews();
}

// Fetch tutorial feeds
async function fetchTutorialFeeds() {
  const tutorialsList = document.getElementById('tutorialsList');
  const categorySelect = document.getElementById('tutorialCategorySelect');
  
  if (!tutorialsList) return;
  
  const allTutorials = [];
  const categories = new Set();
  let successCount = 0;
  
  for (const feed of TUTORIAL_FEEDS) {
    try {
      const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`;
      const response = await fetch(proxyUrl);
      const data = await response.json();
      
      if (data.status === 'ok' && data.items && data.items.length > 0) {
        data.items.slice(0, 4).forEach(item => {
          // Extract category from tags or use default
          let category = item.categories?.[0] || 'Tutorial';
          
          // Detect YouTube videos
          const isYouTube = feed.source.startsWith('youtube-');
          if (isYouTube) {
            category = 'Video';
          }
          
          // Skip non-Spanish content (basic filter)
          const title = item.title || '';
          const description = item.description || '';
          const combinedText = (title + ' ' + description).toLowerCase();
          
          // Simple language detection - skip if clearly Portuguese
          if (combinedText.includes('inteligência artificial') || 
              combinedText.includes('aprendizado de máquina') ||
              combinedText.includes('como fazer')) {
            console.log(`⏭️ Saltado (portugués): ${title}`);
            return;
          }
          
          allTutorials.push({
            title: title,
            link: item.link,
            description: description.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
            date: item.pubDate,
            source: feed.source,
            sourceName: feed.name,
            category: category
          });
          categories.add(category);
        });
        successCount++;
        console.log(`✅ Tutorial ${feed.name}: ${data.items.length} tutoriales cargados`);
      } else {
        console.warn(`⚠️ Tutorial ${feed.name}: Sin tutoriales o feed no disponible`);
      }
    } catch (error) {
      console.error(`❌ Error fetching tutorial ${feed.name}:`, error.message);
    }
  }
  
  // Combine with static tutorials to ensure at least 9
  if (allTutorials.length === 0) {
    console.log('📝 Usando tutoriales estáticos como fallback');
    tutorialItems = TUTORIALS;
  } else {
    // Add static tutorials to reach 9 minimum
    const needed = Math.max(0, 9 - allTutorials.length);
    if (needed > 0) {
      console.log(`📝 Agregando ${needed} tutoriales estáticos para completar`);
      allTutorials.push(...TUTORIALS.slice(0, needed));
    }
    
    // Sort by date (newest first)
    allTutorials.sort((a, b) => new Date(b.date) - new Date(a.date));
    tutorialItems = allTutorials;
    
    console.log(`✅ Total: ${allTutorials.length} tutoriales de ${successCount} fuentes + estáticos`);
    
    // Populate category filter
    if (categorySelect) {
      categorySelect.innerHTML = '<option value="">Todas</option>';
      Array.from(categories).sort().forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categorySelect.appendChild(option);
      });
      // Add static categories
      TUTORIALS.forEach(t => {
        if (!categories.has(t.category)) {
          const option = document.createElement('option');
          option.value = t.category;
          option.textContent = t.category;
          categorySelect.appendChild(option);
          categories.add(t.category);
        }
      });
    }
  }
  
  renderTutorials();
}

// Render news with filters
function renderNews() {
  const newsList = document.getElementById('newsList');
  if (!newsList) return;
  
  let filtered = newsItems;
  
  // Apply source filter
  if (currentNewsSource) {
    filtered = filtered.filter(item => item.source === currentNewsSource);
  }
  
  // Apply search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.description.toLowerCase().includes(query)
    );
  }
  
  if (filtered.length === 0) {
    newsList.innerHTML = '<li class="empty">No se encontraron noticias</li>';
    return;
  }
  
  newsList.innerHTML = filtered.map(item => `
    <li class="card">
      <h3><a href="${item.link}" target="_blank" rel="noopener">${item.title}</a></h3>
      <p>${item.description}</p>
      <div class="meta">
        <span class="badge">${item.sourceName}</span>
        <time>${formatDate(item.date)}</time>
      </div>
    </li>
  `).join('');
}

// Render tutorials
function renderTutorials() {
  const tutorialsList = document.getElementById('tutorialsList');
  if (!tutorialsList) return;
  
  let filtered = tutorialItems;
  
  // Apply category filter
  if (currentTutorialCategory) {
    filtered = filtered.filter(item => item.category === currentTutorialCategory);
  }
  
  // Apply search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.description.toLowerCase().includes(query)
    );
  }
  
  if (filtered.length === 0) {
    tutorialsList.innerHTML = '<li class="empty">No se encontraron tutoriales</li>';
    return;
  }
  
  tutorialsList.innerHTML = filtered.map(item => `
    <li class="card">
      <h3><a href="${item.link}" target="_blank" rel="noopener">${item.title}</a></h3>
      <p>${item.description}</p>
      <div class="meta">
        <span class="badge">${item.category}</span>
        ${item.sourceName ? `<span class="badge">${item.sourceName}</span>` : ''}
        <time>${formatDate(item.date)}</time>
      </div>
    </li>
  `).join('');
}

// Render apps
function renderApps() {
  const appsList = document.getElementById('appsList');
  if (!appsList) return;
  
  let filtered = APPS;
  
  // Apply category filter
  if (currentAppCategory) {
    filtered = filtered.filter(item => item.category === currentAppCategory);
  }
  
  // Apply search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.description.toLowerCase().includes(query)
    );
  }
  
  if (filtered.length === 0) {
    appsList.innerHTML = '<li class="empty">No se encontraron apps</li>';
    return;
  }
  
  appsList.innerHTML = filtered.map(item => `
    <li class="card">
      <h3><a href="${item.link}" target="_blank" rel="noopener">${item.name}</a></h3>
      <p>${item.description}</p>
      <div class="meta">
        <span class="badge">${item.category}</span>
        <span>${item.rating}</span>
      </div>
    </li>
  `).join('');
}

// Render prompts
function renderPrompts() {
  const promptsList = document.getElementById('promptsList');
  if (!promptsList) return;
  
  let filtered = PROMPTS;
  
  // Apply category filter
  if (currentPromptCategory) {
    filtered = filtered.filter(item => item.category === currentPromptCategory);
  }
  
  // Apply search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.prompt.toLowerCase().includes(query)
    );
  }
  
  if (filtered.length === 0) {
    promptsList.innerHTML = '<li class="empty">No se encontraron prompts</li>';
    return;
  }
  
  promptsList.innerHTML = filtered.map(item => `
    <li class="card">
      <h3>${item.title}</h3>
      <p><strong>Prompt:</strong> ${item.prompt}</p>
      <p class="meta">${item.example}</p>
      <div class="meta">
        <span class="badge">${item.category}</span>
      </div>
    </li>
  `).join('');
}

// Format date
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });
}

// Initialize filters
function initFilters() {
  // News source filter
  const newsSourceFilter = document.getElementById('newsSourceFilter');
  if (newsSourceFilter) {
    newsSourceFilter.addEventListener('change', (e) => {
      currentNewsSource = e.target.value;
      renderNews();
    });
  }
  
  // Tutorial category filter
  const tutorialCategorySelect = document.getElementById('tutorialCategorySelect');
  if (tutorialCategorySelect) {
    const categories = [...new Set(tutorialItems.map(t => t.category))];
    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      tutorialCategorySelect.appendChild(option);
    });
    tutorialCategorySelect.addEventListener('change', (e) => {
      currentTutorialCategory = e.target.value;
      renderTutorials();
    });
  }
  
  // App category filter
  const appCategorySelect = document.getElementById('appCategorySelect');
  if (appCategorySelect) {
    const categories = [...new Set(APPS.map(a => a.category))];
    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      appCategorySelect.appendChild(option);
    });
    appCategorySelect.addEventListener('change', (e) => {
      currentAppCategory = e.target.value;
      renderApps();
    });
  }
  
  // Prompt category filter
  const promptCategorySelect = document.getElementById('promptCategorySelect');
  if (promptCategorySelect) {
    const categories = [...new Set(PROMPTS.map(p => p.category))];
    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      promptCategorySelect.appendChild(option);
    });
    promptCategorySelect.addEventListener('change', (e) => {
      currentPromptCategory = e.target.value;
      renderPrompts();
    });
  }
}

// Initialize search
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const clearButton = document.getElementById('clearSearch');
  
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        searchQuery = e.target.value.trim();
        renderNews();
        renderTutorials();
        renderApps();
        renderPrompts();
      }, 300);
    });
  }
  
  if (clearButton) {
    clearButton.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchQuery = '';
        renderNews();
        renderTutorials();
        renderApps();
        renderPrompts();
      }
    });
  }
}

// Initialize app
async function init() {
  console.log('IA para todos blog loaded');
  
  // Fetch news feeds
  await fetchNewsFeeds();
  
  // Fetch tutorial feeds
  await fetchTutorialFeeds();
  
  // Render static content
  renderApps();
  renderPrompts();
  
  // Initialize filters and search
  initFilters();
  initSearch();
  
  console.log('Blog initialized');
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', init);