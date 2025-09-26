// main.js - ripple effect & scroll animations

// Ripple effect on buttons
function attachRipple(el) {
  el.addEventListener('click', function (e) {
    const rect = el.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    el.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
}

function initRipples() {
  document.querySelectorAll('.btn').forEach(attachRipple);
}

// Scroll-triggered animations
function initScrollAnimations() {
  const targets = document.querySelectorAll('.link-card, .content section, .hero-badge, .card');
  if (!('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('animate-in'));
    return;
  }
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  targets.forEach(el => {
    // start hidden state if not already
    el.classList.add('will-animate');
    obs.observe(el);
  });
}

// Bootstrap collapse fix for nav link auto-close on click (mobile)
function initAutoCollapseNav() {
  const nav = document.getElementById('navMain');
  if (!nav) return;
  nav.querySelectorAll('a.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const collapse = bootstrap.Collapse.getInstance(nav);
      if (collapse) collapse.hide();
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  initRipples();
  initScrollAnimations();
  initAutoCollapseNav();
});
