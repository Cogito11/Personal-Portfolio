// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

const navToggle = document.getElementById('mobile-nav-toggle');
const navLinks = document.getElementById('nav-links');
const nav = document.querySelector('nav');

if (navToggle && navLinks && nav) {
  const isMobile = () => window.matchMedia('(max-width: 900px)').matches;

  const openMenu = () => {
    navLinks.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
  };
  const closeMenu = () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };
  const toggleMenu = () => {
    if (navLinks.classList.contains('is-open')) closeMenu();
    else openMenu();
  };

  document.addEventListener('click', (event) => {
    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedToggle = navToggle.contains(event.target);
    if (!clickedInsideMenu && !clickedToggle && navLinks.classList.contains('is-open')) {
      closeMenu();
    }
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // --- Draggable floating button (mobile only) ---
  // Press and hold + move to drag the button; release to snap it to
  // whichever of the 4 screen corners it's closest to. A simple tap
  // (no meaningful movement) just opens/closes the menu as usual.
  const EDGE_MARGIN = 19.2; // ~1.2rem in px
  const DRAG_THRESHOLD = 8; // px of movement before it counts as a drag

  const CORNER_STYLES = {
    'top-left':     { top: EDGE_MARGIN + 'px', left: EDGE_MARGIN + 'px', right: 'auto', bottom: 'auto' },
    'top-right':    { top: EDGE_MARGIN + 'px', right: EDGE_MARGIN + 'px', left: 'auto', bottom: 'auto' },
    'bottom-left':  { bottom: EDGE_MARGIN + 'px', left: EDGE_MARGIN + 'px', right: 'auto', top: 'auto' },
    'bottom-right': { bottom: EDGE_MARGIN + 'px', right: EDGE_MARGIN + 'px', left: 'auto', top: 'auto' },
  };

  let currentCorner = nav.getAttribute('data-corner') || 'bottom-right';

  const applyCorner = (corner) => {
    currentCorner = corner;
    nav.setAttribute('data-corner', corner);
    if (!isMobile()) return;
    const pos = CORNER_STYLES[corner];
    Object.assign(nav.style, pos);
  };

  const clearInlinePosition = () => {
    nav.style.top = '';
    nav.style.left = '';
    nav.style.right = '';
    nav.style.bottom = '';
  };

  // Set the initial corner (bottom-right) so state stays in sync;
  // inline positioning itself only kicks in on mobile widths.
  applyCorner(currentCorner);

  let pointerId = null;
  let startX = 0, startY = 0;
  let originLeft = 0, originTop = 0;
  let dragging = false;
  let justDragged = false;

  navToggle.addEventListener('pointerdown', (event) => {
    if (!isMobile()) return;
    pointerId = event.pointerId;
    dragging = false;
    startX = event.clientX;
    startY = event.clientY;
    const rect = nav.getBoundingClientRect();
    originLeft = rect.left;
    originTop = rect.top;
  });

  navToggle.addEventListener('pointermove', (event) => {
    if (pointerId !== event.pointerId) return;
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;

    if (!dragging) {
      if (Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
      dragging = true;
      closeMenu();
      nav.classList.add('nav-dragging');
      navToggle.classList.add('is-grabbed');
      navToggle.setPointerCapture(pointerId);
      nav.style.right = 'auto';
      nav.style.bottom = 'auto';
    }

    const navRect = nav.getBoundingClientRect();
    const maxLeft = window.innerWidth - navRect.width;
    const maxTop = window.innerHeight - navRect.height;
    const nextLeft = Math.min(Math.max(originLeft + dx, 0), Math.max(maxLeft, 0));
    const nextTop = Math.min(Math.max(originTop + dy, 0), Math.max(maxTop, 0));

    nav.style.left = nextLeft + 'px';
    nav.style.top = nextTop + 'px';
  });

  const endDrag = (event) => {
    if (pointerId !== event.pointerId) return;
    nav.classList.remove('nav-dragging');
    navToggle.classList.remove('is-grabbed');

    if (dragging) {
      justDragged = true;
      const navRect = nav.getBoundingClientRect();
      const centerX = navRect.left + navRect.width / 2;
      const centerY = navRect.top + navRect.height / 2;
      const corner = (centerY < window.innerHeight / 2 ? 'top-' : 'bottom-')
        + (centerX < window.innerWidth / 2 ? 'left' : 'right');
      applyCorner(corner);
      setTimeout(() => { justDragged = false; }, 50);
    }

    dragging = false;
    pointerId = null;
  };

  navToggle.addEventListener('pointerup', endDrag);
  navToggle.addEventListener('pointercancel', endDrag);

  navToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    if (justDragged) return;
    toggleMenu();
  });

  window.addEventListener('resize', () => {
    if (isMobile()) applyCorner(currentCorner);
    else clearInlinePosition();
  });
}

function sendEmail() {
  const name    = document.getElementById('contact-name').value;
  const email   = document.getElementById('contact-email').value;
  const subject = document.getElementById('contact-subject').value;
  const message = document.getElementById('contact-message').value;

  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;

  const gmailUrl = `https://mail.google.com/mail/?view=cm&to=cdbishop2005@gmail.com`
    + `&su=${encodeURIComponent(subject)}`
    + `&body=${encodeURIComponent(body)}`;

  window.open(gmailUrl, '_blank');
}