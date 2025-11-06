        
document.addEventListener("DOMContentLoaded", () => {
  const count = 40;
  const container = document.getElementById('firefly-container');
  container.style.position = 'fixed';
  container.style.top = 0;
  container.style.left = 0;
  container.style.width = '100vw';
  container.style.height = '100vh';
  container.style.pointerEvents = 'none';
  container.style.zIndex = '1';

  function random(min, max) {
    return min + Math.random() * (max - min);
  }

class Firefly {
  constructor(depth = 1) {
    this.depth = depth; // 1 = close, 2 = mid, 3 = far
    this.el = document.createElement('div');
    this.el.className = 'firefly';
    container.appendChild(this.el);
    this.reset();
  }

  reset() {
  this.t = 0;
  const depthMultiplier = this.getDepthMultiplier();
  this.duration = random(8, 16) * depthMultiplier.speed;

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  if (this.depth === 3) {
    // Background fireflies – top 30% of screen
    const topY = () => random(0, vh * 0.6);
    const centerX = () => random(vw * 0.1, vw * 0.9);
    this.startY = topY();
    this.startX = centerX();
    this.cp1 = { x: centerX(), y: topY() };
    this.cp2 = { x: centerX(), y: topY() };
    this.endX = centerX();
    this.endY = topY();
  }
  else if (this.depth === 2) {
    // Midground fireflies – middle 30–70%
    const midY = () => random(vh * 0.3, vh * 0.7);
    const centerX = () => random(vw * 0.05, vw * 0.95);
    this.startY = midY();
    this.startX = centerX();
    this.cp1 = { x: centerX(), y: midY() };
    this.cp2 = { x: centerX(), y: midY() };
    this.endX = centerX();
    this.endY = midY();
  }
  else {
    // Foreground fireflies – full screen range
    this.startY = random(0, vh);
    this.startX = random(0, vw);
    this.cp1 = { x: random(0, vw), y: random(0, vh) };
    this.cp2 = { x: random(0, vw), y: random(0, vh) };
    this.endX = random(0, vw);
    this.endY = random(0, vh);
  }

  // Set visual styling
  this.color = this.randomColor();
  this.el.style.backgroundColor = this.color;
  this.el.style.boxShadow = `0 0 ${depthMultiplier.glowSize}px ${depthMultiplier.glowSpread}px ${this.color}`;
}


  update(delta) {
    this.t += delta / (this.duration * 1000);
    if (this.t >= 1) return this.reset();

    const t = this.easeInOutQuad(this.t);
    const x = this.cubicBezier(this.startX, this.cp1.x, this.cp2.x, this.endX, t);
    const y = this.cubicBezier(this.startY, this.cp1.y, this.cp2.y, this.endY, t);
    this.el.style.transform = `translate(${x}px, ${y}px)`;

    // Fade-in/out based on progress
    let fadeFactor = 1;
    if (this.t < 0.15) fadeFactor = this.t / 0.15;
    else if (this.t > 0.85) fadeFactor = (1 - this.t) / 0.15;

    const flicker = 0.8 + Math.sin(Date.now() / 300 + this.t * 5) * 0.2;

    this.el.style.opacity = (flicker * fadeFactor).toFixed(2);

    const glow = 1 + Math.sin(Date.now() / 250 + this.t * 4) * 0.2;

    const depth = this.getDepthMultiplier();
    this.el.style.filter = `brightness(${glow * depth.brightness}) contrast(1.5)`;
    if (this.depth === 3) {
  this.el.style.filter += ` blur(1.5px)`;
}

    const baseSize = depth.baseSize;
    const sizeFlicker = Math.sin(Date.now() / 250 + this.t * 10) * depth.sizeVariance;
    const pulse = (baseSize + sizeFlicker) * fadeFactor;
    this.el.style.width = `${pulse}px`;
    this.el.style.height = `${pulse}px`;
  }

  getDepthMultiplier() {
    switch (this.depth) {
      case 1: // Foreground
        return { baseSize: 10, sizeVariance: 4, glowSize: 40, glowSpread: 12, brightness: 1.5, speed: 1 };
      case 2: // Midground
        return { baseSize: 8, sizeVariance: 3, glowSize: 20, glowSpread: 8, brightness: 1.0, speed: 1.5 };
      case 3: // Background
      default:
        return { baseSize: 3, sizeVariance: 2, glowSize: 15, glowSpread: 2, brightness: 0.8, speed: 2.2 };
    }
  }

  cubicBezier(p0, p1, p2, p3, t) {
    const inv = 1 - t;
    return inv ** 3 * p0 +
      3 * inv ** 2 * t * p1 +
      3 * inv * t ** 2 * p2 +
      t ** 3 * p3;
  }

  easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  randomColor() {
  const colors = ['#fcff9e', '#a3f7bf', '#80ecdeff', '#f7e6f0ff', '#cef88aff'];
  return colors[Math.floor(Math.random() * colors.length)];
}

  }

const fireflies = [
  ...Array.from({ length: 4 }, () => new Firefly(1)),  // Foreground
  ...Array.from({ length: 7 }, () => new Firefly(2)), // Midground
  ...Array.from({ length: 10 }, () => new Firefly(3))  // Background
];

let last = performance.now();
function animate(now) {
  const delta = now - last;
  last = now;
  fireflies.forEach(f => f.update(delta));
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

  
});