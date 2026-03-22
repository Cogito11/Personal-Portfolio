// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

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