// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initNavbar();
    initTypedText();
    initPortfolioFilters();
    loadProjects();
    initContactForm();
    initScrollAnimations();
    
    // Update copyright year
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

// Navbar scroll effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Typing animation for hero section
function initTypedText() {
    const typedTextSpan = document.querySelector('.typed-text');
    const textArray = ["websites", "web apps", "digital solutions"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 1500;
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 500);
        }
    }
    
    // Start typing effect on page load
    if (typedTextSpan) {
        setTimeout(type, newTextDelay);
    }
}

// Portfolio filtering
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            filterProjects(filterValue);
        });
    });
}

// Filter projects based on category
function filterProjects(category) {
    const projectContainers = document.querySelectorAll('[data-category]');
    
    projectContainers.forEach(container => {
        const projectCategory = container.getAttribute('data-category');
        
        if (category === 'all' || projectCategory === category) {
            container.style.display = 'block';
            // Add animation delay for staggered effect
            setTimeout(() => {
                container.style.opacity = '1';
                container.style.transform = 'translateY(0)';
            }, projectContainers.length * 20);
        } else {
            container.style.opacity = '0';
            container.style.transform = 'translateY(20px)';
            setTimeout(() => {
                container.style.display = 'none';
            }, 300);
        }
    });
}

// Load projects from JSON file
async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        const projects = await response.json();
        
        const projectsContainer = document.getElementById('projects-container');
        
        // Clear loading state
        projectsContainer.innerHTML = '';
        
        // Generate project cards
        projects.forEach(project => {
            const projectCard = createProjectCard(project);
            projectsContainer.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Error loading projects:', error);
        document.getElementById('projects-container').innerHTML = `
            <div class="col-12 text-center py-5">
                <p>Unable to load projects at the moment. Please check back later.</p>
            </div>
        `;
    }
}

// Create project card HTML
function createProjectCard(project) {
    // Create tech stack badges
    let techStackHTML = '';
    project.tech.forEach(tech => {
        techStackHTML += `<span>${tech}</span>`;
    });
    let color = ['text-danger', 'text-primary', 'text-success', 'text-dark', 'text-secondary', 'text-warning']
    let random_color_number = Math.floor(Math.random() * (color.length - 1));
    let random_color = color[random_color_number];
    return document.createRange().createContextualFragment(`
        <div class="col-md-6 col-lg-4" data-category="${project.category}">
            <div class="project-card">
                <div class="project-img">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${techStackHTML}
                    </div>
                </div>
                <div class="card-footer text-end pe-3 pb-3">
                    <a class="${random_color}" href='${project.url}' target="--blank"><i class="fa-solid fa-eye"></i> Live Preview</a>
                </div>
            </div>
        </div>
    `);
}

// Contact form submission using mailto method - Enhanced version
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const email = 'high.dee.dev@gmail.com'; // Your email
    
    if (contactForm) {
        // Add input validation on blur
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                showAlert('Please correct the errors in the form before submitting.', 'error');
                return;
            }
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const emailValue = document.getElementById('email').value.trim();
            const project = document.getElementById('project').value;
            const message = document.getElementById('message').value.trim();
            
            // Get project type text
            const projectTypeText = getProjectTypeText(project);
            
            // Create email content
            const subject = `Portfolio Inquiry: ${projectTypeText} from ${name}`;
            const body = createEmailBody(name, emailValue, projectTypeText, message);
            
            // Show confirmation modal before opening email client
            showEmailConfirmation(name, emailValue, subject, body);
        });
    }
    
    // Helper function to create email body
    function createEmailBody(name, email, projectType, message) {
        return `
Hello High Dee Dev,

I saw your portfolio and I'm interested in working with you on a project.

Project Details:
• Name: ${name}
• Email: ${email}
• Project Type: ${projectType}
• Message: ${message}

I'm looking forward to discussing this further with you.

Best regards,
${name}
        `.trim();
    }
    
    // Helper function to get project type text
    function getProjectTypeText(projectValue) {
        const projectTypes = {
            'frontend': 'Frontend Development',
            'backend': 'Backend Development',
            'fullstack': 'Fullstack Web Application',
            'design': 'UI/UX Design',
            'other': 'Other Project Type'
        };
        return projectTypes[projectValue] || 'Not specified';
    }
    
    // Field validation
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.previousElementSibling ? field.previousElementSibling.textContent : 'This field';
        let isValid = true;
        let errorMessage = '';
        
        // Clear previous error
        clearFieldError(field);
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            errorMessage = `${fieldName} is required.`;
            isValid = false;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address.';
                isValid = false;
            }
        }
        
        // Show error if any
        if (!isValid) {
            showFieldError(field, errorMessage);
        } else {
            showFieldSuccess(field);
        }
        
        return isValid;
    }
    
    // Show field error
    function showFieldError(field, message) {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
        
        let errorDiv = field.nextElementSibling;
        if (!errorDiv || !errorDiv.classList.contains('validation-message')) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'validation-message error';
            field.parentNode.insertBefore(errorDiv, field.nextSibling);
        }
        errorDiv.textContent = message;
    }
    
    // Show field success
    function showFieldSuccess(field) {
        field.classList.add('is-valid');
        field.classList.remove('is-invalid');
        clearFieldError(field);
    }
    
    // Clear field error
    function clearFieldError(field) {
        const errorDiv = field.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('validation-message')) {
            errorDiv.remove();
        }
        field.classList.remove('is-invalid');
    }
    
    // Show email confirmation modal
    function showEmailConfirmation(name, emailValue, subject, body) {
        // Create modal HTML
        const modalHTML = `
            <div class="modal fade" id="emailConfirmationModal" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Ready to Send</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <p>Your message is ready to be sent. Click "Open Email" to open your email client with a pre-filled message.</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" id="sendEmailBtn">
                                <i class="fas fa-envelope me-2"></i>Open Email
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal to page
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = modalHTML;
        document.body.appendChild(modalContainer);
        
        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('emailConfirmationModal'));
        modal.show();
        
        // Handle send button click
        document.getElementById('sendEmailBtn').addEventListener('click', function() {
            const encodedSubject = encodeURIComponent(subject);
            const encodedBody = encodeURIComponent(body);
            const mailtoUrl = `mailto:high.dee.dev@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
            
            // Open email client
            window.location.href = mailtoUrl;
            
            // Show success message
            setTimeout(() => {
                showAlert(`Thanks ${name}! Your email client should open shortly. If it doesn't, please send an email to high.dee.dev@gmail.com.`, 'success');
                
                // Reset form
                document.getElementById('contactForm').reset();
                
                // Remove validation classes
                const formInputs = document.querySelectorAll('.form-control');
                formInputs.forEach(input => {
                    input.classList.remove('is-valid', 'is-invalid');
                });
            }, 1000);
            
            // Hide modal
            modal.hide();
            
            // Remove modal from DOM after hide
            document.getElementById('emailConfirmationModal').addEventListener('hidden.bs.modal', function() {
                modalContainer.remove();
            });
        });
        
        // Remove modal from DOM when closed
        document.getElementById('emailConfirmationModal').addEventListener('hidden.bs.modal', function() {
            modalContainer.remove();
        });
    }
    
    // Helper function to show alert messages
    function showAlert(message, type = 'info') {
        // (Same showAlert function as previous version)
        const existingAlert = document.querySelector('.custom-alert');
        if (existingAlert) existingAlert.remove();
        
        const alertDiv = document.createElement('div');
        alertDiv.className = `custom-alert alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} alert-dismissible fade show`;
        alertDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 9999;
            max-width: 400px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            animation: slideInRight 0.3s ease;
        `;
        
        alertDiv.innerHTML = `${message}<button type="button" class="btn-close" data-bs-dismiss="alert"></button>`;
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            if (alertDiv.parentNode) alertDiv.remove();
        }, type === 'error' ? 8000 : 5000);
    }
}

// Scroll animations
function initScrollAnimations() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .project-card, .testimonial-card');
    animateElements.forEach(el => observer.observe(el));
}

// WhatsApp integration helper
function openWhatsApp() {
    const phoneNumber = '+2349011686965';
    const message = 'Hi High Dee Dev, I saw your portfolio and would like to discuss a project.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}