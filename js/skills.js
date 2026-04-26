// ============================================
// 🎮 SKILLS — XP bar animation
// ============================================

class SkillSystem {
  constructor() {
    this.cards = document.querySelectorAll('.skill-card');
    this.animated = new Set();
    this.observe();
  }

  observe() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.animated.has(entry.target)) {
            this.animated.add(entry.target);
            this.animateCard(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    this.cards.forEach((card) => observer.observe(card));
  }

  animateCard(card) {
    const bar = card.querySelector('.xp-bar');
    const xpEl = card.querySelector('.current-xp');
    const percentEl = card.querySelector('.xp-percent');

    if (!bar) return;

    const targetWidth = bar.getAttribute('data-width');
    const targetXp = parseInt(bar.getAttribute('data-xp')) || 0;
    const targetPercent = parseInt(targetWidth) || 0;

    // Animate the bar
    setTimeout(() => {
      bar.style.width = targetWidth + '%';
    }, 200);

    // Animate the XP counter
    if (xpEl) {
      this.countUp(xpEl, 0, targetXp, 1500);
    }

    // Animate the percent
    if (percentEl) {
      this.countUp(percentEl, 0, targetPercent, 1500, '%');
    }
  }

  countUp(el, start, end, duration, suffix = '') {
    const startTime = performance.now();
    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * eased);
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };
    requestAnimationFrame(update);
  }
}
