const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });
reveals.forEach((item) => observer.observe(item));

const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let w, h, stars;

function resize() {
  w = canvas.width = window.innerWidth * devicePixelRatio;
  h = canvas.height = window.innerHeight * devicePixelRatio;
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
  stars = Array.from({ length: Math.min(150, Math.floor(window.innerWidth / 10)) }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.5 + 0.4,
    s: Math.random() * 0.22 + 0.04,
  }));
}

function draw() {
  ctx.clearRect(0, 0, w, h);
  stars.forEach((star) => {
    star.y += star.s * devicePixelRatio;
    if (star.y > h) star.y = 0;
    ctx.beginPath();
    ctx.fillStyle = 'rgba(226,232,240,0.8)';
    ctx.arc(star.x, star.y, star.r * devicePixelRatio, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(draw);
}

window.addEventListener('resize', resize);
resize();
draw();

document.querySelectorAll('.tilt').forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
