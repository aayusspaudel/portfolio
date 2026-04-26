// ============================================
// 🎮 CUSTOM CURSOR — Crosshair with trail
// ============================================

class GameCursor {
  constructor() {
    if (window.innerWidth <= 768) return;

    this.cursor = document.createElement('div');
    this.cursor.className = 'game-cursor';
    this.cursorDot = document.createElement('div');
    this.cursorDot.className = 'game-cursor-dot';
    this.cursorRing = document.createElement('div');
    this.cursorRing.className = 'game-cursor-ring';

    this.cursor.appendChild(this.cursorDot);
    this.cursor.appendChild(this.cursorRing);
    document.body.appendChild(this.cursor);

    this.pos = { x: 0, y: 0 };
    this.target = { x: 0, y: 0 };
    this.visible = false;

    this.injectStyles();
    this.bindEvents();
    this.animate();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .game-cursor {
        position: fixed;
        top: 0; left: 0;
        pointer-events: none;
        z-index: 99999;
        mix-blend-mode: difference;
      }
      .game-cursor-dot {
        position: absolute;
        width: 6px; height: 6px;
        background: #22c55e;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 10px #22c55e88, 0 0 20px #22c55e44;
        transition: width 0.2s, height 0.2s, background 0.2s;
      }
      .game-cursor-ring {
        position: absolute;
        width: 36px; height: 36px;
        border: 1.5px solid rgba(34, 197, 94, 0.5);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.3s cubic-bezier(0.34,1.56,0.64,1),
                    height 0.3s cubic-bezier(0.34,1.56,0.64,1),
                    border-color 0.2s;
      }
      .game-cursor.hovering .game-cursor-dot {
        width: 10px; height: 10px;
        background: #38bdf8;
        box-shadow: 0 0 15px #38bdf888;
      }
      .game-cursor.hovering .game-cursor-ring {
        width: 50px; height: 50px;
        border-color: rgba(56, 189, 248, 0.5);
      }
      .game-cursor.clicking .game-cursor-ring {
        width: 28px; height: 28px;
      }
    `;
    document.head.appendChild(style);
  }

  bindEvents() {
    document.addEventListener('mousemove', (e) => {
      this.target.x = e.clientX;
      this.target.y = e.clientY;
      if (!this.visible) {
        this.visible = true;
        this.pos.x = e.clientX;
        this.pos.y = e.clientY;
        this.cursor.style.opacity = '1';
      }
    });

    document.addEventListener('mousedown', () => {
      this.cursor.classList.add('clicking');
    });

    document.addEventListener('mouseup', () => {
      this.cursor.classList.remove('clicking');
    });

    // Detect hoverable elements
    document.addEventListener('mouseover', (e) => {
      const el = e.target;
      if (el.matches('a, button, .mission-card, .skill-card, .start-btn, .social-link, .hud-nav-link, .equipment-tag, input, textarea')) {
        this.cursor.classList.add('hovering');
      }
    });

    document.addEventListener('mouseout', (e) => {
      const el = e.target;
      if (el.matches('a, button, .mission-card, .skill-card, .start-btn, .social-link, .hud-nav-link, .equipment-tag, input, textarea')) {
        this.cursor.classList.remove('hovering');
      }
    });

    document.addEventListener('mouseleave', () => {
      this.cursor.style.opacity = '0';
      this.visible = false;
    });
  }

  animate() {
    // Smooth follow with lerp
    this.pos.x += (this.target.x - this.pos.x) * 0.15;
    this.pos.y += (this.target.y - this.pos.y) * 0.15;

    this.cursorDot.style.left = this.target.x + 'px';
    this.cursorDot.style.top = this.target.y + 'px';
    this.cursorRing.style.left = this.pos.x + 'px';
    this.cursorRing.style.top = this.pos.y + 'px';

    requestAnimationFrame(() => this.animate());
  }
}
