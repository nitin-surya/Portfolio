document.addEventListener('DOMContentLoaded', function() {
    // CRITICAL: This line triggers the initial slide-in animation
    document.body.classList.remove('loading'); 

    const navLinks = document.querySelectorAll('.nav-links a:not(#openContactModal)');
    const sections = document.querySelectorAll('.section');
    const offset = 150; 
    
    const skillsRow = document.querySelector('.skill-row');
    const skillsContent = skillsRow.innerHTML;
    
    const scrollUpBtn = document.getElementById('scroll-up-only');

    const modal = document.getElementById('contactModal');
    const openBtn = document.getElementById('openContactModal');
    const closeBtn = document.querySelector('.close-btn');

    // 1. Seamless Skills Loop
    if (skillsRow) {
        skillsRow.innerHTML += skillsContent;
    }

    // --- Intersection Observer for Scroll Animations ---
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        rootMargin: '0px 0px -15% 0px', 
        threshold: 0.1 
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Core Scroll and Navigation Logic ---
    function updateActiveLink() {
        let current = '';
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            
            // Adjust detection for fixed header offset
            if (scrollPosition >= sectionTop - offset) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href').substring(1);
            
            // Skip external links like Medium
            if (link.classList.contains('medium-nav-icon')) {
                return;
            }

            // Ensure the Navbar 'About' link remains active for both the hero ('about') 
            // and the detailed summary ('professional-summary')
            if (linkHref === 'professional-summary' && (current === 'professional-summary' || current === 'about')) {
                link.classList.add('active');
            }
            
            if (linkHref === current) {
                link.classList.add('active');
            }
        });
        
        // 2. Scroll-to-Top Visibility
        if (scrollPosition > sections[0].offsetHeight * 0.5) {
            scrollUpBtn.classList.add('show');
        } else {
            scrollUpBtn.classList.remove('show');
        }
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); 
    
    // Smooth scrolling for all internal links 
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only handle internal, non-modal links
            if (this.id !== 'openContactModal' && this.hash !== "" && !this.target) {
                e.preventDefault();
                const hash = this.hash;
                const targetElement = document.querySelector(hash);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - offset,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 3. Scroll-Up Click Handler
    scrollUpBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // --- Contact Modal Handlers ---
    openBtn.onclick = function() {
        modal.style.display = "block";
    }

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});