
//MENU RESPONSIVO
const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("navMobile");

toggle.addEventListener("click", () => {

    toggle.classList.toggle("active");
    nav.classList.toggle("active");

});

//PARTICULAS TECNOLOGICAS

const canvas = document.getElementById("neuralCanvas");
const ctx = canvas.getContext("2d");

// definir tamanho correto
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const particles = [];
const particleCount = 100;
const maxDistance = 150;

// criar partículas
for (let i = 0; i < particleCount; i++) {

    particles.push({

        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,

        vx: (Math.random() - 0.5) * 1.2, // velocidade maior
        vy: (Math.random() - 0.5) * 1.2

    });
}

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // mover e desenhar partículas
    particles.forEach(p => {

        p.x += p.vx;
        p.y += p.vy;

        // rebater nas bordas
        if (p.x <= 0 || p.x >= canvas.width) p.vx *= -1;
        if (p.y <= 0 || p.y >= canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#3b82f6";
        ctx.fill();

    });

    // desenhar conexões
    for (let i = 0; i < particles.length; i++) {

        for (let j = i + 1; j < particles.length; j++) {

            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;

            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {

                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);

                ctx.strokeStyle = `rgba(59,130,246,0.2) ${1 - distance / maxDistance})`;
                ctx.stroke();

            }

        }

    }

    requestAnimationFrame(draw);
}

draw();



//ANIMAÇÃO DOS CARDS INFROMATIVOS
const cards = document.querySelectorAll(".plan-card");
const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.2
});


cards.forEach(card => {

    observer.observe(card);

});

//glow segue cursos
document.querySelectorAll(".plan-card").forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--x", x + "px");
        card.style.setProperty("--y", y + "px");

    });

});


//FAQ
document.querySelectorAll('.faq-question').forEach(button => {

    button.addEventListener('click', () => {

        const faqItem = button.parentElement
        const answer = faqItem.querySelector('.faq-answer')

        if (faqItem.classList.contains('active')) {

            answer.style.height = answer.scrollHeight + 'px'

            requestAnimationFrame(() => {
                answer.style.height = '0px'
            })

            faqItem.classList.remove('active')

        } else {

            faqItem.classList.add('active')

            answer.style.height = answer.scrollHeight + 'px'

        }

    })

})

//ANIMAÇÃO
document.addEventListener("DOMContentLoaded", function () {

    const revealElements = document.querySelectorAll(".reveal");

    if (!revealElements.length) return;

    const revealObserver = new IntersectionObserver(function (entries, observer) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");
                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.2
    });

    revealElements.forEach(function (el) {
        revealObserver.observe(el);
    });

});


//LOADING PAGE
const form = document.getElementById("contactForm");
const button = document.getElementById("submitBtn");
const success = document.getElementById("formSuccess");

form.addEventListener("submit", async function (e) {
        
    e.preventDefault();

    button.classList.add("loading");

    const data = new FormData(form);

    try {

        const response = await fetch(form.action, {
            method: "POST",
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {

            button.classList.remove("loading");

            success.classList.add("show");

            form.reset();

        } else {
            alert("Erro ao enviar.");
        }

    } catch (error) {

        button.classList.remove("loading");

        alert("Erro de conexão.");

    }

});


//PROJETO
