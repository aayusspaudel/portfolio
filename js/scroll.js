// ============================================
// 🎮 SCROLL ANIMATIONS — Reveal on scroll
// ============================================

class ScrollAnimations {
  constructor() {
    this.reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    this.achievements = {
      about: { shown: false, icon: '👤', title: 'About Section' },
      projects: { shown: false, icon: '🎯', title: 'Projects Section' },
      skills: { shown: false, icon: '⚡', title: 'Skills Section' },
      contact: { shown: false, icon: '📡', title: 'Contact Section' },
    };

    this.observe();
    this.observeSections();
  }

  observe() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    this.reveals.forEach((el) => observer.observe(el));
  }

  observeSections() {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            if (this.achievements[id] && !this.achievements[id].shown) {
              this.achievements[id].shown = true;
              this.showAchievement(this.achievements[id]);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.game-section').forEach((s) => sectionObserver.observe(s));
  }

  showAchievement(data) {
    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.innerHTML = `
      <span class="toast-icon">${data.icon}</span>
      <div class="toast-content">
        <div class="toast-label">Achievement Unlocked</div>
        <div class="toast-title">${data.title}</div>
      </div>
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 600);
    }, 3000);
  }
}
