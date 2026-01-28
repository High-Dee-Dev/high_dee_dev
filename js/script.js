/**
 * High Dee Dev Portfolio - Main JavaScript
 * Now with JSON project data integration
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ----- GLOBAL VARIABLES -----
    const navbar = document.getElementById('mainNav');
    const backToTop = document.getElementById('backToTop');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const skillItems = document.querySelectorAll('.skill-item');
    const progressTrail = document.querySelector('.trail-progress');
    const projectsContainer = document.getElementById('projectsContainer');
    const projectsLoading = document.getElementById('projectsLoading');
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // ----- FALLBACK PROJECTS DATA -----
    const fallbackProjectsData = [
        {
            "id": 1,
            "title": "AgencyPro",
            "description": "AgencyPro is a beautiful, fast, accessible, and conversion-focused one-page HTML template designed specifically for agencies and small businesses. Built with Bootstrap 5, modern HTML5, clean CSS, and lightweight vanilla JavaScript.",
            "image": "images/agencypro.PNG",
            "url": "https://highdeedev.space/templates/AgencyPro/",
            "category": "frontend",
            "tech": ["HTML", "CSS", "Bootstrap", "JavaScript", "FontAwesome"],
            "duration": "4 weeks",
            "role": "Frontend Developer",
            "challenge": "Create a template that balances aesthetic appeal with conversion optimization for agencies competing in crowded markets.",
            "solution": "Implemented clear value propositions, social proof sections, and strategic CTAs while maintaining fast load times and accessibility compliance.",
            "technologies": "HTML5, CSS3, Bootstrap 5.3, Vanilla JavaScript, Font Awesome 6"
        },
        {
            "id": 2,
            "title": "Bistro Elegante",
            "description": "A beautiful, modern, and conversion-focused website template for restaurants and cafes. Built with Bootstrap 5, plain HTML, CSS, and vanilla JavaScript. Perfect for restaurant owners who want a professional online presence that drives reservations and orders.",
            "image": "images/bistro_elegante.PNG",
            "url": "https://highdeedev.space/templates/bistro_elegante/",
            "category": "frontend",
            "tech": ["HTML", "CSS", "Bootstrap", "JavaScript", "FontAwesome"],
            "duration": "3 weeks",
            "role": "Frontend Developer & Designer",
            "challenge": "Design a template that captures restaurant ambiance while prioritizing menu display, reservation systems, and mobile ordering.",
            "solution": "Created visual hierarchy with food photography, implemented interactive menu system, and integrated reservation form with validation.",
            "technologies": "Bootstrap 5, Custom CSS, JavaScript, Responsive Design"
        },
        {
            "id": 3,
            "title": "CorporatePro",
            "description": "CorporatePro is built with modern web standards and best practices. It features a clean, professional design that conveys trust and expertise. The template is fully responsive, working perfectly on all devices from mobile phones to desktop computers.",
            "image": "images/corporatePro.PNG",
            "url": "https://highdeedev.space/templates/corporatePro/",
            "category": "frontend",
            "tech": ["HTML", "CSS", "Bootstrap", "JavaScript", "FontAwesome"],
            "duration": "5 weeks",
            "role": "Frontend Developer",
            "challenge": "Develop a corporate template that communicates professionalism while remaining adaptable to various business types.",
            "solution": "Built modular components that can be easily rearranged, implemented dark/light mode toggle, and created comprehensive documentation.",
            "technologies": "HTML5, Bootstrap 5, CSS Grid, Flexbox, JavaScript ES6+"
        },
        {
            "id": 4,
            "title": "Thoughtful Reads",
            "description": "A beautiful, modern, and conversion-optimized blog and magazine template built with Bootstrap 5, featuring dark mode, responsive design, and comprehensive monetization features.",
            "image": "images/thoughtful_reads.PNG",
            "url": "https://highdeedev.space/templates/thoughtful_reads/",
            "category": "frontend",
            "tech": ["HTML", "CSS", "Bootstrap", "JavaScript", "FontAwesome"],
            "duration": "6 weeks",
            "role": "Full Stack Developer",
            "challenge": "Create a blog template that supports complex content hierarchies while optimizing for readability and monetization.",
            "solution": "Implemented dynamic dark mode, table of contents generation, ad placement zones, and newsletter integration points.",
            "technologies": "Bootstrap 5, CSS Custom Properties, JavaScript, Local Storage API"
        }
    ];
    
    // ----- LOAD PROJECTS FROM JSON -----
    async function loadProjectsFromJSON() {
        try {
            const response = await fetch('data/projects.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Validate the data structure
            if (!data || !Array.isArray(data)) {
                console.warn('Invalid JSON structure, using fallback data');
                return fallbackProjectsData;
            }
            
            return data;
        } catch (error) {
            console.warn('Could not load projects.json, using fallback data:', error);
            return fallbackProjectsData;
        }
    }
    
    // ----- DYNAMIC PROJECTS RENDERING -----
    function renderProjects(projects) {
        if (!projectsContainer) return;
        
        // Hide loading indicator
        if (projectsLoading) {
            projectsLoading.style.display = 'none';
        }
        
        // Clear existing content
        projectsContainer.innerHTML = '';
        
        if (!projects || projects.length === 0) {
            projectsContainer.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fas fa-folder-open fa-3x text-muted mb-3"></i>
                    <h4>No projects found</h4>
                    <p class="text-muted">Projects will appear here when added to the JSON file.</p>
                </div>
            `;
            return;
        }
        
        // Create projects grid
        const row = document.createElement('div');
        row.className = 'row';
        
        projects.forEach(project => {
            const projectCol = document.createElement('div');
            projectCol.className = 'col-lg-4 col-md-6 mb-4';
            
            projectCol.innerHTML = `
                <div class="project-card">
                    <div class="project-image">
                        <div class="project-image-inner">
                            <img src="${project.image}" alt="${project.title}" class="project-img" loading="lazy">
                            <div class="image-overlay">
                                <a href="${project.url}" target="_blank" class="btn btn-light btn-sm" aria-label="View ${project.title} live demo">
                                    <i class="fas fa-external-link-alt me-1"></i> Live Demo
                                </a>
                            </div>
                        </div>
                        <div class="project-tech">
                            ${project.tech ? project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('') : ''}
                        </div>
                    </div>
                    <div class="project-content">
                        <h4 class="project-title">${project.title || 'Untitled Project'}</h4>
                        <p class="project-description">${project.description || 'No description available.'}</p>
                        <div class="project-details">
                            <div class="detail">
                                <i class="fas fa-calendar-alt"></i>
                                <span>${project.duration || 'Duration not specified'}</span>
                            </div>
                            <div class="detail">
                                <i class="fas fa-code"></i>
                                <span>${project.role || 'Developer'}</span>
                            </div>
                        </div>
                        <button class="btn btn-outline-primary btn-sm mt-3 project-toggle">
                            <i class="fas fa-plus me-1"></i> View Details
                        </button>
                        <div class="project-full-details">
                            ${project.challenge ? `<h5>Challenge</h5><p>${project.challenge}</p>` : ''}
                            ${project.solution ? `<h5>Solution</h5><p>${project.solution}</p>` : ''}
                            ${project.technologies ? `<h5>Technologies</h5><p>${project.technologies}</p>` : ''}
                            
                            <div class="mt-3">
                                <a href="${project.url}" target="_blank" class="btn btn-primary btn-sm me-2">
                                    <i class="fas fa-external-link-alt me-1"></i> View Live
                                </a>
                                <button class="btn btn-outline-secondary btn-sm project-close">
                                    <i class="fas fa-times me-1"></i> Close Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            row.appendChild(projectCol);
        });
        
        projectsContainer.appendChild(row);
        
        // Update project counters
        updateProjectCounters(projects);
        
        // Initialize project interactions
        initProjectInteractions();
    }
    
    // ----- UPDATE PROJECT COUNTERS -----
    function updateProjectCounters(projects) {
        if (!projects || !Array.isArray(projects)) return;
        
        const totalElement = document.getElementById('totalProjects');
        const frontendElement = document.getElementById('frontendProjects');
        const liveElement = document.getElementById('liveProjects');
        
        if (totalElement) {
            totalElement.textContent = projects.length;
        }
        
        if (frontendElement) {
            const frontendCount = projects.filter(p => p.category === 'frontend').length;
            frontendElement.textContent = frontendCount;
        }
        
        if (liveElement) {
            const liveCount = projects.filter(p => p.url && p.url.startsWith('http')).length;
            liveElement.textContent = liveCount;
        }
    }
    
    // ----- NAVBAR SCROLL EFFECT -----
    function handleNavbarScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // ----- BACK TO TOP BUTTON -----
    function handleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    // ----- SMOOTH SCROLL FOR NAV LINKS -----
    function initSmoothScroll() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (!targetElement) return;
                
                // Close mobile navbar if open
                const navbarCollapse = document.querySelector('.navbar-collapse.show');
                if (navbarCollapse) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    bsCollapse.hide();
                }
                
                // Smooth scroll to target
                const headerHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }
    
    // ----- ACTIVE NAV LINK HIGHLIGHT -----
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        // Reset all nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Find current section
        let currentSectionId = '';
        
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        // Add active class to corresponding nav link
        if (currentSectionId) {
            const activeLink = document.querySelector(`.nav-link[href="#${currentSectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }
    
    // ----- PROJECT INTERACTIONS -----
    function initProjectInteractions() {
        // Handle project toggle buttons
        document.addEventListener('click', function(e) {
            // Handle project toggle buttons
            if (e.target.classList.contains('project-toggle') || 
                e.target.closest('.project-toggle')) {
                const button = e.target.classList.contains('project-toggle') ? 
                    e.target : e.target.closest('.project-toggle');
                const projectCard = button.closest('.project-card');
                const details = projectCard.querySelector('.project-full-details');
                
                // Toggle active class
                details.classList.toggle('active');
                
                // Update button text and icon
                if (details.classList.contains('active')) {
                    button.innerHTML = '<i class="fas fa-minus me-1"></i> Hide Details';
                    // Scroll details into view if needed
                    details.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                } else {
                    button.innerHTML = '<i class="fas fa-plus me-1"></i> View Details';
                }
                
                // Close other open project details (optional - remove if you want multiple open)
                document.querySelectorAll('.project-full-details.active').forEach(otherDetails => {
                    if (otherDetails !== details) {
                        otherDetails.classList.remove('active');
                        const otherButton = otherDetails.closest('.project-card').querySelector('.project-toggle');
                        otherButton.innerHTML = '<i class="fas fa-plus me-1"></i> View Details';
                    }
                });
            }
            
            // Handle close buttons inside project details
            if (e.target.classList.contains('project-close') || 
                e.target.closest('.project-close')) {
                const closeBtn = e.target.classList.contains('project-close') ? 
                    e.target : e.target.closest('.project-close');
                const details = closeBtn.closest('.project-full-details');
                const projectCard = details.closest('.project-card');
                const toggleButton = projectCard.querySelector('.project-toggle');
                
                details.classList.remove('active');
                toggleButton.innerHTML = '<i class="fas fa-plus me-1"></i> View Details';
            }
        });
    }
    
    // ----- CONTACT FORM VALIDATION -----
    function initContactForm() {
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check form validity
            if (!this.checkValidity()) {
                e.stopPropagation();
                this.classList.add('was-validated');
                return;
            }
            
            // Get form data
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validate required fields
            if (!name || !email || !message) {
                alert('Please fill in all required fields (Name, Email, and Message).');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Get current date and time
            const now = new Date();
            const timestamp = now.toLocaleString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
            });
            
            // Encode all values for URL
            const encodedSubject = encodeURIComponent(
                subject ? `Portfolio Contact: ${subject}` : 'Portfolio Website Contact'
            );
            
            const encodedBody = encodeURIComponent(
                `📧 New Contact Form Submission\n\n` +
                `=== Contact Details ===\n` +
                `Name: ${name}\n` +
                `Email: ${email}\n` +
                `Subject: ${subject || '(No subject provided)'}\n` +
                `Date: ${timestamp}\n\n` +
                `=== Message ===\n` +
                `${message}\n\n` +
                `---\n` +
                `This message was sent from your portfolio website contact form.\n` +
                `IP: ${getClientIP()}\n` +
                `Browser: ${navigator.userAgent}`
            );
            
            // Create mailto URL
            const mailtoUrl = `mailto:high.dee.dev@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
            
            // Log for debugging
            console.log('Mailto URL created:', mailtoUrl.substring(0, 200) + '...');
            console.log('Form data:', { name, email, subject, message, timestamp });
            
            // Store form data in localStorage in case mail client doesn't work
            try {
                localStorage.setItem('lastContactFormData', JSON.stringify({
                    name,
                    email,
                    subject,
                    message,
                    timestamp: now.toISOString()
                }));
            } catch (error) {
                console.warn('Could not save form data to localStorage:', error);
            }
            
            // Open mail client
            window.location.href = mailtoUrl;
            
            // Show success message after a short delay
            setTimeout(() => {
                // Hide form, show success message
                contactForm.classList.add('d-none');
                formSuccess.classList.remove('d-none');
                
                // Reset form after 8 seconds (gives user time to send email)
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.classList.remove('was-validated', 'd-none');
                    formSuccess.classList.add('d-none');
                }, 8000);
            }, 1000);
            
            // Track form submission
            trackFormSubmission(name, email, subject);
        });
    }

    // ----- HELPER FUNCTION TO GET CLIENT IP (FALLBACK) -----
    async function getClientIP() {
        try {
            // Try to get IP from a public API
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip || 'Unknown';
        } catch (error) {
            // Fallback to local IP detection
            return new Promise((resolve) => {
                // Use WebRTC to get local IP (not public IP)
                const RTCPeerConnection = window.RTCPeerConnection || 
                                        window.mozRTCPeerConnection || 
                                        window.webkitRTCPeerConnection;
                
                if (!RTCPeerConnection) {
                    resolve('IP detection not available');
                    return;
                }
                
                const pc = new RTCPeerConnection({ iceServers: [] });
                pc.createDataChannel('');
                pc.createOffer()
                    .then(offer => pc.setLocalDescription(offer))
                    .catch(() => resolve('IP detection failed'));
                
                pc.onicecandidate = (ice) => {
                    if (!ice || !ice.candidate || !ice.candidate.candidate) {
                        resolve('Local IP only');
                        return;
                    }
                    
                    const candidate = ice.candidate.candidate;
                    const match = candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3})/);
                    if (match && match[1]) {
                        resolve(match[1]);
                    } else {
                        resolve('IP not found in candidate');
                    }
                    pc.close();
                };
                
                // Timeout after 2 seconds
                setTimeout(() => {
                    pc.close();
                    resolve('IP detection timeout');
                }, 2000);
            });
        }
    }

    // ----- TRACK FORM SUBMISSION -----
    function trackFormSubmission(name, email, subject) {
        // Store submission in localStorage for analytics
        try {
            const submissions = JSON.parse(localStorage.getItem('contactFormSubmissions') || '[]');
            
            submissions.push({
                name,
                email: email.substring(0, 3) + '***' + email.substring(email.indexOf('@')), // Partial email
                subject,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent.substring(0, 100)
            });
            
            // Keep only last 50 submissions
            if (submissions.length > 50) {
                submissions.shift();
            }
            
            localStorage.setItem('contactFormSubmissions', JSON.stringify(submissions));
            
            console.log(`Form submission tracked. Total submissions: ${submissions.length}`);
        } catch (error) {
            console.warn('Could not track form submission:', error);
        }
    }

    // ----- FORM AUTOSAVE DRAFT -----
    function initFormAutosave() {
        if (!contactForm) return;
        
        // Load saved draft
        try {
            const draft = JSON.parse(localStorage.getItem('contactFormDraft') || '{}');
            
            if (draft.name) document.getElementById('name').value = draft.name;
            if (draft.email) document.getElementById('email').value = draft.email;
            if (draft.subject) document.getElementById('subject').value = draft.subject;
            if (draft.message) document.getElementById('message').value = draft.message;
            
            if (draft.name || draft.email || draft.subject || draft.message) {
                console.log('Loaded draft from localStorage');
            }
        } catch (error) {
            console.warn('Could not load form draft:', error);
        }
        
        // Save draft on input
        const saveDraft = debounce(() => {
            const draft = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                savedAt: new Date().toISOString()
            };
            
            try {
                localStorage.setItem('contactFormDraft', JSON.stringify(draft));
            } catch (error) {
                console.warn('Could not save form draft:', error);
            }
        }, 1000);
        
        // Add event listeners for autosave
        ['name', 'email', 'subject', 'message'].forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('input', saveDraft);
                field.addEventListener('change', saveDraft);
            }
        });
        
        // Clear draft on successful submission
        contactForm.addEventListener('submit', () => {
            setTimeout(() => {
                try {
                    localStorage.removeItem('contactFormDraft');
                    console.log('Cleared form draft after submission');
                } catch (error) {
                    console.warn('Could not clear form draft:', error);
                }
            }, 2000);
        });
    }

    // ----- DEBOUNCE HELPER FUNCTION -----
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

    // ----- ENHANCED FORM VALIDATION -----
    function enhanceFormValidation() {
        if (!contactForm) return;
        
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const messageField = document.getElementById('message');
        
        // Real-time validation feedback
        if (nameField) {
            nameField.addEventListener('blur', function() {
                if (this.value.trim().length < 2) {
                    this.classList.add('is-invalid');
                    this.nextElementSibling.textContent = 'Name must be at least 2 characters';
                } else {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                }
            });
        }
        
        if (emailField) {
            emailField.addEventListener('blur', function() {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.value.trim())) {
                    this.classList.add('is-invalid');
                    this.nextElementSibling.textContent = 'Please enter a valid email address';
                } else {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                }
            });
        }
        
        if (messageField) {
            messageField.addEventListener('blur', function() {
                if (this.value.trim().length < 10) {
                    this.classList.add('is-invalid');
                    this.nextElementSibling.textContent = 'Message must be at least 10 characters';
                } else {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                }
            });
        }
        
        // Clear validation on input
        [nameField, emailField, messageField].forEach(field => {
            if (field) {
                field.addEventListener('input', function() {
                    this.classList.remove('is-invalid', 'is-valid');
                });
            }
        });
    }
    
    // ----- SKILLS ANIMATION ON SCROLL -----
    function initSkillsAnimation() {
        // Skip if user prefers reduced motion
        if (mediaQuery.matches) {
            skillItems.forEach(item => {
                const progressBar = item.querySelector('.skill-progress');
                const width = progressBar.style.width;
                progressBar.style.width = width; // Set width immediately
            });
            
            if (progressTrail) {
                progressTrail.style.width = '100%';
            }
            return;
        }
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };
        
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate skill bars
                    skillItems.forEach(item => {
                        const progressBar = item.querySelector('.skill-progress');
                        const width = progressBar.style.width;
                        progressBar.style.width = '0';
                        
                        setTimeout(() => {
                            progressBar.style.width = width;
                        }, 200);
                    });
                    
                    // Animate progress trail
                    if (progressTrail) {
                        progressTrail.style.width = '0';
                        
                        setTimeout(() => {
                            progressTrail.style.width = '100%';
                        }, 500);
                    }
                    
                    // Stop observing after animation
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            skillsObserver.observe(skillsSection);
        }
    }
    
    // ----- LAZY LOADING FOR IMAGES -----
    function initLazyLoading() {
        // Use IntersectionObserver for lazy loading
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        // Load the image
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.1
            });
            
            // Observe all project images
            document.querySelectorAll('.project-img').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    // ----- SCROLL ANIMATIONS -----
    function initScrollAnimations() {
        // Skip if user prefers reduced motion
        if (mediaQuery.matches) return;
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('animate-fade-up')) {
                        entry.target.style.animation = 'fadeUp 0.8s ease forwards';
                    } else if (entry.target.classList.contains('animate-fade-left')) {
                        entry.target.style.animation = 'fadeLeft 0.8s ease forwards';
                    }
                }
            });
        }, observerOptions);
        
        // Observe elements with animation classes
        document.querySelectorAll('.animate-fade-up, .animate-fade-left').forEach(el => {
            fadeObserver.observe(el);
        });
    }
    
    // ----- KEYBOARD NAVIGATION -----
    function initKeyboardNavigation() {
        document.addEventListener('keydown', function(e) {
            // Tab key navigation focus styling
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
            
            // Escape key closes open project details
            if (e.key === 'Escape') {
                document.querySelectorAll('.project-full-details.active').forEach(details => {
                    details.classList.remove('active');
                    const toggleButton = details.closest('.project-card').querySelector('.project-toggle');
                    if (toggleButton) {
                        toggleButton.innerHTML = '<i class="fas fa-plus me-1"></i> View Details';
                    }
                });
            }
        });
        
        document.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-navigation');
        });
    }
    
    // ----- INITIALIZATION -----
    async function init() {
        // Set up initial scroll handlers
        handleNavbarScroll();
        handleBackToTop();
        
        // Load projects from JSON file
        const projects = await loadProjectsFromJSON();
        
        // Render projects
        renderProjects(projects);
        
        // Initialize all components
        initSmoothScroll();
        initContactForm();
        initFormAutosave(); // Add this
        enhanceFormValidation(); // Add this
        initSkillsAnimation();
        initLazyLoading();
        initScrollAnimations();
        initKeyboardNavigation();
        
        // Add scroll event listeners
        window.addEventListener('scroll', function() {
            handleNavbarScroll();
            handleBackToTop();
            updateActiveNavLink();
        });
        
        // Initial update of active nav link
        updateActiveNavLink();
        
        // Log initialization (for debugging)
        console.log(`Portfolio website initialized with ${projects.length} projects.`);
    }
    
    // ----- START EVERYTHING -----
    init();
});