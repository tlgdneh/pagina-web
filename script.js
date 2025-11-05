// ==========================================
// INICIALIZAÇÃO E CONFIGURAÇÃO
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeScrollAnimations();
    initializeGallery();
    initializeTypewriterMessage();
    initializeFloatingHearts();
    initializeBackToTop();
    initializeSmoothScroll();
});

// ==========================================
// PARTÍCULAS DO FUNDO
// ==========================================

function initializeParticles() {
    const container = document.getElementById('particleContainer');
    if (!container) return;

    // Criar partículas
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Alternar entre pontos e luzes
        const isLight = Math.random() > 0.6;
        if (isLight) {
            const light = document.createElement('div');
            light.className = 'particle-light';
            particle.appendChild(light);
        } else {
            const dot = document.createElement('div');
            dot.className = 'particle-dot';
            particle.appendChild(dot);
        }

        // Posição aleatória
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        // Duração da animação aleatória
        const duration = 15 + Math.random() * 15;
        particle.style.animation = `particleFloat ${duration}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';

        container.appendChild(particle);
    }

    // Adicionar estilo da animação
    if (!document.getElementById('particleStyles')) {
        const style = document.createElement('style');
        style.id = 'particleStyles';
        style.textContent = `
            @keyframes particleFloat {
                0%, 100% {
                    transform: translateY(0px) translateX(0px);
                    opacity: 0.3;
                }
                25% {
                    opacity: 0.6;
                }
                50% {
                    transform: translateY(-30px) translateX(30px);
                    opacity: 0.8;
                }
                75% {
                    opacity: 0.5;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ==========================================
// ANIMAÇÕES AO SCROLL
// ==========================================

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adicionar delay baseado na posição
                const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                const delay = index * 100;

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar todos os elementos com animação de scroll
    document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Timeline items
    document.querySelectorAll('.timeline-item').forEach(el => {
        observer.observe(el);
    });

    // Message container
    const messageContainer = document.querySelector('.message-container');
    if (messageContainer) {
        observer.observe(messageContainer);
    }
}

// ==========================================
// GALERIA
// ==========================================

function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    const galleryObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = index * 150;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                galleryObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    galleryItems.forEach(item => {
        galleryObserver.observe(item);
    });
}

// ==========================================
// EFEITO TYPEWRITER - MENSAGEM
// ==========================================

function initializeTypewriterMessage() {
    const messageText = document.getElementById('messageText');
    if (!messageText) return;

    const text = messageText.textContent;
    messageText.textContent = '';

    const messageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('typewriter-active')) {
                entry.target.classList.add('typewriter-active');
                typewriterEffect(messageText, text);
                messageObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    messageObserver.observe(messageText);
}

function typewriterEffect(element, text) {
    element.textContent = '';
    let index = 0;

    function type() {
        if (index < text.length) {
            const char = text[index];
            const span = document.createElement('span');
            span.className = 'typewriter-char';
            span.textContent = char;

            // Delay entre caracteres
            const delay = char === '.' || char === ',' || char === '!' ? 100 : 50;

            span.style.animationDelay = (index * 50) + 'ms';
            element.appendChild(span);

            index++;
            setTimeout(type, delay);
        }
    }

    type();
}

// ==========================================
// CORAÇÕES FLUTUANTES - RODAPÉ
// ==========================================

function initializeFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    if (!container) return;

    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '💗';

        // Posição aleatória
        const left = Math.random() * 100;
        heart.style.left = left + '%';

        // Duração da animação aleatória
        const duration = 8 + Math.random() * 4;
        heart.style.animationDuration = duration + 's';

        // Delay aleatório
        heart.style.animationDelay = Math.random() * 3 + 's';

        container.appendChild(heart);

        // Remover elemento após a animação
        setTimeout(() => {
            heart.remove();
        }, (duration + 3) * 1000);
    }

    // Criar corações periodicamente
    setInterval(createHeart, 800);
}

// ==========================================
// BOTÃO "VOLTAR AO TOPO"
// ==========================================

function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mostrar/ocultar botão baseado no scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.pointerEvents = 'auto';
        } else {
            backToTopBtn.style.opacity = '0.5';
            backToTopBtn.style.pointerEvents = 'none';
        }
    });

    backToTopBtn.style.opacity = '0.5';
    backToTopBtn.style.transition = 'opacity 0.3s ease';
    backToTopBtn.style.pointerEvents = 'none';
}

// ==========================================
// SMOOTH SCROLL
// ==========================================

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();

            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 60;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// EFEITOS DE PARALLAX LEVE
// ==========================================

window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;

    // Parallax no herói
    const heroGlow = document.querySelector('.hero-glow');
    if (heroGlow && scrolled < window.innerHeight) {
        heroGlow.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.5}px)) scale(1)`;
    }

    // Parallax nas partículas
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const speed = 0.3 + (index % 5) * 0.1;
        particle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==========================================
// SCROLL SUAVE PARA ELEMENTOS
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Adicionar classe ao scroll para animações baseadas em scroll
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition > sectionTop && scrollPosition < sectionTop + sectionHeight) {
                section.style.opacity = '1';
            }
        });
    });
});

// ==========================================
// PRECARREGAMENTO DE IMAGENS
// ==========================================

function preloadImages() {
    const images = [
        'https://i.imgur.com/M9U0FTZ.jpeg',
        'https://i.imgur.com/c7ln9CN.jpeg',
        'https://i.imgur.com/Y3GCxp1.jpeg',
        'https://i.imgur.com/NoHjWzH.jpeg',
        'https://i.imgur.com/Nunm0rY.jpeg',
        'https://i.imgur.com/DoTQcg1.jpeg'
    ];

    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Chamar precarregamento ao carregar a página
window.addEventListener('load', preloadImages);

// ==========================================
// HANDLER DE REDIMENSIONAMENTO
// ==========================================

window.addEventListener('resize', function() {
    // Reajustar animações em caso de mudança de tamanho
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.classList.remove('visible');
    });

    // Reinicializar animações de scroll
    setTimeout(initializeScrollAnimations, 100);
});
