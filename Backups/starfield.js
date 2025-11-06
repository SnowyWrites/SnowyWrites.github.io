document.addEventListener('DOMContentLoaded', () => {
const starfield = document.getElementById('starfield');
const starCount = 200;

for (let i = 0; i < starCount; i++) {
  const star = document.createElement('div');
  star.classList.add('star');
  star.style.top = `${Math.random() * 100}%`;
  star.style.left = `${Math.random() * 100}%`;
  star.style.animationDuration = `${1.5 + Math.random() * 2}s`;
  star.style.animationDelay = `${Math.random() * 5}s`;
  starfield.appendChild(star);
}

function createShootingStar() {
  const star = document.createElement('div');
  star.classList.add('shooting-star');
  star.style.top = `${Math.random() * 80}%`;
  star.style.left = `${Math.random() * 100 + 50}%`; // offset for entry angle
  starfield.appendChild(star);

  setTimeout(() => star.remove(), 1000); // remove after animation
}

// Generate a shooting star every few seconds randomly
setInterval(() => {
  if (Math.random() < 0.3) {
    createShootingStar();
  }
}, 2000);
});