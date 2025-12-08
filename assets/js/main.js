document.addEventListener('DOMContentLoaded', function() {
    // Initialize Foundation if available
    if (typeof Foundation !== 'undefined') {
        Foundation.core.Init();
    }
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.site-header__menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const actions = document.querySelector('.site-header__actions');
            if (actions) {
                actions.classList.toggle('active');
            }
            // Animate hamburger to X
            menuToggle.classList.toggle('active');
        });
    }

    // ===== SCROLL ANIMATIONS =====
    // Fade in elements as they come into view using Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                // Add the animation class to trigger animation
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(function(section) {
        // Start with opacity 0
        section.style.opacity = '0';
        observer.observe(section);
    });

    // ===== PARALLAX EFFECT ON HERO IMAGE =====
    const heroImage = document.querySelector('.hero__product-image');
    if (heroImage) {
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    const scrollPos = window.scrollY;
                    if (scrollPos < 1000) { // Only apply parallax on hero/near-hero sections
                        const parallaxSpeed = 0.3;
                        heroImage.style.transform = `translateY(${scrollPos * parallaxSpeed}px)`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // ===== SMOOTH SCROLL NAVIGATION =====
    // For any anchor links with href starting with #
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    const actions = document.querySelector('.site-header__actions');
                    if (actions) {
                        actions.classList.remove('active');
                    }
                }
            }
        });
    });

    // ===== ACTIVE SECTION HIGHLIGHTING =====
    // Highlight nav items based on current scroll position
    const navLinks = document.querySelectorAll('.site-header__nav a[href^="#"]');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
});