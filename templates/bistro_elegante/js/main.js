/**
 * Bistro Elegante - Main JavaScript File
 * Contains all interactive functionality for the restaurant website
 * TODO: Update analytics tracking IDs and reservation system integration
 */

// Global configuration
const CONFIG = window.siteConfig || {};

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    initOffcanvasNav();
    initReservationModal();
    initMenuFilters();
    lazyLoadImages();
    initNewsletterModal();
    
    // Initialize cart if on order page
    if (document.getElementById('cartItems')) {
        initCart();
    }
    
    console.log('Bistro Elegante website initialized');
});

/**
 * Offcanvas navigation with focus trapping
 */
function initOffcanvasNav() {
    const offcanvas = document.getElementById('offcanvasNavbar');
    if (!offcanvas) return;
    
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    let firstFocusableElement, lastFocusableElement;
    
    offcanvas.addEventListener('show.bs.offcanvas', function() {
        const focusableContent = offcanvas.querySelectorAll(focusableElements);
        firstFocusableElement = focusableContent[0];
        lastFocusableElement = focusableContent[focusableContent.length - 1];
        
        // Trap focus within offcanvas
        document.addEventListener('keydown', trapFocus);
    });
    
    offcanvas.addEventListener('hidden.bs.offcanvas', function() {
        document.removeEventListener('keydown', trapFocus);
    });
    
    function trapFocus(e) {
        if (e.key !== 'Tab') return;
        
        if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                e.preventDefault();
                lastFocusableElement.focus();
            }
        } else {
            if (document.activeElement === lastFocusableElement) {
                e.preventDefault();
                firstFocusableElement.focus();
            }
        }
    }
}

/**
 * Reservation modal with availability simulation
 */
function initReservationModal() {
    const modal = document.getElementById('reservationModal');
    if (!modal) return;
    
    // Initialize time slots
    populateTimeSlots();
    
    // Form submission
    const form = document.getElementById('reservationForm');
    if (form) {
        form.addEventListener('submit', handleReservationSubmit);
    }
    
    // Date validation - prevent past dates
    const dateInput = document.getElementById('reservationDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        
        dateInput.addEventListener('change', function() {
            populateTimeSlots();
        });
    }
}

/**
 * Populate available time slots based on selected date
 */
function populateTimeSlots() {
    const timeSelect = document.getElementById('reservationTime');
    const dateInput = document.getElementById('reservationDate');
    
    if (!timeSelect || !dateInput) return;
    
    // Clear existing options except the first
    while (timeSelect.options.length > 1) {
        timeSelect.remove(1);
    }
    
    const selectedDate = new Date(dateInput.value);
    const today = new Date();
    
    // Only populate times if a valid future date is selected
    if (selectedDate <= today && dateInput.value !== '') return;
    
    // Simulate available time slots (in a real app, this would come from your booking system)
    const timeSlots = generateAvailableTimeSlots(selectedDate);
    
    timeSlots.forEach(time => {
        const option = document.createElement('option');
        option.value = time;
        option.textContent = time;
        timeSelect.appendChild(option);
    });
}

/**
 * Generate simulated available time slots
 */
function generateAvailableTimeSlots(date) {
    const slots = [];
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const startHour = isWeekend ? 17 : 17; // 5 PM
    const endHour = isWeekend ? 22 : 21;   // 10 PM weekend, 9 PM weekdays
    
    // Simulate some random unavailable slots for realism
    const unavailableSlots = isWeekend ? 
        ['17:30', '19:00', '20:30'] : 
        ['18:00', '19:30'];
    
    for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            
            if (!unavailableSlots.includes(timeString)) {
                slots.push(timeString);
            }
        }
    }
    
    return slots;
}

/**
 * Handle reservation form submission
 */
function handleReservationSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Basic validation
    if (!validateForm(form)) {
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Booking...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // In a real application, this would be an API call to your reservation system
        console.log('Reservation data:', Object.fromEntries(formData));
        
        // Show success message
        showNotification('Reservation request submitted! We will confirm via email shortly.', 'success');
        
        // Track conversion
        trackEvent('Reservations', 'Booking Submitted', 'Modal');
        
        // Reset form and close modal
        form.reset();
        const modal = bootstrap.Modal.getInstance(document.getElementById('reservationModal'));
        modal.hide();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

/**
 * Initialize menu filtering and sorting
 */
function initMenuFilters() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const sortSelect = document.getElementById('sortMenu');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter menu items
            filterMenuItems(filter);
        });
    });
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortMenuItems(this.value);
        });
    }
}

/**
 * Filter menu items by dietary tags
 */
function filterMenuItems(filter) {
    const menuItems = document.querySelectorAll('.menu-card');
    
    menuItems.forEach(item => {
        if (filter === 'all') {
            item.style.display = 'block';
        } else {
            const tags = item.getAttribute('data-tags') || '';
            if (tags.includes(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        }
    });
}

/**
 * Sort menu items by price or name
 */
function sortMenuItems(sortBy) {
    const container = document.querySelector('.row.g-4');
    if (!container) return;
    
    const items = Array.from(container.children);
    
    items.sort((a, b) => {
        if (sortBy === 'price-low') {
            const priceA = parseFloat(a.querySelector('.price').textContent.replace('$', ''));
            const priceB = parseFloat(b.querySelector('.price').textContent.replace('$', ''));
            return priceA - priceB;
        } else if (sortBy === 'price-high') {
            const priceA = parseFloat(a.querySelector('.price').textContent.replace('$', ''));
            const priceB = parseFloat(b.querySelector('.price').textContent.replace('$', ''));
            return priceB - priceA;
        } else {
            const nameA = a.querySelector('.card-title').textContent.toLowerCase();
            const nameB = b.querySelector('.card-title').textContent.toLowerCase();
            return nameA.localeCompare(nameB);
        }
    });
    
    // Re-append sorted items
    items.forEach(item => container.appendChild(item));
}

/**
 * Shopping Cart functionality
 */
const Cart = {
    items: [],
    
    init() {
        this.load();
        this.updateUI();
    },
    
    add(item) {
        const existingItem = this.items.find(i => i.id === item.id);
        
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            this.items.push({ ...item });
        }
        
        this.save();
        this.updateUI();
        trackEvent('Cart', 'Item Added', item.name);
    },
    
    update(id, quantity) {
        const item = this.items.find(i => i.id === id);
        
        if (item) {
            if (quantity <= 0) {
                this.remove(id);
            } else {
                item.quantity = quantity;
                this.save();
                this.updateUI();
            }
        }
    },
    
    remove(id) {
        this.items = this.items.filter(i => i.id !== id);
        this.save();
        this.updateUI();
        trackEvent('Cart', 'Item Removed', id);
    },
    
    clear() {
        this.items = [];
        this.save();
        this.updateUI();
    },
    
    getTotals() {
        const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.085; // 8.5% tax
        const deliveryFee = document.getElementById('delivery')?.checked ? 5.99 : 0;
        const total = subtotal + tax + deliveryFee;
        
        return {
            subtotal: subtotal.toFixed(2),
            tax: tax.toFixed(2),
            deliveryFee: deliveryFee.toFixed(2),
            total: total.toFixed(2)
        };
    },
    
    save() {
        localStorage.setItem('bistroCart', JSON.stringify(this.items));
    },
    
    load() {
        const saved = localStorage.getItem('bistroCart');
        if (saved) {
            this.items = JSON.parse(saved);
        }
    },
    
    updateUI() {
        // Update cart count in header
        const cartCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElements = document.querySelectorAll('#cartCount');
        cartCountElements.forEach(el => {
            el.textContent = cartCount;
        });
        
        // Update cart sidebar if exists
        this.updateCartSidebar();
    },
    
    updateCartSidebar() {
        const cartItemsContainer = document.getElementById('cartItems');
        const emptyCartMessage = document.getElementById('emptyCartMessage');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        if (!cartItemsContainer) return;
        
        if (this.items.length === 0) {
            emptyCartMessage.style.display = 'block';
            cartItemsContainer.innerHTML = '';
            cartItemsContainer.appendChild(emptyCartMessage);
            if (checkoutBtn) checkoutBtn.disabled = true;
            return;
        }
        
        emptyCartMessage.style.display = 'none';
        
        let cartHTML = '';
        this.items.forEach(item => {
            cartHTML += `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <h6 class="mb-1">${item.name}</h6>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="text-brand">$${item.price}</span>
                            <div class="cart-item-controls">
                                <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                                <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                                <button class="quantity-btn increase" data-id="${item.id}">+</button>
                                <button class="btn btn-sm btn-outline-danger ms-2 remove-item" data-id="${item.id}">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        cartItemsContainer.innerHTML = cartHTML;
        
        // Add event listeners to cart controls
        this.bindCartEvents();
        this.updateCartTotals();
        
        if (checkoutBtn) checkoutBtn.disabled = false;
    },
    
    bindCartEvents() {
        // Quantity decrease
        document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const item = this.items.find(i => i.id === id);
                if (item) {
                    this.update(id, item.quantity - 1);
                }
            });
        });
        
        // Quantity increase
        document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const item = this.items.find(i => i.id === id);
                if (item) {
                    this.update(id, item.quantity + 1);
                }
            });
        });
        
        // Quantity input change
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const id = e.target.getAttribute('data-id');
                const quantity = parseInt(e.target.value);
                if (quantity > 0) {
                    this.update(id, quantity);
                }
            });
        });
        
        // Remove item
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.closest('.remove-item').getAttribute('data-id');
                this.remove(id);
            });
        });
    },
    
    updateCartTotals() {
        const totals = this.getTotals();
        
        document.getElementById('cartSubtotal').textContent = `$${totals.subtotal}`;
        document.getElementById('cartTax').textContent = `$${totals.tax}`;
        document.getElementById('deliveryFee').textContent = `$${totals.deliveryFee}`;
        document.getElementById('cartTotal').textContent = `$${totals.total}`;
    }
};

/**
 * Initialize cart
 */
function initCart() {
    Cart.init();
}

/**
 * Open lightbox with image
 */
function openLightbox(src, alt) {
    // Create lightbox if it doesn't exist
    let lightbox = document.getElementById('lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
                <button class="lightbox-nav lightbox-prev" aria-label="Previous image">‹</button>
                <img src="" alt="" class="lightbox-image">
                <button class="lightbox-nav lightbox-next" aria-label="Next image">›</button>
                <div class="lightbox-caption"></div>
            </div>
        `;
        document.body.appendChild(lightbox);
        
        // Add event listeners
        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightbox.querySelector('.lightbox-prev').addEventListener('click', () => navigateLightbox(-1));
        lightbox.querySelector('.lightbox-next').addEventListener('click', () => navigateLightbox(1));
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }
    
    // Set image and show
    lightbox.querySelector('.lightbox-image').src = src;
    lightbox.querySelector('.lightbox-caption').textContent = alt;
    lightbox.style.display = 'block';
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    trackEvent('Gallery', 'Image Opened', alt);
}

/**
 * Close lightbox
 */
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }
}

/**
 * Navigate between images in lightbox
 */
function navigateLightbox(direction) {
    // This would need to be implemented based on your gallery structure
    console.log('Navigate lightbox:', direction);
}

/**
 * Lazy load images using Intersection Observer
 */
function lazyLoadImages() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

/**
 * Newsletter modal (exit-intent or delayed)
 */
function initNewsletterModal() {
    // Show modal on exit intent
    document.addEventListener('mouseout', (e) => {
        if (e.relatedTarget === null && e.clientY < 50) {
            showNewsletterModal();
        }
    });
    
    // Or show after delay
    setTimeout(() => {
        if (!localStorage.getItem('newsletterShown')) {
            showNewsletterModal();
        }
    }, 10000);
}

function showNewsletterModal() {
    // Check if modal already exists
    if (document.getElementById('newsletterModal')) return;
    
    const modalHTML = `
        <div class="modal fade" id="newsletterModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center p-4">
                        <i class="fas fa-envelope-open-text fa-3x text-brand mb-3"></i>
                        <h3>Join Our Newsletter</h3>
                        <p class="text-muted mb-4">Get 10% off your first reservation and be the first to know about special events and seasonal menus.</p>
                        <form id="newsletterForm">
                            <div class="mb-3">
                                <input type="email" class="form-control" placeholder="Your email address" required>
                            </div>
                            <button type="submit" class="btn btn-primary w-100 mb-2">Subscribe & Get 10% Off</button>
                            <small class="text-muted">We respect your privacy. Unsubscribe at any time.</small>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = new bootstrap.Modal(document.getElementById('newsletterModal'));
    modal.show();
    
    // Mark as shown
    localStorage.setItem('newsletterShown', 'true');
    
    // Form submission
    document.getElementById('newsletterForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Here you would typically send to your email service
        console.log('Newsletter signup:', email);
        trackEvent('Newsletter', 'Signup', 'Modal');
        
        showNotification('Thanks for subscribing! Check your email for your discount code.', 'success');
        modal.hide();
    });
}

/**
 * Generic form validation with accessible error messages
 */
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    // Clear previous errors
    form.querySelectorAll('.is-invalid').forEach(el => {
        el.classList.remove('is-invalid');
    });
    
    form.querySelectorAll('.invalid-feedback').forEach(el => {
        el.remove();
    });
    
    // Validate each required field
    inputs.forEach(input => {
        if (!input.value.trim()) {
            markFieldInvalid(input, 'This field is required');
            isValid = false;
        } else if (input.type === 'email' && !isValidEmail(input.value)) {
            markFieldInvalid(input, 'Please enter a valid email address');
            isValid = false;
        } else if (input.type === 'tel' && !isValidPhone(input.value)) {
            markFieldInvalid(input, 'Please enter a valid phone number');
            isValid = false;
        }
    });
    
    if (!isValid) {
        // Focus first invalid field
        const firstInvalid = form.querySelector('.is-invalid');
        if (firstInvalid) {
            firstInvalid.focus();
        }
        
        // Announce error to screen readers
        const liveRegion = document.getElementById('live-region') || createLiveRegion();
        liveRegion.textContent = 'Please check the form for errors';
    }
    
    return isValid;
}

function markFieldInvalid(field, message) {
    field.classList.add('is-invalid');
    
    const feedback = document.createElement('div');
    feedback.className = 'invalid-feedback';
    feedback.textContent = message;
    field.parentNode.appendChild(feedback);
}

function createLiveRegion() {
    const liveRegion = document.createElement('div');
    liveRegion.id = 'live-region';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
    return liveRegion;
}

/**
 * Utility functions
 */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1060;
        min-width: 300px;
    `;
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
}

/**
 * Analytics event tracking
 */
function trackEvent(category, action, label) {
    console.log('Event tracked:', { category, action, label });
    
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    
    // Google Analytics (legacy)
    if (typeof ga !== 'undefined') {
        ga('send', 'event', category, action, label);
    }
    
    // TODO: Add other analytics providers (Plausible, Fathom, etc.)
}

/**
 * Load menu items from project-data.json (example implementation)
 */
async function loadMenuItems() {
    try {
        // In a real implementation, this would fetch from project-data.json
        // const response = await fetch('project-data.json');
        // const data = await response.json();
        
        // For now, we'll use a simulated data structure
        const menuData = getSampleMenuData();
        
        // Populate menu categories
        populateMenuCategory('starters', menuData.starters);
        populateMenuCategory('mains', menuData.mains);
        populateMenuCategory('desserts', menuData.desserts);
        populateMenuCategory('drinks', menuData.drinks);
        
    } catch (error) {
        console.error('Error loading menu items:', error);
    }
}

function populateMenuCategory(categoryId, items) {
    const container = document.getElementById(`${categoryId}-items`);
    if (!container) return;
    
    let html = '';
    items.forEach(item => {
        html += `
            <div class="col-md-6 col-lg-4 col-xl-3">
                <div class="card menu-card h-100" data-tags="${item.tags.join(' ')}">
                    <img src="${item.image}" class="card-img-top" alt="${item.name}" loading="lazy">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h5 class="card-title">${item.name}</h5>
                            <span class="price">$${item.price}</span>
                        </div>
                        <p class="card-text">${item.description}</p>
                        <div class="tags">
                            ${item.tags.map(tag => `
                                <span class="badge bg-primary">
                                    <i class="${getTagIcon(tag)} me-1"></i>${getTagLabel(tag)}
                                </span>
                            `).join('')}
                        </div>
                        <div class="mt-3">
                            <a href="menu-item.html" class="btn btn-outline-primary me-2" style="font-size: .8rem !important;">View Details</a>
                            <button class="btn btn-primary btn-sm add-to-cart" style="font-size: .8rem !important;" data-item='${JSON.stringify(item)}'>
                                <i class="fas fa-plus me-1"></i>Add to Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    // Add event listeners to add-to-cart buttons
    container.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const item = JSON.parse(this.getAttribute('data-item'));
            Cart.add({ ...item, quantity: 1 });
            showNotification(`${item.name} added to cart!`, 'success');
        });
    });
}

// Similar functions for order page
async function loadOrderMenuItems() {
    // Implementation similar to loadMenuItems but for order page
    const menuData = getSampleMenuData();
    populateOrderCategory('order-starters', menuData.starters);
    populateOrderCategory('order-mains', menuData.mains);
    populateOrderCategory('order-desserts', menuData.desserts);
}

function populateOrderCategory(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let html = '';
    items.forEach(item => {
        html += `
            <div class="col-md-6 col-lg-4">
                <div class="card menu-card h-100">
                    <img src="${item.image}" class="card-img-top" alt="${item.name}" loading="lazy">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h5 class="card-title">${item.name}</h5>
                            <span class="price">$${item.price}</span>
                        </div>
                        <p class="card-text">${item.description}</p>
                        <div class="tags mb-3">
                            ${item.tags.map(tag => `
                                <span class="badge bg-primary">
                                    <i class="${getTagIcon(tag)} me-1"></i>${getTagLabel(tag)}
                                </span>
                            `).join('')}
                        </div>
                        <button class="btn btn-primary w-100 add-to-order" data-item='${JSON.stringify(item)}'>
                            <i class="fas fa-plus me-2"></i>Add to Order
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    // Add event listeners
    container.querySelectorAll('.add-to-order').forEach(btn => {
        btn.addEventListener('click', function() {
            const item = JSON.parse(this.getAttribute('data-item'));
            Cart.add({ ...item, quantity: 1 });
            showNotification(`${item.name} added to order!`, 'success');
            
            // Open cart offcanvas on mobile
            if (window.innerWidth < 992) {
                const offcanvas = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));
                offcanvas.show();
            }
        });
    });
}

// Load events for events page
async function loadEvents() {
    const eventsData = getSampleEventsData();
    const container = document.getElementById('eventsList');
    
    if (!container) return;
    
    let html = '';
    eventsData.forEach(event => {
        html += `
            <div class="col-md-6 col-lg-4">
                <div class="card event-card h-100">
                    <img src="${event.image}" class="card-img-top" alt="${event.title}" loading="lazy">
                    <div class="card-body">
                        <div class="event-date mb-2">
                            <i class="fas fa-calendar-alt me-2 text-primary"></i>
                            ${event.date}
                        </div>
                        <h5 class="card-title">${event.title}</h5>
                        <p class="card-text">${event.description}</p>
                        <div class="event-details">
                            <small class="text-muted">
                                <i class="fas fa-clock me-1"></i>${event.time}
                            </small>
                            <small class="text-muted ms-3">
                                <i class="fas fa-user me-1"></i>${event.capacity}
                            </small>
                        </div>
                    </div>
                    <div class="card-footer bg-transparent">
                        <button class="btn btn-outline-primary btn-sm me-2" data-bs-toggle="modal" data-bs-target="#reservationModal">
                            <i class="fas fa-ticket-alt me-1"></i>Reserve Spot
                        </button>
                        <span class="price">${event.price}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Helper functions for tags
function getTagIcon(tag) {
    const icons = {
        'vegetarian': 'fas fa-leaf',
        'vegan': 'fas fa-seedling',
        'gluten-free': 'fas fa-bread-slice',
        'spicy': 'fas fa-pepper-hot',
        'healthy': 'fas fa-apple-alt'
    };
    return icons[tag] || 'fas fa-tag';
}

function getTagLabel(tag) {
    const labels = {
        'vegetarian': 'Vegetarian',
        'vegan': 'Vegan',
        'gluten-free': 'Gluten Free',
        'spicy': 'Spicy',
        'healthy': 'Healthy'
    };
    return labels[tag] || tag;
}

// Sample data (in real implementation, this would come from project-data.json)
function getSampleMenuData() {
    return {
        starters: [
            {
                id: 'bruschetta',
                name: 'Tomato Bruschetta',
                description: 'Toasted bread topped with fresh tomatoes, basil, and garlic',
                price: 12,
                image: 'assets/dish-bruschetta.jpg',
                tags: ['vegetarian', 'gluten-free']
            },
            {
                id: 'calamari',
                name: 'Crispy Calamari',
                description: 'Lightly fried squid served with lemon aioli',
                price: 16,
                image: 'assets/dish-calamari.jpg',
                tags: ['spicy']
            }
        ],
        mains: [
            {
                id: 'salmon',
                name: 'Pan-Seared Salmon',
                description: 'Fresh Atlantic salmon with seasonal vegetables and lemon butter sauce',
                price: 28,
                image: 'assets/dish-salmon.jpg',
                tags: ['gluten-free', 'healthy']
            },
            {
                id: 'pasta',
                name: 'Truffle Mushroom Pasta',
                description: 'Creamy pasta with wild mushrooms and black truffle',
                price: 24,
                image: 'assets/dish-pasta.jpg',
                tags: ['vegetarian']
            }
        ],
        desserts: [
            {
                id: 'tiramisu',
                name: 'Classic Tiramisu',
                description: 'Coffee-soaked ladyfingers with mascarpone cream',
                price: 10,
                image: 'assets/dish-tiramisu.jpg',
                tags: ['vegetarian']
            }
        ],
        drinks: [
            {
                id: 'signature-cocktail',
                name: 'Elegante Spritz',
                description: 'Prosecco, Aperol, and fresh citrus',
                price: 14,
                image: 'assets/drink-cocktail.jpg',
                tags: ['vegetarian']
            }
        ]
    };
}

function getSampleEventsData() {
    return [
        {
            title: 'Wine Pairing Dinner',
            description: 'Five-course meal expertly paired with selected wines from our sommelier.',
            date: 'Every Friday',
            time: '7:00 PM',
            capacity: 'Limited to 24 guests',
            price: '$95 per person',
            image: 'assets/event-wine.jpg'
        },
        {
            title: 'Live Jazz Nights',
            description: 'Enjoy smooth jazz performances while dining in our elegant atmosphere.',
            date: 'Every Saturday',
            time: '8:00 PM - 11:00 PM',
            capacity: 'Open seating',
            price: 'No cover charge',
            image: 'assets/event-jazz.jpg'
        }
    ];
}

// Initialize reservation form on reservations page
function initReservationForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', handleReservationSubmit);
        populateTimeSlots();
    }
}