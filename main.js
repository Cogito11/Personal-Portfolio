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