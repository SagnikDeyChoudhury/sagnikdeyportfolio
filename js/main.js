// Cursor glow
const glow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top  = e.clientY + 'px';
});

// Contact form
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn      = document.getElementById('submitBtn');
    const btnText  = document.getElementById('btnText');
    const response = document.getElementById('formResponse');

    btnText.textContent = 'Sending…';
    btn.disabled = true;
    response.className = 'form-response';
    response.textContent = '';

    const formData = {
      name:    form.name.value,
      email:   form.email.value,
      message: form.message.value,
    };

    try {
      const res    = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      response.textContent = result.message || result.error;
      response.classList.add(res.ok ? 'success' : 'error');
      if (res.ok) form.reset();
    } catch (err) {
      response.textContent = 'Something went wrong. Please try again.';
      response.classList.add('error');
    } finally {
      btnText.textContent = 'Send Message';
      btn.disabled = false;
    }
  });
}

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity  = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(20px)';
  el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
  observer.observe(el);
});
