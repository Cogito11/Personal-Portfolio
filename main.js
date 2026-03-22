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

  const mailto = `mailto:cdbishop2005@gmail.com`
    + `?subject=${encodeURIComponent(subject)}`
    + `&body=${encodeURIComponent(body)}`;

  // Use a hidden link click — more reliable than window.location.href
  const link = document.createElement('a');
  link.href = mailto;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Show fallback after a short delay in case no mail app opened
  setTimeout(() => {
    const fallback = document.getElementById('email-fallback');
    fallback.style.display = 'block';
    document.getElementById('fallback-content').textContent =
      `To: cdbishop2005@gmail.com\nSubject: ${subject}\n\n${body}`;
  }, 500);
}
