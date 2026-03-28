document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", () => {
        if (navigator.vibrate) navigator.vibrate(50);
    });
});

const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let mouse = {
    x: null,
    y: null,
    radius: 120
};

window.addEventListener("mousemove", e => {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener("touchmove", e => {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
});

let particles = [];

function createParticles() {
    particles = [];
    for (let i = 0; i < 90; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            dx: (Math.random() - 0.5) * 0.7,
            dy: (Math.random() - 0.5) * 0.7
        });
    }
}

createParticles();

let hue = 260;

function getColor() {
    hue += 0.5;
    return `hsl(${hue}, 100%, 60%)`;
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let color = getColor();

    particles.forEach(p => {

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(180, 100, 255, 0.8)";
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        let dx = p.y - mouse.y;
        let dy = p.y - mouse.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
            p.x += dx * 0.02;
            p.y += dy * 0.02;
        }
    });

    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;
            let distance = dx * dx + dy * dy;

            if (distance < 10000) {
                ctx.beginPath();
                ctx.strokeStyle = "purple";
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animate);
}

animate();