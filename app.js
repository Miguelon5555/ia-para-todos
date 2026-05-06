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
    name: 'Medium IA Español',
    url: 'https://medium.com/feed/tag/inteligencia-artificial',
    source: 'medium'
  },
  {
    name: 'Cyberhades IA',
    url: 'https://www.cyberhades.com/category/inteligencia-artificial/feed/',
    source: 'cyberhades'
  },
  {
    name: 'Innovation Legal IA',
    url: 'https://www.abogacia.es/publicaciones/blogs/blog-de-innovacion-legal/feed/',
    source: 'abogacia'
  }
];

// Static content for tutorials
const TUTORIALS = [
  {
    title: '¿Qué es ChatGPT y cómo usarlo?',
    description: 'Guía completa para principiantes sobre cómo empezar con ChatGPT.',
    category: 'ChatGPT',
    link: 'https://chat.openai.com',
    date: '2024-01-15'
  },
  {
    title: 'Cómo crear imágenes con IA',
    description: 'Tutorial paso a paso para generar imágenes usando inteligencia artificial.',
    category: 'Imágenes',
    link: '#',
    date: '2024-01-20'
  },
  {
    title: 'Mejores prompts para ChatGPT',
    description: 'Aprende a escribir prompts efectivos para obtener mejores resultados.',
    category: 'Prompts',
    link: '#prompts',
    date: '2024-02-01'
  },
  {
    title: 'Automatiza tareas con IA',
    description: 'Descubre cómo usar IA para automatizar tareas cotidianas.',
    category: 'Productividad',
    link: '#',
    date: '2024-02-10'
  },
  {
    title: 'IA para estudiantes',
    description: 'Herramientas de IA que te ayudarán a estudiar mejor.',
    category: 'Educación',
    link: '#',
    date: '2024-02-15'
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
        data.items.slice(0, 6).forEach(item => {
          // Extract category from tags or use default
          const category = item.categories?.[0] || 'Tutorial';
          
          allTutorials.push({
            title: item.title,
            link: item.link,
            description: item.description?.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
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
  
  // Add static tutorials as fallback
  if (allTutorials.length === 0) {
    console.log('📝 Usando tutoriales estáticos como fallback');
    tutorialItems = TUTORIALS;
  } else {
    // Sort by date (newest first)
    allTutorials.sort((a, b) => new Date(b.date) - new Date(a.date));
    tutorialItems = allTutorials;
    
    console.log(`✅ Total: ${allTutorials.length} tutoriales de ${successCount} fuentes`);
    
    // Populate category filter
    if (categorySelect) {
      categorySelect.innerHTML = '<option value="">Todas</option>';
      Array.from(categories).sort().forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categorySelect.appendChild(option);
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