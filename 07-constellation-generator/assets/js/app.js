const canvas = document.getElementById("constellation");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let numStars = 120;
let maxDistance = 120;
let starSpeed = 0.5;

const stars = [];
const shootingStars = [];
const mouse = { x: null, y: null };

canvas.addEventListener("mousemove", e => {
  mouse.x = e.x;
  mouse.y = e.y;
});

for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2,
    dx: (Math.random() - 0.5) * starSpeed,
    dy: (Math.random() - 0.5) * starSpeed,
    brightness: Math.random()
  });
}

function createShootingStar() {
  shootingStars.push({
    x: Math.random() * canvas.width,
    y: 0,
    length: Math.random() * 80 + 50,
    speed: Math.random() * 5 + 5
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < stars.length; i++) {
    let s = stars[i];
    s.brightness += (Math.random() - 0.5) * 0.05;
    if (s.brightness < 0.3) s.brightness = 0.3;
    if (s.brightness > 1) s.brightness = 1;

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${s.brightness})`;
    ctx.fill();

    s.x += s.dx;
    s.y += s.dy;

    if (s.x < 0 || s.x > canvas.width) s.dx *= -1;
    if (s.y < 0 || s.y > canvas.height) s.dy *= -1;

    for (let j = i + 1; j < stars.length; j++) {
      let s2 = stars[j];
      let dist = Math.hypot(s.x - s2.x, s.y - s2.y);

      if (dist < maxDistance) {
        let colorValue = Math.floor(255 * (1 - dist / maxDistance));
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${colorValue},${colorValue},255,${1 - dist / maxDistance})`;
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s2.x, s2.y);
        ctx.stroke();
      }
    }

    if (mouse.x && mouse.y) {
      let distMouse = Math.hypot(s.x - mouse.x, s.y - mouse.y);
      if (distMouse < maxDistance) {
        let colorValue = Math.floor(200 * (1 - distMouse / maxDistance));
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0,${colorValue},255,${1 - distMouse / maxDistance})`;
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
  }

  for (let i = 0; i < shootingStars.length; i++) {
    let ss = shootingStars[i];
    ctx.beginPath();
    ctx.moveTo(ss.x, ss.y);
    ctx.lineTo(ss.x - ss.length, ss.y + ss.length);
    ctx.strokeStyle = "rgba(255,255,255,0.8)";
    ctx.stroke();

    ss.x += ss.speed;
    ss.y += ss.speed;

    if (ss.x > canvas.width || ss.y > canvas.height) shootingStars.splice(i, 1);
  }
}

function animate() {
  drawStars();

  if (Math.random() < 0.01) createShootingStar();

  requestAnimationFrame(animate);
}

animate();