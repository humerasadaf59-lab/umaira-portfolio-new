const typingWords = ['Full-Stack Web Developer', 'AI-Focused Software Engineer', 'React / Node.js Developer', 'Python / Django Developer', 'AI Application Builder'];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;
const typingText = document.getElementById('typingText');

function typeEffect() {
  if (!typingText) return;
  const word = typingWords[wordIndex];
  typingText.textContent = deleting ? word.slice(0, charIndex - 1) : word.slice(0, charIndex + 1);
  charIndex += deleting ? -1 : 1;
  let delay = deleting ? 45 : 80;
  if (!deleting && charIndex === word.length) { deleting = true; delay = 1500; }
  if (deleting && charIndex === 0) { deleting = false; wordIndex = (wordIndex + 1) % typingWords.length; delay = 300; }
  setTimeout(typeEffect, delay);
}
typeEffect();

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  menuToggle.textContent = isOpen ? '×' : '☰';
});
navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open'); menuToggle?.setAttribute('aria-expanded', 'false'); if (menuToggle) menuToggle.textContent = '☰';
}));

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[char]);
}

async function fetchJson(url) {
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json();
}

async function loadProfile() {
  const profile = await fetchJson('/api/profile');
  document.getElementById('objectiveText').textContent = profile.objective;
  document.getElementById('availabilityText').textContent = profile.availability;
  document.getElementById('skillsList').innerHTML = profile.skills.map(skill => `<span class="skill">${escapeHtml(skill)}</span>`).join('');
  document.getElementById('experienceList').innerHTML = profile.experience.map(item => `
    <article class="timeline-item reveal"><div class="timeline-dot"></div><p class="period">${escapeHtml(item.period)}</p><h3>${escapeHtml(item.role)}</h3><p class="organization">${escapeHtml(item.organization)}</p><ul>${item.details.map(detail => `<li>${escapeHtml(detail)}</li>`).join('')}</ul></article>
  `).join('');
  document.getElementById('certificationsGrid').innerHTML = profile.certifications.map((cert, index) => `
    <article class="cert-card reveal"><span>${String(index + 1).padStart(2, '0')}</span><div><h3>${escapeHtml(cert)}</h3><p>Professional learning credential / technical training</p></div></article>
  `).join('');
  activateReveal();
}

let allProjects = [];
let activeCategory = 'All';

async function loadProjects() {
  allProjects = await fetchJson('/api/projects');
  const categories = ['All', ...new Set(allProjects.map(project => project.category))];
  document.getElementById('filters').innerHTML = categories.map((category, index) => `<button class="filter ${index === 0 ? 'selected' : ''}" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join('');
  document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(item => item.classList.remove('selected'));
    button.classList.add('selected'); activeCategory = button.dataset.category; renderProjects();
  }));
  document.getElementById('projectSearch')?.addEventListener('input', renderProjects);
  renderProjects();
}

function renderProjects() {
  const query = (document.getElementById('projectSearch')?.value || '').trim().toLowerCase();
  const projects = allProjects.filter(project => {
    const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
    const haystack = [project.title, project.description, project.organization, project.type, ...(project.tags || [])].join(' ').toLowerCase();
    return matchesCategory && (!query || haystack.includes(query));
  });

  const grid = document.getElementById('projectsGrid');
  if (!projects.length) {
    grid.innerHTML = `<div class="empty-state">No projects match your search. Try another keyword or choose <strong>All</strong>.</div>`;
    return;
  }

  grid.innerHTML = projects.map(project => {
    const links = [];
    if (project.demo) links.push(`<a class="project-link" href="${escapeHtml(project.demo)}" target="_blank" rel="noopener noreferrer">${escapeHtml(project.label || 'Live Demo')} ↗</a>`);
    if (project.github) links.push(`<a class="project-link secondary-link" href="${escapeHtml(project.github)}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>`);
    const tags = (project.tags || []).map(tag => `<span>${escapeHtml(tag)}</span>`).join('');
    return `<article class="project-card reveal ${project.featured ? 'featured-project' : ''}">
      <div class="project-top"><p class="project-meta">${escapeHtml(project.category)}</p><span class="project-year">${escapeHtml(project.year || '2026')}</span></div>
      <h3>${escapeHtml(project.title)}</h3><p>${escapeHtml(project.description)}</p>
      <div class="project-tags">${tags}</div>
      <div class="project-org">${escapeHtml(project.organization || project.type || 'Independent Project')}</div>
      <div class="project-links">${links.join('')}</div>
    </article>`;
  }).join('');
  activateReveal();
}

async function loadStats() {
  try {
    const stats = await fetchJson('/api/stats');
    document.getElementById('statProjects').textContent = `${stats.projects}+`;
    document.getElementById('statLive').textContent = `${stats.liveDemos}+`;
    document.getElementById('statInternships').textContent = String(stats.internships);
    document.getElementById('projectCount').textContent = `${stats.projects}+`;
  } catch (error) { console.warn('Stats unavailable:', error); }
}

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('show'); revealObserver.unobserve(entry.target); } });
}, { threshold: 0.08 });
function activateReveal() { document.querySelectorAll('.reveal:not(.show)').forEach(element => revealObserver.observe(element)); }

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
    const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
    active?.classList.add('active');
  });
}, { threshold: 0.35 });
document.querySelectorAll('section[id]').forEach(section => sectionObserver.observe(section));

const progress = document.getElementById('topProgress');
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}, { passive: true });

const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.getElementById('formStatus');
  const button = form.querySelector('button[type="submit"]');
  const payload = Object.fromEntries(new FormData(form).entries());
  status.textContent = 'Sending...'; status.className = 'form-status'; button.disabled = true; button.textContent = 'Sending...';
  try {
    const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Unable to send message.');
    status.textContent = result.message; status.className = 'form-status success'; form.reset();
  } catch (error) {
    const subject = encodeURIComponent(`Portfolio inquiry from ${payload.name}`);
    const body = encodeURIComponent(`Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`);
    const mailto = `mailto:humerasadaf59@gmail.com?subject=${subject}&body=${body}`;
    status.innerHTML = `${escapeHtml(error.message)} <a href="${mailto}">Email me directly ↗</a>`;
    status.className = 'form-status error';
  } finally { button.disabled = false; button.textContent = 'Send Message'; }
});

Promise.all([loadProfile(), loadProjects(), loadStats()]).catch(error => console.error('Portfolio loading error:', error));
