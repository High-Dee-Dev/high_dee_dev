/* 
CorporatePro - Main JavaScript File
Vanilla JS only, no jQuery dependencies
*/

// ===========================================
// DOM Ready Function
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeTemplate();
});

// ===========================================
// Template Initialization
// ===========================================

function initializeTemplate() {
    // Initialize all components
    initNavigation();
    initAnimations();
    initForms();
    initContactMap();
    initTestimonialSlider();
    initBackToTop();
    initMobileMenu();
    
    // Set current year in footer
    setCurrentYear();
    
    // Add loading class for page transitions
    document.body.classList.add('page-load');
}

// ===========================================
// Navigation Functions
// ===========================================

function initNavigation() {
    // Sticky header on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or external link
            if (href === '#' || href.startsWith('http')) return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            closeAllDropdowns();
        }
    });
}

function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.remove('show');
    });
}

// ===========================================
// Mobile Menu Functions
// ===========================================

function initMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navbarCollapse.classList.toggle('show');
        });
        
        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }
}

function closeMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.setAttribute('aria-expanded', 'false');
        navbarCollapse.classList.remove('show');
    }
}

// ===========================================
// Animation Functions
// ===========================================

function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Optional: Add animation delay based on data attribute
                const delay = entry.target.dataset.animationDelay || 0;
                if (delay > 0) {
                    entry.target.style.transitionDelay = `${delay}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
    
    // Add hover effects to service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover-active');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover-active');
        });
    });
}

// ===========================================
// Form Handling
// ===========================================

function initForms() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(function() {
                    // Reset form
                    contactForm.reset();
                    
                    // Show success message
                    showFormMessage('Message sent successfully! We\'ll get back to you soon.', 'success');
                    
                    // Reset button
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous error
    clearFieldError(field);
    
    // Check required fields
    if (field.hasAttribute('required') && !value) {
        errorMessage = 'This field is required';
        isValid = false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Please enter a valid email address';
            isValid = false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            errorMessage = 'Please enter a valid phone number';
            isValid = false;
        }
    }
    
    // Show error if validation failed
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'invalid-feedback';
    errorElement.textContent = message;
    
    field.classList.add('is-invalid');
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    field.classList.remove('is-invalid');
    
    const errorElement = field.parentNode.querySelector('.invalid-feedback');
    if (errorElement) {
        errorElement.remove();
    }
}

function showFormMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message alert alert-${type} mt-3`;
    messageElement.textContent = message;
    
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'btn-close';
    closeButton.setAttribute('data-bs-dismiss', 'alert');
    closeButton.setAttribute('aria-label', 'Close');
    messageElement.appendChild(closeButton);
    
    // Insert after form
    const form = document.getElementById('contactForm');
    if (form) {
        form.parentNode.insertBefore(messageElement, form.nextSibling);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
}

// ===========================================
// Contact Map Integration
// ===========================================

function initContactMap() {
    const mapElement = document.getElementById('contactMap');
    
    if (mapElement) {
        // This is a placeholder for actual map integration
        // In a real implementation, you would integrate with Google Maps or Mapbox
        
        mapElement.innerHTML = `
            <div class="map-placeholder">
                <div class="map-overlay">
                    <h4><i class="fas fa-map-marker-alt"></i> Our Location</h4>
                    <p>123 Business Avenue, Suite 500</p>
                    <p>Open in <a href="https://maps.google.com/?q=123+Business+Avenue" target="_blank">Google Maps</a></p>
                </div>
            </div>
        `;
        
        // Add CSS for map placeholder
        const style = document.createElement('style');
        style.textContent = `
            .map-placeholder {
                width: 100%;
                height: 400px;
                background: linear-gradient(45deg, #f8f9fa 25%, #e9ecef 25%, #e9ecef 50%, #f8f9fa 50%, #f8f9fa 75%, #e9ecef 75%);
                background-size: 20px 20px;
                position: relative;
                border-radius: 8px;
                overflow: hidden;
            }
            
            .map-overlay {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 2rem;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                text-align: center;
                max-width: 300px;
                width: 100%;
            }
            
            .map-overlay h4 {
                color: #2c3e50;
                margin-bottom: 1rem;
            }
            
            .map-overlay i {
                color: #1abc9c;
                margin-right: 0.5rem;
            }
        `;
        document.head.appendChild(style);
    }
}

// ===========================================
// Testimonial Slider
// ===========================================

function initTestimonialSlider() {
    const testimonialContainer = document.querySelector('.testimonial-slider');
    
    if (testimonialContainer) {
        const testimonials = testimonialContainer.querySelectorAll('.testimonial-item');
        let currentIndex = 0;
        const totalTestimonials = testimonials.length;
        
        if (totalTestimonials > 1) {
            // Create navigation buttons
            const prevButton = document.createElement('button');
            prevButton.className = 'testimonial-nav testimonial-prev';
            prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
            prevButton.setAttribute('aria-label', 'Previous testimonial');
            
            const nextButton = document.createElement('button');
            nextButton.className = 'testimonial-nav testimonial-next';
            nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
            nextButton.setAttribute('aria-label', 'Next testimonial');
            
            testimonialContainer.appendChild(prevButton);
            testimonialContainer.appendChild(nextButton);
            
            // Create dots indicator
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'testimonial-dots';
            
            for (let i = 0; i < totalTestimonials; i++) {
                const dot = document.createElement('button');
                dot.className = 'testimonial-dot';
                if (i === 0) dot.classList.add('active');
                dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
                dot.setAttribute('data-index', i);
                
                dot.addEventListener('click', function() {
                    goToTestimonial(parseInt(this.getAttribute('data-index')));
                });
                
                dotsContainer.appendChild(dot);
            }
            
            testimonialContainer.parentNode.appendChild(dotsContainer);
            
            // Show first testimonial
            showTestimonial(currentIndex);
            
            // Navigation event listeners
            prevButton.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
                showTestimonial(currentIndex);
            });
            
            nextButton.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % totalTestimonials;
                showTestimonial(currentIndex);
            });
            
            // Auto-rotate testimonials
            let autoRotate = setInterval(function() {
                currentIndex = (currentIndex + 1) % totalTestimonials;
                showTestimonial(currentIndex);
            }, 5000);
            
            // Pause auto-rotation on hover
            testimonialContainer.addEventListener('mouseenter', function() {
                clearInterval(autoRotate);
            });
            
            testimonialContainer.addEventListener('mouseleave', function() {
                autoRotate = setInterval(function() {
                    currentIndex = (currentIndex + 1) % totalTestimonials;
                    showTestimonial(currentIndex);
                }, 5000);
            });
        }
        
        function showTestimonial(index) {
            // Hide all testimonials
            testimonials.forEach(testimonial => {
                testimonial.classList.remove('active');
            });
            
            // Show selected testimonial
            testimonials[index].classList.add('active');
            
            // Update dots
            const dots = document.querySelectorAll('.testimonial-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            // Update current index
            currentIndex = index;
        }
        
        function goToTestimonial(index) {
            currentIndex = index;
            showTestimonial(currentIndex);
        }
        
        // Add CSS for slider
        const style = document.createElement('style');
        style.textContent = `
            .testimonial-slider {
                position: relative;
                overflow: hidden;
            }
            
            .testimonial-item {
                display: none;
                animation: fadeIn 0.5s ease;
            }
            
            .testimonial-item.active {
                display: block;
            }
            
            .testimonial-nav {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background: white;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                cursor: pointer;
                transition: all 0.3s ease;
                z-index: 10;
            }
            
            .testimonial-nav:hover {
                background: #1abc9c;
                color: white;
            }
            
            .testimonial-prev {
                left: 10px;
            }
            
            .testimonial-next {
                right: 10px;
            }
            
            .testimonial-dots {
                display: flex;
                justify-content: center;
                gap: 10px;
                margin-top: 20px;
            }
            
            .testimonial-dot {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                border: none;
                background: #ddd;
                cursor: pointer;
                transition: all 0.3s ease;
                padding: 0;
            }
            
            .testimonial-dot.active {
                background: #1abc9c;
                transform: scale(1.2);
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===========================================
// Back to Top Button
// ===========================================

function initBackToTop() {
    // Create button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTop';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add CSS for back to top button
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: #1abc9c;
            color: white;
            border: none;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(26, 188, 156, 0.3);
        }
        
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        
        .back-to-top:hover {
            background: #16a085;
            transform: translateY(-5px);
            box-shadow: 0 6px 20px rgba(26, 188, 156, 0.4);
        }
    `;
    document.head.appendChild(style);
}

// ===========================================
// Utility Functions
// ===========================================

function setCurrentYear() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// ===========================================
// Performance Optimization
// ===========================================

// Lazy load images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===========================================
// Error Handling
// ===========================================

window.addEventListener('error', function(e) {
    console.error('Template error:', e.error);
    
    // Fallback for failed features
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
    }
});

// ===========================================
// Export functions for template customization
// ===========================================

// Make core functions available for customization
window.CorporatePro = {
    init: initializeTemplate,
    validateForm: validateForm,
    showFormMessage: showFormMessage,
    initTestimonialSlider: initTestimonialSlider
};