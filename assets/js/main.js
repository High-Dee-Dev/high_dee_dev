/**
 * HighDeeDev Portfolio - Main JavaScript File
 * Contains all interactive functionality for the portfolio website
 * 
 * Features:
 * - Navbar scroll effect
 * - Scroll to top button
 * - Form validation
 * - Smooth scrolling
 * - Animation on scroll
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // 1. Navbar Scroll Effect
    // ============================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ============================================
    // 2. Scroll to Top Button
    // ============================================
    const scrollTopBtn = document.getElementById('scrollTop');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ============================================
    // 3. Smooth Scrolling for Anchor Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only process internal links
            if (href === '#') return;
            
            // Check if it's a link to another page section
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Close mobile navbar if open
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    
                    if (navbarCollapse.classList.contains('show')) {
                        navbarToggler.click();
                    }
                    
                    // Scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ============================================
    // 4. Skill Bar Animation on Scroll
    // ============================================
    const animateSkillBars = function() {
        const skillBars = document.querySelectorAll('.progress-bar');
        
        // Check if element is in viewport
        const isElementInViewport = function(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
            );
        };
        
        // Animate skill bars when they come into view
        const checkSkillBars = function() {
            skillBars.forEach(bar => {
                if (isElementInViewport(bar)) {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    
                    // Animate after a short delay
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 30000);
                }
            });
        };
        
        // Check on scroll and load
        window.addEventListener('scroll', checkSkillBars);
        checkSkillBars(); // Check on initial load
    };
    
    // Initialize skill bar animation
    animateSkillBars();
    
    // ============================================
    // 5. Contact Form Validation
    // ============================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Get form fields
            const firstName = document.getElementById('firstName');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            // Reset previous validation states
            [firstName, email, subject, message].forEach(field => {
                field.classList.remove('is-invalid');
                field.classList.remove('is-valid');
            });
            
            // Validate First Name
            if (!firstName.value.trim()) {
                firstName.classList.add('is-invalid');
                isValid = false;
            } else {
                firstName.classList.add('is-valid');
            }
            
            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                email.classList.add('is-invalid');
                isValid = false;
            } else {
                email.classList.add('is-valid');
            }
            
            // Validate Subject
            if (!subject.value) {
                subject.classList.add('is-invalid');
                isValid = false;
            } else {
                subject.classList.add('is-valid');
            }
            
            // Validate Message
            if (!message.value.trim()) {
                message.classList.add('is-invalid');
                isValid = false;
            } else {
                message.classList.add('is-valid');
            }
            
            // If form is valid, show success message
            if (isValid) {
                // In a real application, you would send the data to a server here
                // For this demo, we'll just show a success message
                
                const successAlert = document.getElementById('formSuccess');
                const errorAlert = document.getElementById('formError');
                
                // Hide any previous alerts
                if (successAlert) successAlert.classList.add('d-none');
                if (errorAlert) errorAlert.classList.add('d-none');
                
                // Show success message
                if (successAlert) {
                    successAlert.classList.remove('d-none');
                    
                    // Reset form after 3 seconds
                    setTimeout(() => {
                        contactForm.reset();
                        [firstName, email, subject, message].forEach(field => {
                            field.classList.remove('is-valid');
                        });
                    }, 3000);
                }
                
                // Scroll to success message
                if (successAlert) {
                    successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });
    }
    
    // ============================================
    // 6. Project Filtering (for projects.html)
    // ============================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('[data-category]');
    
    if (filterButtons.length > 0 && projectItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filter projects
                projectItems.forEach(item => {
                    const categories = item.getAttribute('data-category').split(' ');
                    
                    if (filterValue === 'all' || categories.includes(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // ============================================
    // 7. Initialize Bootstrap Tooltips
    // ============================================
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // ============================================
    // 8. Page Load Animation
    // ============================================
    // Add fade-in animation to main content
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            mainContent.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // ============================================
    // 9. Current Year in Footer
    // ============================================
    const yearElements = document.querySelectorAll('.current-year');
    if (yearElements.length > 0) {
        const currentYear = new Date().getFullYear();
        yearElements.forEach(el => {
            el.textContent = currentYear;
        });
    }
    
    // ============================================
    // 10. Active Navigation Link Highlighting
    // ============================================
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        if (currentPage === '' || currentPage === 'index.html') {
            // Home page
            if (linkHref === 'index.html' || linkHref === './') {
                link.classList.add('active');
            }
        } else if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
});