// ============================================
// 🎮 MAIN — App orchestration
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize particle background
  const particles = new ParticleSystem('particles-canvas');

  // Initialize custom cursor
  const cursor = new GameCursor();

  // Initialize landing screen
  const landing = new LandingScreen(() => {
    // After start button clicked, boot up the main experience
    bootSequence();
  });

  // Initialize scroll animations
  const scrollAnims = new ScrollAnimations();

  // Initialize skills system
  const skills = new SkillSystem();

  // Initialize HUD navigation
  const hudNav = new HudNav();

  // Boot sequence — called after landing transition
  function bootSequence() {
    // Show HUD nav
    setTimeout(() => {
      hudNav.show();
    }, 500);

    // Animate stat bars in about section
    setTimeout(() => {
      document.querySelectorAll('.stat-bar').forEach((bar) => {
        const w = bar.getAttribute('data-width');
        if (w) bar.style.width = w + '%';
      });
    }, 1000);
  }

  // Contact form handler
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formEl = contactForm;
      const successEl = document.querySelector('.terminal-success');
      if (formEl && successEl) {
        formEl.style.display = 'none';
        successEl.classList.add('show');
      }
    });
  }
});
