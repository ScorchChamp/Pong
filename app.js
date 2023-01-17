
window.addEventListener("load", function () {
const canvas = document.getElementById('pong-canvas');
const ctx = canvas.getContext('2d');

let dy = 0;
const padding = 20;
const bx = padding;
const by = 5 * padding;
const speed = 1;
const speed_multi = 1.05;

const p1 = { x: padding, y: canvas.height / 2, dy: 0 }
const p2 = { x: canvas.width - (padding * 2), y: canvas.height / 2 }
const ball = { x: canvas.width / 2, y: canvas.height / 2, dx: 4, dy: 5 }

fillRect = (x, y, sx, sy, color) => { ctx.fillStyle = color; ctx.fillRect(x, y, sx, sy) };

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fillRect(p1.x, p1.y, bx, by, 'white')
  fillRect(p2.x, p2.y, bx, by, 'white')
  drawBall();
}

function update() {
  updateBall();
  p1.y += p1.dy;
  p2.y = ball.y - by / 2;
  if (p1.y + by / 2 < 0) p1.y = -by / 2;
  if (p1.y + by / 2 > canvas.height) p1.y = canvas.height - by / 2;

  if (ball.x < p1.x + bx * 2 && ball.x > bx && ball.dx < 0 && ball.y > p1.y && ball.y < p1.y + by) {
    ball.dy *= speed_multi;
    ball.dx *= speed_multi;
    ball.dx *= -1;
  }
  if (ball.x > p2.x - bx && ball.x < canvas.width - bx && ball.dx > 0 && ball.y > p2.y && ball.y < p2.y + by) {
    ball.dy *= speed_multi;
    ball.dx *= speed_multi;
    ball.dx *= -1;
  }
  if (ball.x < 0) {
    clearInterval(interval);
  }
  if (ball.x > canvas.width) {
    clearInterval(interval);
  }
}

document.addEventListener('keydown', (event) => {
  p1.dy = event.key === 'ArrowUp' ? -padding * speed : event.key === 'ArrowDown' ? padding * speed : 0;
});

window.addEventListener('keyup', event => p1.dy = 0);

interval = setInterval(() => { update(); draw(); }, 25);

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, padding, 0, Math.PI * 2, true);
  ctx.fillStyle = "white";
  ctx.fill();
}

function updateBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
  (ball.y - padding < 0 || ball.y + padding > canvas.height) ? ball.dy *= -1 : '';
}
});
