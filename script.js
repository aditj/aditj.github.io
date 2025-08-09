document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  const menuToggle = document.getElementById('menu-toggle');
  const primaryNav = document.getElementById('primary-nav');
  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', function () {
      const open = primaryNav.classList.toggle('is-open');
      this.setAttribute('aria-expanded', String(open));
    });
  }

  // Dark mode disabled; ensure light theme
  const root = document.documentElement;
  root.removeAttribute('data-theme');
  try { localStorage.setItem('theme', 'light'); } catch (_) {}

  // Publications: Show all / Show less
  const papersList = document.getElementById('papers');
  const togglePubsBtn = document.getElementById('toggle-pubs');
  const searchInput = document.getElementById('pubs-search');
  const tagsContainer = document.getElementById('pubs-tags');
  const defaultVisibleCount = 6;

  function normalizeText(text) { return (text || '').toLowerCase(); }

  function collectUniqueTags() {
    if (!papersList || !tagsContainer) return [];
    const tags = new Set();
    papersList.querySelectorAll('.pub-tag').forEach(tag => tags.add(tag.textContent.trim()));
    return Array.from(tags);
  }

  function renderTags(tags) {
    if (!tagsContainer) return;
    tagsContainer.innerHTML = '';
    tags.forEach(t => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chip';
      btn.textContent = t;
      btn.dataset.tag = t;
      btn.addEventListener('click', () => {
        btn.classList.toggle('is-active');
        applyFilterClamp();
      });
      tagsContainer.appendChild(btn);
    });
  }

  function getActiveTags() {
    if (!tagsContainer) return [];
    return Array.from(tagsContainer.querySelectorAll('.chip.is-active')).map(chip => chip.dataset.tag);
  }

  function matchFilters(li) {
    const query = normalizeText(searchInput ? searchInput.value : '');
    const activeTags = getActiveTags();
    const text = normalizeText(li.textContent);
    const hasQuery = query.length === 0 || text.includes(query);
    const hasTags = activeTags.length === 0 || activeTags.every(tag => text.includes(tag.toLowerCase()));
    return hasQuery && hasTags;
  }

  function applyFilterClamp(expandedState) {
    if (!papersList) return;
    const items = Array.from(papersList.querySelectorAll('li'));
    let visibleIdx = 0;
    const expanded = expandedState !== undefined ? expandedState : (togglePubsBtn && togglePubsBtn.getAttribute('aria-expanded') === 'true');
    items.forEach(li => {
      if (matchFilters(li)) {
        if (!expanded && visibleIdx >= defaultVisibleCount) {
          li.classList.add('hidden');
        } else {
          li.classList.remove('hidden');
        }
        visibleIdx += 1;
      } else {
        li.classList.add('hidden');
      }
    });
    if (togglePubsBtn) {
      const anyHidden = items.some(li => li.classList.contains('hidden'));
      togglePubsBtn.style.display = anyHidden ? '' : 'none';
    }
  }

  if (papersList) {
    renderTags(collectUniqueTags());
    applyFilterClamp(false);
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => applyFilterClamp(false));
  }

  if (togglePubsBtn) {
    togglePubsBtn.addEventListener('click', function () {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!isExpanded));
      this.textContent = !isExpanded ? 'Show less' : 'Show all';
      applyFilterClamp(!isExpanded);
    });
  }

  // Decks: collapsed by default, toggle on button click
  const decks = document.getElementById('decks');
  const toggleDecksBtn = document.getElementById('toggle-decks');
  if (toggleDecksBtn && decks) {
    toggleDecksBtn.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      const next = !expanded;
      this.setAttribute('aria-expanded', String(next));
      this.textContent = next ? 'Hide decks' : 'Show decks';
      decks.classList.toggle('hidden', !next);
      decks.setAttribute('aria-hidden', String(!next));
    });
  }

  // Populate recent blog posts on the homepage (prefer front-matter in .md files)
  const blogList = document.getElementById('blog');
  function appendBlogItem(href, title, dateText, excerptText) {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = href;
    link.textContent = title;
    const meta = document.createElement('div');
    meta.className = 'post-meta';
    if (dateText) meta.textContent = dateText;
    const excerpt = document.createElement('div');
    excerpt.className = 'post-excerpt';
    if (excerptText) excerpt.textContent = excerptText;
    li.appendChild(link);
    if (dateText) li.appendChild(meta);
    if (excerptText) li.appendChild(excerpt);
    blogList.appendChild(li);
  }
  function parseFrontMatter(md) {
    if (!md.startsWith('---')) return { meta: {}, body: md };
    const end = md.indexOf('\n---');
    if (end === -1) return { meta: {}, body: md };
    const fm = md.slice(3, end).trim();
    const body = md.slice(end + 4).trim();
    const meta = {};
    fm.split(/\r?\n/).forEach(line => {
      const idx = line.indexOf(':');
      if (idx === -1) return;
      const key = line.slice(0, idx).trim();
      let val = line.slice(idx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      meta[key] = val;
    });
    return { meta, body };
  }

  async function fetchFrontMatter(slug) {
    const res = await fetch(`/posts/${encodeURIComponent(slug)}.md`);
    if (!res.ok) throw new Error('not found');
    const md = await res.text();
    const fm = parseFrontMatter(md);
    return { slug, meta: fm.meta, body: fm.body };
  }

  if (blogList) {
    fetch('data/posts.json')
      .then(res => res.ok ? res.json() : [])
      .then(data => Array.isArray(data) ? data.map(p => (typeof p === 'string' ? p : p.slug)) : [])
      .then(async slugs => {
        const posts = await Promise.all(slugs.map(s => fetchFrontMatter(s).catch(() => null)));
        const valid = posts.filter(Boolean);
        valid.sort((a, b) => new Date(b.meta.date || 0) - new Date(a.meta.date || 0));
        valid.slice(0, 3).forEach(p => {
          const dateText = p.meta.date ? new Date(p.meta.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '';
          appendBlogItem(`/blog.html?slug=${encodeURIComponent(p.slug)}`, p.meta.title || p.slug, dateText, p.meta.excerpt || '');
        });
      })
      .catch(() => {
        appendBlogItem('https://github.com/aditj/aditj.github.io/wiki/The-Branching-Point', 'The Branching Point');
        appendBlogItem('https://github.com/aditj/aditj.github.io/wiki/Note-on-Flow---the-book---11--07-2020', 'The experience of experience');
      });
  }

  // Image interaction removed for a cleaner, minimal presentation
});
