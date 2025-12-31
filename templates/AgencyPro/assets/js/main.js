/*!
 * AgencyPro - Main JavaScript File
 * Description: Lightweight vanilla JavaScript for interactive components
 * Version: 1.0.0
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================================================
    // Global Variables & Configuration
    // ==========================================================================
    
    const portfolioItems = [
        {
            id: 1,
            title: "E-commerce Platform Redesign",
            image: "assets/img/work-1.jpg",
            description: "Complete redesign of a major e-commerce platform focusing on user experience and conversion optimization. Implemented modern design system and improved checkout flow.",
            technologies: "React, Node.js, MongoDB, AWS",
            timeline: "12 weeks",
            link: "#",
            category: "web"
        },
        {
            id: 2,
            title: "Mobile Banking App",
            image: "assets/img/work-2.jpg",
            description: "Developed a secure mobile banking application with biometric authentication and real-time transaction tracking.",
            technologies: "React Native, Firebase, Stripe API",
            timeline: "16 weeks",
            link: "#",
            category: "mobile"
        },
        {
            id: 3,
            title: "Healthcare Dashboard",
            image: "assets/img/work-3.jpg",
            description: "Created an analytics dashboard for healthcare providers to monitor patient metrics and treatment outcomes.",
            technologies: "Vue.js, D3.js, Python, PostgreSQL",
            timeline: "10 weeks",
            link: "#",
            category: "web"
        },
        {
            id: 4,
            title: "Fitness Tracking Platform",
            image: "assets/img/work-4.jpg",
            description: "Built a comprehensive fitness tracking platform with workout planning and progress visualization.",
            technologies: "React, GraphQL, Redis, Docker",
            timeline: "14 weeks",
            link: "#",
            category: "web"
        },
        {
            id: 5,
            title: "Restaurant Ordering System",
            image: "assets/img/work-5.jpg",
            description: "Developed a contactless ordering system for restaurants with real-time kitchen updates.",
            technologies: "Next.js, Socket.io, MongoDB",
            timeline: "8 weeks",
            link: "#",
            category: "mobile"
        },
        {
            id: 6,
            title: "Real Estate Portal",
            image: "assets/img/work-6.jpg",
            description: "Created a real estate portal with virtual tours, mortgage calculators, and agent matching.",
            technologies: "Angular, .NET Core, Azure",
            timeline: "20 weeks",
            link: "#",
            category: "web"
        }
    ];
    
    const testimonials = [
        {
            name: "Maria Gonzalez",
            role: "CEO, TechSolutions Inc.",
            content: "Working with AgencyPro transformed our online presence. Their team delivered exactly what they promised, on time and on budget. Our conversion rate increased by 45% in just three months.",
            rating: 5,
            image: "assets/img/team-1.jpg"
        },
        {
            name: "David Chen",
            role: "Founder, GreenLeaf Organics",
            content: "The attention to detail and strategic thinking brought by AgencyPro was exactly what we needed. They understood our business goals and translated them into a beautiful, functional website.",
            rating: 4.5,
            image: "assets/img/team-2.jpg"
        },
        {
            name: "Sarah Johnson",
            role: "Marketing Director, Bloom & Grow",
            content: "As a small business, we needed a partner who could work within our budget while delivering professional results. AgencyPro exceeded our expectations at every step.",
            rating: 5,
            image: "assets/img/team-3.jpg"
        }
    ];
    
    // ==========================================================================
    // DOM Elements
    // ==========================================================================
    
    const navbar = document.getElementById('mainNav');
    const backToTopBtn = document.getElementById('backToTop');
    const portfolioGrid = document.getElementById('portfolio-grid');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const contactForm = document.getElementById('contactForm');
    const currentYear = document.getElementById('currentYear');
    
    // ==========================================================================
    // Navigation & Scrolling
    // ==========================================================================
    
    /**
     * Shrink navbar on scroll
     */
    function handleNavbarScroll() {
        if (window.scrollY > 60) {
            navbar.classList.add('shrink');
        } else {
            navbar.classList.remove('shrink');
        }
    }
    
    /**
     * Show/hide back to top button
     */
    function handleBackToTop() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    /**
     * Smooth scroll to section
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile navbar if open
                    const navbarCollapse = document.querySelector('.navbar-collapse.show');
                    if (navbarCollapse) {
                        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                        if (bsCollapse) bsCollapse.hide();
                    }
                    
                    // Scroll to target
                    const headerHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    /**
     * Update active nav link based on scroll position
     */
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // ==========================================================================
    // Portfolio System
    // ==========================================================================
    
    /**
     * Render portfolio items from data
     */
    function renderPortfolioItems() {
        if (!portfolioGrid) return;
        
        portfolioGrid.innerHTML = '';
        
        portfolioItems.forEach(item => {
            const col = document.createElement('div');
            col.className = 'col-md-6 col-lg-4';
            
            col.innerHTML = `
                <div class="portfolio-item" data-id="${item.id}" role="button" tabindex="0" aria-label="View ${item.title} project">
                    <img src="${item.image}" alt="${item.title}" class="portfolio-img" loading="lazy">
                    <div class="portfolio-overlay">
                        <div class="text-white">
                            <h4 class="h5 mb-2">${item.title}</h4>
                            <p class="small mb-0 opacity-75">${item.technologies}</p>
                        </div>
                    </div>
                </div>
            `;
            
            portfolioGrid.appendChild(col);
        });
        
        // Add click event listeners to portfolio items
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('click', openPortfolioModal);
            item.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openPortfolioModal.call(item, e);
                }
            });
        });
    }
    
    /**
     * Open portfolio modal with project details
     */
    function openPortfolioModal(e) {
        const itemId = this.getAttribute('data-id');
        const project = portfolioItems.find(p => p.id == itemId);
        
        if (!project) return;
        
        // Set modal content
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalImage').src = project.image;
        document.getElementById('modalImage').alt = project.title;
        document.getElementById('modalDescription').textContent = project.description;
        document.getElementById('modalTech').textContent = project.technologies;
        document.getElementById('modalTimeline').textContent = project.timeline;
        document.getElementById('modalLink').href = project.link;
        
        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('portfolioModal'));
        modal.show();
    }
    
    // ==========================================================================
    // Testimonial Slider
    // ==========================================================================
    
    let currentSlide = 0;
    let slideInterval;
    
    /**
     * Initialize testimonial slider
     */
    function initTestimonialSlider() {
        if (testimonialSlides.length === 0) return;
        
        // Start auto-rotation
        startSlideInterval();
        
        // Manual controls
        document.querySelector('.slider-prev')?.addEventListener('click', showPrevSlide);
        document.querySelector('.slider-next')?.addEventListener('click', showNextSlide);
        
        // Dot controls
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });
        
        // Pause on hover
        const slider = document.querySelector('.testimonial-slider');
        if (slider) {
            slider.addEventListener('mouseenter', pauseSlider);
            slider.addEventListener('mouseleave', startSlideInterval);
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.target.closest('.testimonial-slider')) {
                if (e.key === 'ArrowLeft') showPrevSlide();
                if (e.key === 'ArrowRight') showNextSlide();
            }
        });
    }
    
    /**
     * Show specific slide
     */
    function goToSlide(n) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        testimonialSlides[n].classList.add('active');
        
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === n);
        });
        
        currentSlide = n;
    }
    
    /**
     * Show next slide
     */
    function showNextSlide() {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        goToSlide(currentSlide);
        resetSlideInterval();
    }
    
    /**
     * Show previous slide
     */
    function showPrevSlide() {
        currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        goToSlide(currentSlide);
        resetSlideInterval();
    }
    
    /**
     * Start automatic slide rotation
     */
    function startSlideInterval() {
        slideInterval = setInterval(showNextSlide, 5000);
    }
    
    /**
     * Pause automatic rotation
     */
    function pauseSlider() {
        clearInterval(slideInterval);
    }
    
    /**
     * Reset interval after manual interaction
     */
    function resetSlideInterval() {
        pauseSlider();
        startSlideInterval();
    }
    
    // ==========================================================================
    // Form Validation
    // ==========================================================================
    
    /**
     * Initialize form validation
     */
    function initFormValidation() {
        if (!contactForm) return;
        
        // Bootstrap validation
        contactForm.addEventListener('submit', function(e) {
            if (!this.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            this.classList.add('was-validated');
            
            // If form is valid, show success message
            if (this.checkValidity()) {
                e.preventDefault();
                showFormSuccess();
            }
        }, false);
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    this.classList.remove('is-invalid');
                }
            });
        });
    }
    
    /**
     * Show success message after form submission
     */
    function showFormSuccess() {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            const alert = document.createElement('div');
            alert.className = 'alert alert-success alert-dismissible fade show';
            alert.innerHTML = `
                <strong>Thank you!</strong> Your message has been sent. We'll get back to you within 24 hours.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
            
            contactForm.prepend(alert);
            
            // Reset form
            contactForm.reset();
            contactForm.classList.remove('was-validated');
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Auto-dismiss alert after 5 seconds
            setTimeout(() => {
                const bsAlert = bootstrap.Alert.getInstance(alert);
                if (bsAlert) bsAlert.close();
            }, 5000);
        }, 1500);
    }
    
    // ==========================================================================
    // Lazy Loading Images
    // ==========================================================================
    
    /**
     * Initialize lazy loading for images
     */
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            lazyImages.forEach(img => {
                img.src = img.dataset.src || img.src;
            });
        }
    }
    
    // ==========================================================================
    // Utility Functions
    // ==========================================================================
    
    /**
     * Set current year in footer
     */
    function setCurrentYear() {
        if (currentYear) {
            currentYear.textContent = new Date().getFullYear();
        }
    }
    
    /**
     * Initialize all components
     */
    function init() {
        // Navigation & Scrolling
        window.addEventListener('scroll', handleNavbarScroll);
        window.addEventListener('scroll', handleBackToTop);
        window.addEventListener('scroll', updateActiveNavLink);
        initSmoothScroll();
        
        // Back to top button
        backToTopBtn?.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        // Portfolio
        renderPortfolioItems();
        
        // Testimonials
        initTestimonialSlider();
        
        // Forms
        initFormValidation();
        
        // Lazy loading
        initLazyLoading();
        
        // Utilities
        setCurrentYear();
        
        // Initial calls
        handleNavbarScroll();
        handleBackToTop();
        updateActiveNavLink();
        
        console.log('AgencyPro template initialized successfully!');
    }
    
    // ==========================================================================
    // Initialize everything when DOM is ready
    // ==========================================================================
    
    init();
    
    // ==========================================================================
    // Public API (for advanced customization)
    // ==========================================================================
    
    window.AgencyPro = {
        portfolioItems,
        testimonials,
        refreshPortfolio: renderPortfolioItems,
        goToTestimonial: goToSlide
    };
    
});