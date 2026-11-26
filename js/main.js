const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
function closeMenu() {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
}
menu.addEventListener('click', () => {
  const opened = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(opened));
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    closeMenu();
    menu.focus();
  }
});
for (const button of document.querySelectorAll('[data-filter]')) {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.querySelectorAll('[data-category]').forEach(card => {
      card.hidden = selected !== 'All plans' && selected !== card.dataset.category;
    });
  });
}
const slides = [...document.querySelectorAll('.slide')];
if (slides.length) {
  let index = 0;
  let paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pause = document.querySelector('#pause');
  function show(delta) {
    index = (index + slides.length + delta) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== index; });
    document.querySelector('#count').textContent = '0' + (index + 1) + ' / 03';
  }
  function labelPause() {
    pause.textContent = paused ? '▶' : 'Ⅱ';
    pause.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow');
  }
  labelPause();
  pause.addEventListener('click', () => { paused = !paused; labelPause(); });
  document.querySelector('#prev').addEventListener('click', () => show(-1));
  document.querySelector('#next').addEventListener('click', () => show(1));
  window.setInterval(() => {
    if (!paused && !document.hidden && !document.querySelector('.hero:focus-within, .hero:hover')) show(1);
  }, 7200);
}
const form = document.querySelector('form');
if (form) {
  const selected = new URLSearchParams(location.search).get('plan');
  const select = form.elements.plan;
  if ([...select.options].some(option => option.value === selected)) select.value = selected;
  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = form.elements.name.value.trim();
    if (!name) { form.elements.name.focus(); return; }
    const plan = select.selectedOptions[0].textContent;
    const message = ['Hello Sigma Insurance Brokers LLC,', 'My name is ' + name + '.', 'I would like a quote for ' + plan + '.', form.elements.notes.value.trim()].filter(Boolean).join('\n');
    location.href = 'https://wa.me/971581453550?text=' + encodeURIComponent(message);
  });
}
