'use strict';

const toggle = document.querySelector('.nav-toggle');
const navigation = document.querySelector('#navigation');

function closeNavigation() {
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Открыть меню');
  navigation.classList.remove('open');
}

toggle.addEventListener('click', () => {
  const isOpen = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  navigation.classList.toggle('open', isOpen);
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeNavigation();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeNavigation();
    toggle.focus();
  }
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.header')) closeNavigation();
});
window.matchMedia('(min-width: 761px)').addEventListener('change', closeNavigation);

const filters = document.querySelectorAll('[data-filter]');
const drinks = document.querySelectorAll('.drink');
filters.forEach((button) => {
  button.addEventListener('click', () => {
    filters.forEach((filter) => {
      const selected = filter === button;
      filter.classList.toggle('active', selected);
      filter.setAttribute('aria-pressed', String(selected));
    });
    let count = 0;
    drinks.forEach((drink) => {
      const matches = button.dataset.filter === 'all' || drink.dataset.category === button.dataset.filter;
      drink.hidden = !matches;
      if (matches) {
        count += 1;
        drink.classList.add('visible');
      }
    });
    document.querySelector('#filter-status').textContent = `Показано напитков: ${count}`;
  });
});

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
  document.documentElement.classList.add('motion-ready');
}
document.querySelector('#year').textContent = new Date().getFullYear();
