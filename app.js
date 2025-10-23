function animateLogoText(element, text, callback) {
    const chars = '_R>?/[A};-M';
    let i = 0;
    element.style.visibility = 'visible';
    const interval = setInterval(() => {
        const scrambledText = text.substring(0, i) +
            text.substring(i)
            .split('')
            .map(() => chars[Math.floor(Math.random() * chars.length)])
            .join('');
        element.textContent = scrambledText;
        if (i < text.length) {
            i++;
        } else {
            clearInterval(interval);
            element.textContent = text;
            if (callback) callback();
        }
    }, 60);
}

document.addEventListener('DOMContentLoaded', function() {
    const isMobile = window.innerWidth <= 768;

    animateLogoText(document.getElementById('logo-line1'), 'PivotBridge', () => {
        animateLogoText(document.getElementById('logo-line2'), 'Labs');
    });

    setTimeout(() => {
        document.querySelector('.tagline').classList.add('animate-in');
    }, 200);

    setTimeout(() => {
        document.querySelector('.elevator-pitch').classList.add('animate-in');
    }, 800);

    setTimeout(() => {
        const ctaGroup = document.querySelector('.cta-button-group');
        if (ctaGroup) ctaGroup.classList.add('animate-in');
        const btnCta = document.querySelector('.btn-cta');
        if (btnCta) btnCta.classList.add('animate-in');
    }, 1200);

    if (!isMobile) {
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorCircle = document.querySelector('.cursor-circle');
        const interactiveElements = document.querySelectorAll('a, button, .service-card');
        window.addEventListener('mousemove', e => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            cursorCircle.style.left = `${e.clientX}px`;
            cursorCircle.style.top = `${e.clientY}px`;
        });
        interactiveElements.forEach(el => {
            el.addEventListener('mouseover', () => cursorCircle.classList.add('cursor-grow'));
            el.addEventListener('mouseout', () => cursorCircle.classList.remove('cursor-grow'));
        });
    }

    const aboutVisual = document.querySelector('.about-visual i');
    const aboutSection = document.querySelector('#about');
    if (!isMobile) {
        window.addEventListener('scroll', () => {
            if (aboutVisual && aboutSection) {
                const sectionTop = aboutSection.offsetTop;
                const scrollPosition = window.scrollY;
                const elementScroll = scrollPosition - sectionTop;
                if (elementScroll > -window.innerHeight && elementScroll < aboutSection.offsetHeight) {
                    aboutVisual.style.transform = `translateY(${elementScroll * 0.2}px)`;
                }
            }
        });
    }
    
    function setup3dLogo() {
        const container = document.querySelector('.hero-logo-container');
        const logo = container.querySelector('.hero-logo');
        if (isMobile) return;

        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10; 
            const rotateY = (x - centerX) / -10;
            logo.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
        });

        container.addEventListener('mouseleave', () => {
            logo.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        });
    }
    setup3dLogo();

    const animatedElements = document.querySelectorAll('.fade-in-section, .fade-in-card');
    const sectionHeadings = document.querySelectorAll('.section-heading');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    animatedElements.forEach(el => observer.observe(el));
    sectionHeadings.forEach(el => observer.observe(el));

    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    function setupTestimonialCarousel() {
        const container = document.querySelector('.testimonial-carousel-container');
        if (!container) return;
        const cards = container.querySelectorAll('.testimonial-card');
        if (cards.length <= 1) return;
        let currentIndex = 0;
        let carouselInterval;

        function showCard(index) {
            cards.forEach(card => card.classList.remove('active', 'next'));
            const currentCard = cards[index];
            const nextIndex = (index + 1) % cards.length;
            const nextCard = cards[nextIndex];
            currentCard.classList.add('active');
            if (nextCard) nextCard.classList.add('next');
        }

        function advanceCarousel() {
            currentIndex = (currentIndex + 1) % cards.length;
            showCard(currentIndex);
        }

        function startAutoplay() {
            clearInterval(carouselInterval);
            carouselInterval = setInterval(advanceCarousel, 5000);
        }
        container.addEventListener('mouseover', () => clearInterval(carouselInterval));
        container.addEventListener('mouseout', startAutoplay);
        showCard(currentIndex);
        startAutoplay();
    }
    setupTestimonialCarousel();

    function setupCustomToggler() {
        const toggler = document.getElementById('custom-toggler');
        const flipper = toggler.querySelector('.flipper');
        let autoFlipInterval;

        function startAutoFlip() {
            clearInterval(autoFlipInterval);
            autoFlipInterval = setInterval(() => {
                flipper.classList.toggle('flipped');
            }, 3000);
        }

        toggler.addEventListener('click', () => {
            flipper.classList.toggle('flipped');
            startAutoFlip();
        });

        startAutoFlip();
    }
    setupCustomToggler();

    if (window.innerWidth >= 992) {
        const navMenu = document.querySelector('.navbar-nav');
        setTimeout(() => {
            navMenu.classList.add('animate-in');
            navMenu.addEventListener('animationend', (e) => {
                if (e.animationName === 'hint-and-hide') {
                    navMenu.classList.remove('animate-in');
                }
            }, { once: true });
        }, 500);
    }

    const navLinks = document.querySelectorAll('.nav-link');
    // const navbar = document.querySelector('.navbar');
    const navbarCollapse = document.getElementById('navbarNav');
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });

    navLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offset = navbar.offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });

                    if (navbarCollapse.classList.contains('show')) {
                        bsCollapse.hide();
                    }
                }
            });
        }
    });

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formStatus = document.getElementById('form-status');
            const formData = new FormData(contactForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);
            const button = contactForm.querySelector('button[type="submit"]');

            formStatus.innerHTML = "Sending...";
            button.disabled = true;

            fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: json
                })
                .then(async (response) => {
                    let result = await response.json();
                    if (result.success) {
                        formStatus.innerHTML = "Success! Your message has been sent.";
                        formStatus.style.color = 'var(--teal)';
                        contactForm.reset();
                    } else {
                        formStatus.innerHTML = result.message || "An error occurred.";
                        formStatus.style.color = 'red';
                    }
                })
                .catch(error => {
                    formStatus.innerHTML = "Something went wrong!";
                    formStatus.style.color = 'red';
                })
                .finally(() => {
                    button.disabled = false;
                    setTimeout(() => { formStatus.innerHTML = ''; }, 4000);
                });
        });
    }
});