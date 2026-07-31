// ============================================
// 🎮 HUD NAVIGATION — Scroll tracking
// ============================================

class HudNav {
  constructor() {
    this.nav = document.querySelector('.hud-nav');
    this.links = document.querySelectorAll('.hud-nav-link');
    this.progress = document.querySelector('.hud-progress');
    this.toggle = document.querySelector('.hud-menu-toggle');
    this.menu = document.querySelector('.hud-nav-links');
    this.sections = document.querySelectorAll('.game-section');
    this.isVisible = false;

    this.bindEvents();
  }

  show() {
    if (this.isVisible) return;
    this.isVisible = true;
    this.nav.classList.add('visible');
  }

  bindEvents() {
    // Smooth scroll to sections
    this.links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-section');
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          // Close mobile menu
          if (this.menu) this.menu.classList.remove('open');
        }
      });
    });

    // Mobile toggle
    if (this.toggle) {
      this.toggle.addEventListener('click', () => {
        this.menu.classList.toggle('open');
      });
    }

    // Scroll tracking
    window.addEventListener('scroll', () => this.onScroll());
  }

  onScroll() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollY / docHeight) * 100;

    // Update progress bar
    if (this.progress) {
      this.progress.style.width = scrollPercent + '%';
    }

    // Update active section
    this.sections.forEach((section) => {
      const top = section.offsetTop - 100;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < bottom) {
        this.links.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('data-section') === id) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}
