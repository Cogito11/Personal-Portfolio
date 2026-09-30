// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    el.classList.add('visible');
    observer.unobserve(el);
    // The staggered reveal uses an inline transition-delay. Left in place it
    // also delays every hover animation on the element (up to 0.3s of lag),
    // so clear it once the reveal has finished.
    if (el.style.transitionDelay) {
      const delay = parseFloat(el.style.transitionDelay) || 0;
      setTimeout(() => { el.style.transitionDelay = ''; }, (delay + 0.5) * 1000);
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -80px 0px' });
reveals.forEach(el => observer.observe(el));

const navToggle = document.getElementById('mobile-nav-toggle');
const navLinks = document.getElementById('nav-links');
const nav = document.querySelector('nav');

if (navToggle && navLinks && nav) {
  const openMenu = () => {
    navLinks.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    nav.classList.add('nav-open');
  };
  const closeMenu = () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('nav-open');
  };
  const toggleMenu = () => {
    if (navLinks.classList.contains('is-open')) closeMenu();
    else openMenu();
  };

  navToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleMenu();
  });

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

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 901px)').matches) closeMenu();
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

// Make each software card clickable, takes you to its first action link
// (e.g. the live site / itch.io page / GitHub repo), unless the click
// landed directly on one of the card's own buttons, which handle
// themselves normally.
document.querySelectorAll('.software-card').forEach((card) => {
  const primaryLink = card.querySelector('.software-actions a');
  if (!primaryLink) return;

  card.addEventListener('click', (event) => {
    if (event.target.closest('a, button')) return;

    if (primaryLink.hasAttribute('download')) {
      primaryLink.click();
      return;
    }
    if (primaryLink.getAttribute('target') === '_blank') {
      window.open(primaryLink.href, '_blank');
      return;
    }
    window.location.href = primaryLink.href;
  });
});

// Software card logos: if an image is missing, swap in a monogram tile of the
// project's first letter so every card header keeps the same layout (instead
// of the title jumping left when a logo is absent).
document.querySelectorAll('.software-logo').forEach((img) => {
  const showMonogram = () => {
    const wrap = img.closest('.software-logo-wrap');
    const title = img.closest('.software-card')?.querySelector('.software-title');
    if (!wrap || !title) return;
    wrap.classList.add('is-monogram');
    wrap.setAttribute('aria-hidden', 'true');
    wrap.textContent = title.textContent.trim().charAt(0).toUpperCase();
  };
  if (img.complete && img.naturalWidth === 0) showMonogram();
  else img.addEventListener('error', showMonogram, { once: true });
});
