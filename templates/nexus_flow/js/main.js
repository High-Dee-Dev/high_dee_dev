/**
 * NexusFlow SaaS Template - Main JavaScript
 * Premium Startup Landing Page Template
 * Version: 1.0.0
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===========================================
    // 1. NAVBAR SCROLL EFFECT
    // ===========================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Initialize scroll state
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }
    
    // ===========================================
    // 2. SCREENSHOT CONTROLS
    // ===========================================
    const screenshotBtns = document.querySelectorAll('.screenshot-btn');
    const screenshotImgs = document.querySelectorAll('.screenshot-img');
    
    if (screenshotBtns.length > 0 && screenshotImgs.length > 0) {
        screenshotBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                
                // Remove active class from all buttons and images
                screenshotBtns.forEach(b => b.classList.remove('active'));
                screenshotImgs.forEach(img => img.classList.remove('active'));
                
                // Add active class to clicked button and corresponding image
                this.classList.add('active');
                screenshotImgs[index].classList.add('active');
            });
        });
    }
    
    // ===========================================
    // 3. PRICING TOGGLE
    // ===========================================
    const pricingToggle = document.getElementById('pricingToggle');
    const monthlyPrices = document.querySelectorAll('.monthly-price');
    const annualPrices = document.querySelectorAll('.annual-price');
    
    if (pricingToggle) {
        pricingToggle.addEventListener('change', function() {
            if (this.checked) {
                // Switch to annual pricing
                monthlyPrices.forEach(price => price.style.display = 'none');
                annualPrices.forEach(price => price.style.display = 'inline');
            } else {
                // Switch to monthly pricing
                monthlyPrices.forEach(price => price.style.display = 'inline');
                annualPrices.forEach(price => price.style.display = 'none');
            }
        });
        
        // Initialize pricing display
        if (!pricingToggle.checked) {
            monthlyPrices.forEach(price => price.style.display = 'inline');
            annualPrices.forEach(price => price.style.display = 'none');
        }
    }
    
    // ===========================================
    // 4. SMOOTH SCROLL FOR ANCHOR LINKS
    // ===========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip if it's an empty href or href is just "#"
            if (this.getAttribute('href') === '#' || this.getAttribute('href') === '') {
                return;
            }
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile navbar if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
                
                // Calculate offset for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link (optional enhancement)
                updateActiveNavLink(targetId);
            }
        });
    });
    
    // Function to update active navigation link
    function updateActiveNavLink(targetId) {
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }
    
    // ===========================================
    // 5. FORM VALIDATION & SUBMISSION
    // ===========================================
    const heroForm = document.getElementById('heroForm');
    
    if (heroForm) {
        heroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            // Simple email validation
            if (!isValidEmail(email)) {
                showFormError(emailInput, 'Please enter a valid email address');
                return;
            }
            
            // In a real implementation, this would be an AJAX call
            // For demo purposes, we'll simulate a successful submission
            simulateFormSubmission(emailInput);
        });
        
        // Clear error on input
        const emailInput = heroForm.querySelector('input[type="email"]');
        emailInput.addEventListener('input', function() {
            clearFormError(this);
        });
    }
    
    // Email validation function
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Show form error
    function showFormError(input, message) {
        clearFormError(input);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error text-danger mt-2 small';
        errorDiv.textContent = message;
        
        input.parentNode.appendChild(errorDiv);
        input.classList.add('is-invalid');
    }
    
    // Clear form error
    function clearFormError(input) {
        const existingError = input.parentNode.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }
        input.classList.remove('is-invalid');
    }
    
    // Simulate form submission
    function simulateFormSubmission(input) {
        const submitBtn = input.parentNode.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Processing...';
        submitBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Show success message
            const successDiv = document.createElement('div');
            successDiv.className = 'form-success alert alert-success mt-3';
            successDiv.innerHTML = `
                <i class="fas fa-check-circle me-2"></i>
                <strong>Check your email!</strong> We've sent a link to start your free trial.
            `;
            
            input.parentNode.parentNode.appendChild(successDiv);
            
            // Reset form
            input.value = '';
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successDiv.remove();
            }, 5000);
            
            // In a real implementation, you would redirect or show a modal
            // window.location.href = '/thank-you';
            
        }, 1500);
    }
    
    // ===========================================
    // 6. ANIMATION ON SCROLL
    // ===========================================
    function initScrollAnimations() {
        const animateElements = document.querySelectorAll('.feature-card, .step-card, .testimonial-card, .pricing-card, .team-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animateElements.forEach(el => {
            el.classList.add('animate-ready');
            observer.observe(el);
        });
    }
    
    // Initialize animations after page load
    window.addEventListener('load', initScrollAnimations);
    
    // ===========================================
    // 7. FLOATING CARDS ANIMATION
    // ===========================================
    function animateFloatingCards() {
        const floatingCards = document.querySelectorAll('.floating-card');
        
        floatingCards.forEach((card, index) => {
            // Add staggered animation delay
            card.style.animationDelay = `${index * 0.5}s`;
        });
    }
    
    // Initialize floating cards animation
    animateFloatingCards();
    
    // ===========================================
    // 8. FAQ ACCORDION ENHANCEMENTS
    // ===========================================
    const faqAccordionButtons = document.querySelectorAll('.accordion-button');
    
    faqAccordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add a subtle animation to the icon
            const icon = this.querySelector('.accordion-icon');
            if (icon) {
                icon.classList.toggle('rotate');
            }
        });
    });
    
    // ===========================================
    // 9. CLIENT LOGOS HOVER EFFECT
    // ===========================================
    const clientLogos = document.querySelectorAll('.client-logos img');
    
    clientLogos.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // ===========================================
    // 10. CURRENT YEAR IN FOOTER
    // ===========================================
    function updateCurrentYear() {
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
    
    // Initialize current year
    updateCurrentYear();
    
    // ===========================================
    // 11. RESPONSIVE NAVBAR CLOSE ON CLICK
    // ===========================================
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) { // Bootstrap LG breakpoint
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
    
    // ===========================================
    // 12. LAZY LOADING FOR IMAGES
    // ===========================================
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.getAttribute('data-src');
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
            });
        }
    }
    
    // Initialize lazy loading
    initLazyLoading();
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-ready {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .form-error {
        font-size: 14px;
        margin-top: 5px;
    }
    
    .form-success {
        animation: fadeIn 0.5s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .accordion-icon {
        transition: transform 0.3s ease;
    }
    
    .accordion-icon.rotate {
        transform: rotate(180deg);
    }
`;
document.head.appendChild(style);