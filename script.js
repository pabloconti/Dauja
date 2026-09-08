'use strict';

// Local SVG icons are rendered through CSS masks: no library or external requests.
document.querySelectorAll('[data-icon]').forEach(icon => {
  icon.style.setProperty('--icon', `url("assets/icons/${icon.dataset.icon}.svg")`);
  icon.setAttribute('aria-hidden', 'true');
});

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const header = document.querySelector('.header');
const menuBackdrop = document.querySelector('.menu-backdrop');
const mobileNav = matchMedia('(max-width: 980px)');
const navLinks = [...navigation.querySelectorAll('a')];
const mainContent = document.querySelector('main');
const pageFooter = document.querySelector('.footer');
const navIndicator = document.querySelector('.nav-indicator');
function positionNavIndicator(link = navLinks.find(item => item.classList.contains('active'))) {
  if (!link || mobileNav.matches) return;
  navIndicator.style.width = link.offsetWidth + 'px';
  navIndicator.style.transform = 'translateX(' + link.offsetLeft + 'px)';
}
function closeMenu(restoreFocus = false) {
  navigation.classList.remove('open');
  document.body.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menú');
  navigation.inert = mobileNav.matches;
  mainContent.inert = false;
  pageFooter.inert = false;
  if (restoreFocus) menuButton.focus();
}
function openMenu() {
  if (!mobileNav.matches) return;
  navigation.inert = false;
  navigation.classList.add('open');
  document.body.classList.add('menu-open');
  menuButton.setAttribute('aria-expanded', 'true');
  menuButton.setAttribute('aria-label', 'Cerrar menú');
  mainContent.inert = true;
  pageFooter.inert = true;
}
menuButton.addEventListener('click', () => {
  if (navigation.classList.contains('open')) closeMenu(true);
  else openMenu();
});
menuBackdrop.addEventListener('click', () => closeMenu(true));
header.querySelector('.brand').addEventListener('click', () => closeMenu());
navLinks.forEach(link => {
  link.addEventListener('pointerenter', () => positionNavIndicator(link));
  link.addEventListener('focus', () => positionNavIndicator(link));
  link.addEventListener('click', () => {
    const wasMobile = mobileNav.matches;
    closeMenu();
    if (wasMobile) {
      const target = document.querySelector(link.hash);
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  });
});
navigation.addEventListener('pointerleave', () => positionNavIndicator());
navigation.addEventListener('focusout', () => requestAnimationFrame(() => {
  if (!navigation.contains(document.activeElement)) positionNavIndicator();
}));
document.addEventListener('keydown', event => {
  if (!navigation.classList.contains('open')) return;
  if (event.key === 'Escape') { event.preventDefault(); closeMenu(true); }
  if (event.key === 'Tab') {
    const focusable = [menuButton, ...navigation.querySelectorAll('a, button')];
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
mobileNav.addEventListener('change', () => { closeMenu(); positionNavIndicator(); });
window.addEventListener('resize', () => {
  navGeometryDirty = true;
  if (!scrollPending) {
    scrollPending = true;
    requestAnimationFrame(updateActiveSection);
  }
}, { passive: true });
closeMenu();
const sections = [...document.querySelectorAll('main section[id]')].filter(section => navLinks.some(link => link.hash === '#' + section.id));
let scrollPending = false;
let activeSectionId = null;
let navGeometryDirty = true;
function updateActiveSection() {
  let current = sections[0].id;
  const sectionThreshold = header.offsetHeight + 60;
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= sectionThreshold) current = section.id;
  }
  const maxScroll = document.documentElement.scrollHeight - innerHeight;
  if (maxScroll > 0 && scrollY >= maxScroll - 4) current = sections[sections.length - 1].id;
  if (current !== activeSectionId || navGeometryDirty) {
    navGeometryDirty = false;
    activeSectionId = current;
    navLinks.forEach(link => {
    const active = link.hash === '#' + current;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
    positionNavIndicator();
  }
  header.classList.toggle('is-scrolled', scrollY > 16);
  header.style.setProperty('--scroll-progress', maxScroll > 0 ? Math.min(1, scrollY / maxScroll) : 0);
  scrollPending = false;
}
window.addEventListener('scroll', () => {
  if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateActiveSection); }
}, { passive: true });
document.fonts.ready.then(() => positionNavIndicator());
updateActiveSection();

// A slow, reversible rail: every brand remains accessible without duplicate logos.
const clientViewport = document.querySelector('.client-viewport');
const clientMotion = matchMedia('(prefers-reduced-motion: reduce)');
let clientPaused = clientMotion.matches, clientHovered = false, clientFocused = false;
let clientVisible = false, clientDirection = 1, clientFrame = 0, clientTime = 0, clientPosition = 0;
let clientLimit = Math.max(0, clientViewport.scrollWidth - clientViewport.clientWidth);
function setClientPause(paused) {
  clientPaused = paused;
  syncClientMotion();
}
function animateClients(time) {
  const delta = clientTime ? Math.min(time - clientTime, 40) : 0;
  clientTime = time;
  const limit = clientLimit;
  clientPosition = Math.max(0, Math.min(limit, clientPosition + clientDirection * delta * .025));
  clientViewport.scrollLeft = clientPosition;
  if (clientPosition >= limit) clientDirection = -1;
  if (clientPosition <= 0) clientDirection = 1;
  clientFrame = requestAnimationFrame(animateClients);
}
function syncClientMotion() {
  cancelAnimationFrame(clientFrame); clientTime = 0;
  if (!clientPaused && !clientHovered && !clientFocused && clientVisible && !document.hidden && clientLimit > 0) {
    clientPosition = clientViewport.scrollLeft;
    clientFrame = requestAnimationFrame(animateClients);
  }
}
clientViewport.addEventListener('mouseenter', () => { clientHovered = true; syncClientMotion(); });
clientViewport.addEventListener('mouseleave', () => { clientHovered = false; syncClientMotion(); });
clientViewport.addEventListener('focusin', () => { clientFocused = true; syncClientMotion(); });
clientViewport.addEventListener('focusout', () => { clientFocused = false; syncClientMotion(); });
clientViewport.addEventListener('pointerdown', () => setClientPause(true), { passive: true });
clientViewport.addEventListener('wheel', () => setClientPause(true), { passive: true });
function moveClients(direction) {
  setClientPause(true);
  clientViewport.scrollBy({ left: direction * (clientViewport.clientWidth * .7), behavior: clientMotion.matches ? 'instant' : 'smooth' });
}
clientViewport.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); moveClients(event.key === 'ArrowRight' ? 1 : -1); }
});
new IntersectionObserver(entries => { clientVisible = entries[0].isIntersecting; syncClientMotion(); }).observe(clientViewport);
function resizeClientRail() {
  clientLimit = Math.max(0, clientViewport.scrollWidth - clientViewport.clientWidth);
  syncClientMotion();
}
const clientResizeObserver = new ResizeObserver(resizeClientRail);
clientResizeObserver.observe(clientViewport);
clientResizeObserver.observe(document.querySelector('.client-track'));
window.addEventListener('resize', resizeClientRail, { passive: true });
document.addEventListener('visibilitychange', syncClientMotion);
clientMotion.addEventListener('change', () => setClientPause(clientMotion.matches));
setClientPause(clientPaused);

const dialog = document.querySelector('#contact-dialog');
const form = document.querySelector('#contact-form');
const result = document.querySelector('#contact-result');
let contactTrigger;
document.querySelectorAll('[data-contact]').forEach(button => button.addEventListener('click', () => {
  contactTrigger = mobileNav.matches && navigation.contains(button) ? menuButton : button;
  closeMenu();
  form.hidden = false;
  result.hidden = true;
  dialog.showModal();
  document.body.classList.add('modal-open');
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  contactTrigger?.focus();
});
form.addEventListener('submit', event => {
  event.preventDefault();
  const fields = new FormData(form);
  document.querySelector('#message-preview').textContent = `Consulta para Dauja S.R.L.\n\nNombre / empresa: ${fields.get('name').trim()}\nEmail: ${fields.get('email').trim()}\n\n${fields.get('message').trim()}`;
  form.hidden = true;
  result.hidden = false;
  document.querySelector('#copy-status').textContent = '';
  document.querySelector('#copy-message').focus();
});
document.querySelector('#copy-message').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText(document.querySelector('#message-preview').textContent);
    status.textContent = 'Consulta copiada. Podés pegarla donde quieras.';
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(document.querySelector('#message-preview'));
    selection.removeAllRanges();
    selection.addRange(range);
    status.textContent = 'Texto seleccionado. Copialo con el menú de tu dispositivo o Ctrl/Cmd + C.';
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();

// Decorative route motion only runs while visible, with a user pause control.
const processSection = document.querySelector('.process');
const routeToggle = document.querySelector('.route-toggle');
if (processSection && routeToggle) {
  const routeObserver = new IntersectionObserver(entries => {
    processSection.classList.toggle('route-in-view', entries[0].isIntersecting);
  }, { threshold: 0 });
  routeObserver.observe(processSection);
  routeToggle.addEventListener('click', () => {
    const paused = processSection.classList.toggle('route-paused');
    routeToggle.setAttribute('aria-pressed', String(paused));
    const label = paused ? 'Reanudar animación del recorrido' : 'Pausar animación del recorrido';
    routeToggle.setAttribute('aria-label', label);
    routeToggle.title = label;
    routeToggle.firstElementChild.textContent = paused ? '▶' : 'Ⅱ';
  });
}

// Synchronize all route stops and cards for mouse, keyboard and touch.
const routeMarkers = [...document.querySelectorAll('.route-marker[data-step]')];
const processCards = [...document.querySelectorAll('.steps>li[data-step]')];
let pinnedStep = null;
function highlightStep(step) {
  routeMarkers.forEach(marker => {
    const active = marker.dataset.step === step;
    marker.classList.toggle('is-selected', active);
    marker.setAttribute('aria-pressed', String(active));
  });
  processCards.forEach(card => card.classList.toggle('is-selected', card.dataset.step === step));
}
function restoreStep() {
  const focused = document.activeElement?.closest('.route-marker[data-step],.steps>li[data-step]');
  highlightStep(focused?.dataset.step || pinnedStep);
}
[...routeMarkers, ...processCards].forEach(item => {
  item.addEventListener('pointerenter', event => {
    if (event.pointerType !== 'touch') highlightStep(item.dataset.step);
  });
  item.addEventListener('pointerleave', restoreStep);
  item.addEventListener('focus', () => highlightStep(item.dataset.step));
  item.addEventListener('blur', () => queueMicrotask(restoreStep));
});
routeMarkers.forEach(marker => marker.addEventListener('click', () => {
  pinnedStep = marker.dataset.step;
  highlightStep(pinnedStep);
  if (matchMedia('(max-width: 700px)').matches) {
    document.getElementById(marker.getAttribute('aria-controls')).scrollIntoView({
      block: 'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
    });
  }
}));
processSection?.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    pinnedStep = null;
    if (document.activeElement?.matches('.route-marker,.steps>li')) document.activeElement.blur();
    highlightStep(null);
  }
});

// A single subtle entrance sweep; no continuous background animation.
const securitySection = document.querySelector('.security');
if (securitySection) {
  const securityObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      securitySection.classList.add('is-revealed');
      securityObserver.unobserve(securitySection);
    }
  }, { threshold: 0 });
  securityObserver.observe(securitySection);
}

// A single soft light pass when the compact contact banner enters the viewport.
const ctaSection = document.querySelector('.cta');
const ctaObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    ctaSection.classList.add('is-revealed');
    ctaObserver.disconnect();
  }
}, { threshold: .25 });
ctaObserver.observe(ctaSection);

// Content stays visible without JavaScript; entrance effects run only once in view.
const editorialMotion = matchMedia('(prefers-reduced-motion: reduce)');
const editorialAnimations = new Set();
function animateEditorial(element, keyframes, options = {}) {
  if (editorialMotion.matches || !element.animate) return;
  const animation = element.animate(keyframes, { duration: 650, easing: 'cubic-bezier(.2,.75,.2,1)', ...options });
  editorialAnimations.add(animation);
  const cleanup = () => editorialAnimations.delete(animation);
  animation.addEventListener('finish', cleanup, { once: true });
  animation.addEventListener('cancel', cleanup, { once: true });
}
const heroCopy = document.querySelector('.hero-copy');
[...heroCopy.children].forEach((element, index) => animateEditorial(element,
  [{ opacity: .65, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }],
  { duration: 750, delay: index * 60 }));
const editorialObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const element = entry.target;
    animateEditorial(element, [{ opacity: .45, translate: '0 16px' }, { opacity: 1, translate: '0 0' }]);
    editorialObserver.unobserve(element);
  });
}, { threshold: .1 });
document.querySelectorAll('.about-copy, .photo-collage, .stats, .capabilities-intro, .experience-card, .capability-cards .dark-card').forEach(element => editorialObserver.observe(element));
const historyDetails = document.querySelector('.history-details');
historyDetails.addEventListener('toggle', () => {
  if (historyDetails.open) historyDetails.querySelectorAll('p').forEach(element => animateEditorial(element,
    [{ opacity: .5, translate: '0 -5px' }, { opacity: 1, translate: '0 0' }], { duration: 300 }));
});
document.querySelectorAll('.capabilities .dark-card').forEach(card => {
  card.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || editorialMotion.matches) return;
    const bounds = card.getBoundingClientRect();
    card.style.setProperty('--card-x', (event.clientX - bounds.left) + 'px');
    card.style.setProperty('--card-y', (event.clientY - bounds.top) + 'px');
  }, { passive: true });
});
editorialMotion.addEventListener('change', () => {
  if (editorialMotion.matches) [...editorialAnimations].forEach(animation => animation.cancel());
});
