// Data alvo: 8 de maio de 2025
const unlockDate = new Date('2025-05-08T00:00:00');

const countdownElement = document.getElementById('countdown');
const lockScreen = document.getElementById('lock-screen');
const mainContent = document.getElementById('main-content');
const revealButton = document.getElementById('reveal-button');
const gallery = document.querySelector('.gallery');
const music = document.getElementById('background-music');
const photos = document.querySelectorAll('.photo');
const specialText = document.getElementById('special-text');
const textParagraphs = specialText.querySelectorAll('p');

function updateCountdown() {
    const now = new Date();
    const diff = unlockDate - now;

    if (diff <= 0) {
        lockScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
        clearInterval(timerInterval);
    } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
}

const timerInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Corações caindo
const canvas = document.getElementById('hearts');
const ctx = canvas.getContext('2d');

let hearts = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createHeart() {
    return {
        x: Math.random() * canvas.width,
        y: -20,
        size: Math.random() * 20 + 10,
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.5 + 0.5
    };
}

function drawHeart(heart) {
    ctx.beginPath();
    ctx.moveTo(heart.x, heart.y);
    ctx.bezierCurveTo(heart.x + heart.size / 2, heart.y - heart.size / 2,
                      heart.x + heart.size * 1.5, heart.y + heart.size / 3,
                      heart.x, heart.y + heart.size);
    ctx.bezierCurveTo(heart.x - heart.size * 1.5, heart.y + heart.size / 3,
                      heart.x - heart.size / 2, heart.y - heart.size / 2,
                      heart.x, heart.y);
    ctx.fillStyle = `rgba(255, 77, 109, ${heart.opacity})`;
    ctx.fill();
}

function animateHearts() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.05) {
        hearts.push(createHeart());
    }

    hearts.forEach((heart, index) => {
        heart.y += heart.speed;
        drawHeart(heart);

        if (heart.y > canvas.height) {
            hearts.splice(index, 1);
        }
    });

    requestAnimationFrame(animateHearts);
}

animateHearts();

// Botão Revelar
revealButton.addEventListener('click', () => {
    revealButton.style.display = 'none';
    
    // Mostrar texto especial
    specialText.classList.remove('hidden');
    textParagraphs.forEach((p, index) => {
        setTimeout(() => {
            p.classList.add('show');
        }, index * 400);
    });

    // Mostrar galeria de fotos
    gallery.classList.remove('hidden');
    photos.forEach((photo, index) => {
        setTimeout(() => {
            photo.classList.add('show');
        }, index * 300);
    });

    // Tocar música
    music.play();
});
