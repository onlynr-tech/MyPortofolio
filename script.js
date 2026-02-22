document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');

            // Prevent scrolling when menu is open
            if (hamburger.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close mobile menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto'; // allow scrolling again
            }
        });
    });

    // 3. Scroll Reveal Animation (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in-scroll');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // 4. Portfolio Slider Logic
    const projectsWrapper = document.getElementById('projectsWrapper');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (projectsWrapper && prevBtn && nextBtn) {
        const scrollAmount = 350; // Adjust based on card width + gap

        nextBtn.addEventListener('click', () => {
            projectsWrapper.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        prevBtn.addEventListener('click', () => {
            projectsWrapper.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        // Optional: Hide buttons if at the start or end
        const toggleButtons = () => {
            prevBtn.style.opacity = projectsWrapper.scrollLeft <= 0 ? '0.3' : '1';
            prevBtn.style.pointerEvents = projectsWrapper.scrollLeft <= 0 ? 'none' : 'auto';

            const maxScroll = projectsWrapper.scrollWidth - projectsWrapper.clientWidth;
            nextBtn.style.opacity = projectsWrapper.scrollLeft >= maxScroll - 5 ? '0.3' : '1';
            nextBtn.style.pointerEvents = projectsWrapper.scrollLeft >= maxScroll - 5 ? 'none' : 'auto';
        };

        projectsWrapper.addEventListener('scroll', toggleButtons);
        window.addEventListener('resize', toggleButtons);
        // Initial check
        setTimeout(toggleButtons, 100);
    }
});
