// ============================================
// 🎮 LANDING — Start screen logic
// ============================================

class LandingScreen {
  constructor(onStart) {
    this.landing = document.getElementById('landing');
    this.startBtn = document.getElementById('start-btn');
    this.flash = document.querySelector('.screen-flash');
    this.loader = document.querySelector('.landing-loader');
    this.loaderFill = document.querySelector('.loader-fill');
    this.onStart = onStart;
    this.started = false;

    this.bindEvents();
  }

  bindEvents() {
    if (this.startBtn) {
      this.startBtn.addEventListener('click', () => this.start());
    }

    // Also allow Enter key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !this.started) {
        this.start();
      }
    });
  }

  start() {
    if (this.started) return;
    this.started = true;

    // Show loader
    if (this.loader) {
      this.loader.classList.add('active');
      this.animateLoader();
    }
  }

  animateLoader() {
    let progress = 0;
    const steps = [
      { target: 30, delay: 200 },
      { target: 60, delay: 400 },
      { target: 85, delay: 300 },
      { target: 100, delay: 200 },
    ];

    let i = 0;
    const next = () => {
      if (i >= steps.length) {
        setTimeout(() => this.transition(), 300);
        return;
      }
      setTimeout(() => {
        progress = steps[i].target;
        if (this.loaderFill) {
          this.loaderFill.style.width = progress + '%';
        }
        i++;
        next();
      }, steps[i].delay);
    };
    next();
  }

  transition() {
    // Flash effect
    if (this.flash) {
      this.flash.classList.add('active');
    }

    // Hide landing
    setTimeout(() => {
      if (this.landing) {
        this.landing.classList.add('hidden');
      }
      document.body.classList.remove('loading');

      // Callback
      if (this.onStart) this.onStart();
    }, 300);
  }
}
