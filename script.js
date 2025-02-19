document.addEventListener("scroll", () => {
    const element = document.querySelector('.zoom-in1');
    const rect = element.getBoundingClientRect();

    if (
        rect.top >= 0 &&
        rect.bottom <= window.innerHeight
    ) {
        element.classList.add('visible');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu handling
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.navigation li a');

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close menu when clicking navigation items
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !hamburger.contains(e.target) && 
            !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Prevent scroll when menu is open
    navLinks.addEventListener('touchmove', (e) => {
        if (navLinks.classList.contains('active')) {
            e.preventDefault();
        }
    }, { passive: false });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
            
            // Add highlight effect to section
            const section = document.querySelector(target);
            section.style.boxShadow = '0 0 50px rgba(255, 51, 51, 0.3)';
            setTimeout(() => {
                section.style.boxShadow = 'none';
            }, 1000);
        });
    });

    // Smooth reveal animation for sections
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        sectionObserver.observe(section);
    });

    // Enhanced scroll animations
    const scrollAnimations = () => {
        const elements = document.querySelectorAll('.scroll-animate');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', scrollAnimations);
    
    // Particle system enhancement
    const createParticles = () => {
        const mainSection = document.querySelector('.main-section');
        const particleCount = window.innerWidth < 768 ? 30 : 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            mainSection.appendChild(particle);
            
            // Random initial position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            animateParticle(particle);
        }
    };

    const animateParticle = (particle) => {
        const duration = Math.random() * 3000 + 2000;
        const xDistance = (Math.random() - 0.5) * 200;
        const yDistance = (Math.random() - 0.5) * 200;
        
        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 0 },
            { transform: `translate(${xDistance}px, ${yDistance}px) scale(1.5)`, opacity: 0.5 },
            { transform: 'translate(0, 0) scale(1)', opacity: 0 }
        ], {
            duration,
            iterations: Infinity,
            easing: 'ease-in-out'
        });
    };

    createParticles();
});

// Enhanced scroll behavior
const smoothScroll = (target) => {
    const element = document.querySelector(target);
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - 80; // Adjust for nav height

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}
