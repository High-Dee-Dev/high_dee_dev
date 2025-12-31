/**
 * Thoughtful Reads - Main JavaScript File
 * 
 * This file contains all the core functionality for the blog template.
 * Features include:
 * - Dynamic content loading from JSON
 * - Newsletter form handling
 * - Image lazy loading
 * - Mobile navigation enhancements
 * - Search functionality
 * 
 * @version 1.0.0
 * @license MIT
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Thoughtful Reads template initialized');
    
    // Initialize all modules
    initDynamicContent();
    initNewsletterForms();
    initImageLazyLoading();
    initMobileNavigation();
    initSearchFunctionality();
    initScrollProgress();
});

/**
 * Initialize dynamic content loading from posts.json
 */
function initDynamicContent() {
    // Check if we're on a page that needs dynamic content
    if (document.getElementById('featured-posts-container') || 
        document.getElementById('latest-posts-container') ||
        document.getElementById('popular-posts-container') ||
        document.getElementById('category-posts-container') ||
        document.getElementById('recommended-posts-container')) {
        
        loadPostsData()
            .then(posts => {
                // Distribute posts to different sections based on page
                distributePosts(posts);
            })
            .catch(error => {
                console.error('Error loading posts data:', error);
                showFallbackContent();
            });
    }
}

/**
 * Load posts data from JSON file
 * @returns {Promise<Array>} Array of post objects
 */
async function loadPostsData() {
    try {
        const response = await fetch('demo-data/posts.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.posts;
    } catch (error) {
        console.error('Failed to load posts data:', error);
        // Return fallback data if JSON file is not available
        return getFallbackPosts();
    }
}

/**
 * Distribute posts to different page sections
 * @param {Array} posts - Array of post objects
 */
function distributePosts(posts) {
    // Featured posts (homepage)
    const featuredContainer = document.getElementById('featured-posts-container');
    if (featuredContainer) {
        const featuredPosts = posts.filter(post => post.featured).slice(0, 3);
        renderFeaturedPosts(featuredPosts, featuredContainer);
    }
    
    // Latest posts (homepage)
    const latestContainer = document.getElementById('latest-posts-container');
    if (latestContainer) {
        const latestPosts = posts.slice(0, 6); // Get 6 most recent
        renderLatestPosts(latestPosts, latestContainer);
    }
    
    // Popular posts (sidebar)
    const popularContainer = document.getElementById('popular-posts-container');
    if (popularContainer) {
        const popularPosts = posts.filter(post => post.views > 1000).slice(0, 5);
        renderPopularPosts(popularPosts, popularContainer);
    }
    
    // Category posts (category page)
    const categoryContainer = document.getElementById('category-posts-container');
    if (categoryContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('cat') || 'productivity';
        const categoryPosts = posts.filter(post => 
            post.categories.map(cat => cat.toLowerCase()).includes(category.toLowerCase())
        );
        renderCategoryPosts(categoryPosts, categoryContainer);
    }
    
    // Recommended posts (article page)
    const recommendedContainer = document.getElementById('recommended-posts-container');
    if (recommendedContainer) {
        const currentPostTitle = document.querySelector('.article-title')?.textContent;
        const recommendedPosts = posts
            .filter(post => post.title !== currentPostTitle)
            .slice(0, 3);
        renderRecommendedPosts(recommendedPosts, recommendedContainer);
    }
    
    // Popular category posts (category page sidebar)
    const popularCategoryContainer = document.getElementById('popular-category-posts-container');
    if (popularCategoryContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('cat') || 'productivity';
        const popularCategoryPosts = posts
            .filter(post => 
                post.categories.map(cat => cat.toLowerCase()).includes(category.toLowerCase()) && 
                post.views > 500
            )
            .slice(0, 5);
        renderPopularCategoryPosts(popularCategoryPosts, popularCategoryContainer);
    }
}

/**
 * Render featured posts in a grid layout
 * @param {Array} posts - Featured post objects
 * @param {HTMLElement} container - DOM element to render into
 */
function renderFeaturedPosts(posts, container) {
    if (!posts.length) {
        container.innerHTML = '<div class="col-12 text-center"><p>No featured posts available.</p></div>';
        return;
    }
    
    const postsHTML = posts.map((post, index) => {
        const isLarge = index === 0; // First post gets larger layout
        return `
            <div class="col-md-${isLarge ? '12' : '6'} mb-4">
                <article class="article-card featured h-100">
                    <div class="card-img-container position-relative">
                        <img src="${post.image}" 
                             alt="${post.imageAlt || post.title}"
                             class="card-img-top loading"
                             loading="lazy"
                             onload="this.classList.add('loaded')">
                        <span class="category-badge badge bg-primary position-absolute">${post.categories[0]}</span>
                    </div>
                    <div class="card-body">
                        <h3 class="card-title">
                            <a href="post.html" class="text-decoration-none">${post.title}</a>
                        </h3>
                        <p class="card-text">${post.excerpt}</p>
                    </div>
                    <div class="card-footer bg-transparent">
                        <div class="article-meta d-flex justify-content-between align-items-center">
                            <div class="meta-item">
                                <i class="fas fa-user me-1" aria-hidden="true"></i>
                                ${post.author}
                            </div>
                            <div class="meta-item">
                                <i class="fas fa-clock me-1" aria-hidden="true"></i>
                                ${post.readTime}
                            </div>
                            <div class="meta-item">
                                <i class="fas fa-calendar me-1" aria-hidden="true"></i>
                                ${formatDate(post.publishDate)}
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        `;
    }).join('');
    
    container.innerHTML = postsHTML;
}

/**
 * Render latest posts in a grid layout
 * @param {Array} posts - Latest post objects
 * @param {HTMLElement} container - DOM element to render into
 */
function renderLatestPosts(posts, container) {
    if (!posts.length) {
        container.innerHTML = '<div class="col-12 text-center"><p>No posts available.</p></div>';
        return;
    }
    
    const postsHTML = posts.map(post => {
        return `
            <div class="col-md-6 col-lg-4">
                <article class="article-card h-100">
                    <div class="card-img-container position-relative">
                        <img src="${post.image}" 
                             alt="${post.imageAlt || post.title}"
                             class="card-img-top loading"
                             loading="lazy"
                             onload="this.classList.add('loaded')">
                        <span class="category-badge badge bg-primary position-absolute">${post.categories[0]}</span>
                    </div>
                    <div class="card-body">
                        <h3 class="card-title">
                            <a href="post.html" class="text-decoration-none">${post.title}</a>
                        </h3>
                        <p class="card-text">${post.excerpt}</p>
                    </div>
                    <div class="card-footer bg-transparent">
                        <div class="article-meta d-flex justify-content-between align-items-center">
                            <div class="meta-item">
                                <i class="fas fa-clock me-1" aria-hidden="true"></i>
                                ${post.readTime}
                            </div>
                            <div class="meta-item">
                                <i class="fas fa-calendar me-1" aria-hidden="true"></i>
                                ${formatDate(post.publishDate)}
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        `;
    }).join('');
    
    container.innerHTML = postsHTML;
}

/**
 * Render popular posts in a list layout
 * @param {Array} posts - Popular post objects
 * @param {HTMLElement} container - DOM element to render into
 */
function renderPopularPosts(posts, container) {
    if (!posts.length) {
        container.innerHTML = '<div class="text-center p-3"><p>No popular posts available.</p></div>';
        return;
    }
    
    const postsHTML = posts.map(post => {
        return `
            <div class="list-group-item">
                <a href="post.html" class="popular-post text-decoration-none">
                    <img src="${post.image}" 
                         alt="${post.imageAlt || post.title}"
                         class="popular-post-image loading"
                         loading="lazy"
                         onload="this.classList.add('loaded')">
                    <div class="popular-post-content">
                        <div class="popular-post-title">${post.title}</div>
                        <div class="popular-post-meta">
                            <i class="fas fa-eye me-1" aria-hidden="true"></i>
                            ${formatViews(post.views)} views
                        </div>
                    </div>
                </a>
            </div>
        `;
    }).join('');
    
    container.innerHTML = postsHTML;
}

/**
 * Render category posts
 * @param {Array} posts - Category post objects
 * @param {HTMLElement} container - DOM element to render into
 */
function renderCategoryPosts(posts, container) {
    if (!posts.length) {
        container.innerHTML = '<div class="col-12 text-center py-5"><p>No posts found in this category.</p></div>';
        return;
    }
    
    const postsHTML = posts.map(post => {
        return `
            <div class="col-md-6">
                <article class="article-card h-100">
                    <div class="card-img-container position-relative">
                        <img src="${post.image}" 
                             alt="${post.imageAlt || post.title}"
                             class="card-img-top loading"
                             loading="lazy"
                             onload="this.classList.add('loaded')">
                        <span class="category-badge badge bg-primary position-absolute">${post.categories[0]}</span>
                    </div>
                    <div class="card-body">
                        <h3 class="card-title">
                            <a href="post.html" class="text-decoration-none">${post.title}</a>
                        </h3>
                        <p class="card-text">${post.excerpt}</p>
                    </div>
                    <div class="card-footer bg-transparent">
                        <div class="article-meta d-flex justify-content-between align-items-center">
                            <div class="meta-item">
                                <i class="fas fa-user me-1" aria-hidden="true"></i>
                                ${post.author}
                            </div>
                            <div class="meta-item">
                                <i class="fas fa-clock me-1" aria-hidden="true"></i>
                                ${post.readTime}
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        `;
    }).join('');
    
    container.innerHTML = postsHTML;
}

/**
 * Render recommended posts
 * @param {Array} posts - Recommended post objects
 * @param {HTMLElement} container - DOM element to render into
 */
function renderRecommendedPosts(posts, container) {
    if (!posts.length) {
        container.innerHTML = '<div class="col-12 text-center"><p>No recommended posts available.</p></div>';
        return;
    }
    
    const postsHTML = posts.map(post => {
        return `
            <div class="col-md-4">
                <article class="article-card h-100">
                    <div class="card-img-container position-relative">
                        <img src="${post.image}" 
                             alt="${post.imageAlt || post.title}"
                             class="card-img-top loading"
                             loading="lazy"
                             onload="this.classList.add('loaded')">
                        <span class="category-badge badge bg-primary position-absolute">${post.categories[0]}</span>
                    </div>
                    <div class="card-body">
                        <h3 class="card-title">
                            <a href="post.html" class="text-decoration-none">${post.title}</a>
                        </h3>
                        <p class="card-text">${post.excerpt}</p>
                    </div>
                </article>
            </div>
        `;
    }).join('');
    
    container.innerHTML = postsHTML;
}

/**
 * Render popular category posts
 * @param {Array} posts - Popular category post objects
 * @param {HTMLElement} container - DOM element to render into
 */
function renderPopularCategoryPosts(posts, container) {
    if (!posts.length) {
        container.innerHTML = '<div class="text-center p-3"><p>No popular posts in this category.</p></div>';
        return;
    }
    
    const postsHTML = posts.map(post => {
        return `
            <div class="list-group-item">
                <a href="post.html" class="popular-post text-decoration-none">
                    <img src="${post.image}" 
                         alt="${post.imageAlt || post.title}"
                         class="popular-post-image loading"
                         loading="lazy"
                         onload="this.classList.add('loaded')">
                    <div class="popular-post-content">
                        <div class="popular-post-title">${post.title}</div>
                        <div class="popular-post-meta">
                            <i class="fas fa-eye me-1" aria-hidden="true"></i>
                            ${formatViews(post.views)} views
                        </div>
                    </div>
                </a>
            </div>
        `;
    }).join('');
    
    container.innerHTML = postsHTML;
}

/**
 * Initialize newsletter form handling
 */
function initNewsletterForms() {
    const forms = document.querySelectorAll('.newsletter-form, .newsletter-cta-form, .newsletter-modal-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!isValidEmail(email)) {
                showFormMessage(this, 'Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Subscribing...';
            submitButton.disabled = true;
            
            // In a real implementation, you would send this to your server
            setTimeout(() => {
                showFormMessage(this, 'Thank you for subscribing! Please check your email to confirm.', 'success');
                this.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Close modal if this is a modal form
                const modal = this.closest('.modal');
                if (modal) {
                    const bootstrapModal = bootstrap.Modal.getInstance(modal);
                    if (bootstrapModal) {
                        setTimeout(() => bootstrapModal.hide(), 2000);
                    }
                }
            }, 1500);
        });
    });
}

/**
 * Initialize image lazy loading with Intersection Observer
 */
function initImageLazyLoading() {
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
        // Fallback: load all images immediately
        const images = document.querySelectorAll('img.loading');
        images.forEach(img => {
            img.classList.add('loaded');
        });
        return;
    }
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                
                // Stop observing once loaded
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });
    
    // Observe all images with loading class
    const images = document.querySelectorAll('img.loading');
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * Initialize mobile navigation enhancements
 */
function initMobileNavigation() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // Close mobile menu when clicking on a link
        const navLinks = navbarCollapse.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse && window.innerWidth < 992) {
                    bsCollapse.hide();
                }
            });
        });
        
        // Add smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

/**
 * Initialize search functionality
 */
function initSearchFunctionality() {
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');
    
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const query = searchInput.value.trim();
            if (query.length < 2) {
                showFormMessage(this, 'Please enter at least 2 characters to search.', 'error');
                return;
            }
            
            // In a real implementation, you would redirect to search results page
            // For demo purposes, we'll just show an alert
            alert(`Search functionality would show results for: "${query}"\n\nIn a production environment, this would connect to your search backend.`);
        });
    }
}

/**
 * Initialize scroll progress indicator
 */
function initScrollProgress() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--primary-color);
        z-index: 1030;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    window.addEventListener('scroll', () => {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

/**
 * Show form message (success/error)
 * @param {HTMLElement} form - The form element
 * @param {string} message - Message to display
 * @param {string} type - Message type ('success' or 'error')
 */
function showFormMessage(form, message, type = 'success') {
    // Remove existing messages
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message alert alert-${type === 'error' ? 'danger' : 'success'} mt-3`;
    messageEl.textContent = message;
    messageEl.setAttribute('role', 'alert');
    
    // Insert after the form or before submit button
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.parentNode.insertBefore(messageEl, submitButton);
    } else {
        form.appendChild(messageEl);
    }
    
    // Auto-remove success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageEl.remove();
        }, 5000);
    }
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Format date to readable string
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

/**
 * Format view count to readable string
 * @param {number} views - Number of views
 * @returns {string} Formatted view count
 */
function formatViews(views) {
    if (views >= 1000000) {
        return (views / 1000000).toFixed(1) + 'M';
    } else if (views >= 1000) {
        return (views / 1000).toFixed(1) + 'K';
    }
    return views.toString();
}

/**
 * Fallback posts data if JSON file fails to load
 * @returns {Array} Array of fallback post objects
 */
function getFallbackPosts() {
    return [
        {
            "id": 1,
            "title": "The Art of Mindful Productivity",
            "excerpt": "Discover how to achieve more by doing less with our comprehensive guide to intentional work habits.",
            "image": "assets/img/post5.jpg",
            "imageAlt": "Minimalist workspace with laptop and notebook",
            "author": "Sarah Johnson",
            "publishDate": "2025-01-15",
            "readTime": "8 min read",
            "categories": ["Productivity", "Lifestyle"],
            "featured": true,
            "views": 2500
        },
        {
            "id": 2,
            "title": "Sustainable Living Made Simple",
            "excerpt": "Practical tips for reducing your environmental impact without sacrificing comfort or convenience.",
            "image": "assets/img/post3.jpg",
            "imageAlt": "Person holding reusable shopping bags",
            "author": "Michael Chen",
            "publishDate": "2025-01-12",
            "readTime": "6 min read",
            "categories": ["Lifestyle", "Environment"],
            "featured": true,
            "views": 1800
        }
    ];
}

/**
 * Show fallback content when data loading fails
 */
function showFallbackContent() {
    const containers = [
        'featured-posts-container',
        'latest-posts-container',
        'popular-posts-container',
        'category-posts-container',
        'recommended-posts-container'
    ];
    
    containers.forEach(containerId => {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fas fa-exclamation-triangle text-warning display-4 mb-3" aria-hidden="true"></i>
                    <h3>Content Temporarily Unavailable</h3>
                    <p class="text-muted">We're having trouble loading the content. Please check back soon.</p>
                    <button class="btn btn-primary" onclick="location.reload()">
                        <i class="fas fa-redo me-2" aria-hidden="true"></i>Try Again
                    </button>
                </div>
            `;
        }
    });
}

// Export functions for use in other modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isValidEmail,
        formatDate,
        formatViews
    };
}
