const starSize = 6; // must match CSS

const planets = [
  { name: "Zorath", x: 20, y: 30, desc: "A molten world of volcanoes and firestorms." },
  { name: "Kryon", x: 50, y: 70, desc: "An ice planet with crystal-blue landscapes." },
  { name: "Elara", x: 75, y: 20, desc: "Home to vast floating cities among the clouds." },
  { name: "Velora", x: 40, y: 50, desc: "A lush jungle world teeming with wildlife." },
  { name: "Nyxis", x: 65, y: 60, desc: "A mysterious dark planet, rich in rare minerals." }
];

// Define which planets connect with constellation-like lines
const connections = [
  ["Zorath", "Velora"],
  ["Velora", "Kryon"],
  ["Kryon", "Nyxis"],
  ["Nyxis", "Elara"],
  ["Elara", "Zorath"]
];

const galaxy = document.getElementById("galaxy");
const canvas = document.getElementById("starLines");
const ctx = canvas.getContext("2d");

const panel = document.getElementById("infoPanel");
const planetName = document.getElementById("planetName");
const planetDesc = document.getElementById("planetDesc");
const closeBtn = document.getElementById("closeBtn");

function resizeCanvas() {
  canvas.width = galaxy.clientWidth;
  canvas.height = galaxy.clientHeight;
  drawConnections();
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function drawConnections() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "rgba(200,200,255,0.5)";
  ctx.lineWidth = 1.5;
  ctx.shadowBlur = 8;
  ctx.shadowColor = "rgba(180,180,255,0.7)";

  connections.forEach(([a, b]) => {
    const planetA = planets.find(p => p.name === a);
    const planetB = planets.find(p => p.name === b);

    if (planetA && planetB) {
      const ax = (planetA.x / 100) * canvas.width + starSize / 2;
      const ay = (planetA.y / 100) * canvas.height + starSize / 2;
      const bx = (planetB.x / 100) * canvas.width + starSize / 2;
      const by = (planetB.y / 100) * canvas.height + starSize / 2;

      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
      ctx.stroke();
    }
  });
}

planets.forEach(p => {
  const star = document.createElement("div");
  star.className = "star";
  star.style.left = `${p.x}%`;
  star.style.top = `${p.y}%`;

  // Add random animation delay for natural twinkling
  star.style.animationDelay = `${Math.random() * 3}s`;

  const tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  tooltip.textContent = p.name;

  galaxy.appendChild(star);
  galaxy.appendChild(tooltip);

  // Position tooltip relative to star
  star.addEventListener("mousemove", () => {
    tooltip.style.left = star.style.left;
    tooltip.style.top = star.style.top;
  });

  // Click event -> open panel
  star.addEventListener("click", () => {
    planetName.textContent = p.name;
    planetDesc.textContent = p.desc;
    panel.classList.add("open");
  });
});

// Close panel
closeBtn.addEventListener("click", () => {
  panel.classList.remove("open");
});
