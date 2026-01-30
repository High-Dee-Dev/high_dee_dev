// script.js

// Product data - in a real implementation, this would come from a backend
const products = [
    {
        id: 1,
        name: 'Linen Relaxed Blazer',
        category: 'outerwear',
        price: 248,
        image: 'images/product-01.jpg',
        color: 'Natural',
        material: 'Linen',
        description: 'Unlined blazer in breathable European linen with a relaxed silhouette.',
        featured: true
    },
    {
        id: 2,
        name: 'Silk Blend Tank',
        category: 'tops',
        price: 98,
        image: 'images/product-02.jpg',
        color: 'Taupe',
        material: 'Silk Blend',
        description: 'Lightweight tank with subtle sheen and clean lines.',
        featured: true
    },
    {
        id: 3,
        name: 'Oversized Linen Shirt',
        category: 'tops',
        price: 145,
        image: 'images/product-03.jpg',
        color: 'Sage',
        material: 'Linen',
        description: 'Easy-fitting shirt with dropped shoulders and chest pocket.',
        featured: true
    },
    {
        id: 4,
        name: 'High-Rise Wide Leg Trousers',
        category: 'bottoms',
        price: 165,
        image: 'images/product-04.jpg',
        color: 'Black',
        material: 'Organic Cotton',
        description: 'Tailored trousers with a wide leg and comfortable high waist.',
        featured: true
    },
    {
        id: 5,
        name: 'Knit Polo Sweater',
        category: 'tops',
        price: 135,
        image: 'images/product-05.jpg',
        color: 'Sand',
        material: 'Wool Blend',
        description: 'Lightweight knit with polo collar and ribbed trims.',
        featured: false
    },
    {
        id: 6,
        name: 'Wrap Mid-Length Dress',
        category: 'dresses',
        price: 195,
        image: 'images/product-06.jpg',
        color: 'Natural',
        material: 'Linen',
        description: 'Adjustable wrap dress with elbow-length sleeves.',
        featured: false
    }
];

// DOM Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all page-specific functions
    if (document.querySelector('#recent-products')) {
        loadRecentProducts();
    }
    
    if (document.querySelector('#product-grid')) {
        loadAllProducts();
        initFilters();
    }
    
    if (document.querySelector('#related-products')) {
        loadRelatedProducts();
        initProductDetails();
    }
    
    if (document.querySelector('.cart-items')) {
        initCart();
    }
    
    if (document.querySelector('#checkoutForm')) {
        initCheckout();
    }
    
    if (document.querySelector('#contactForm')) {
        initContactForm();
    }
    
    // Initialize newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (validateEmail(email)) {
                showNotification('Thank you for subscribing.', 'success');
                this.reset();
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
    
    // Initialize all tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Load recent products on homepage
function loadRecentProducts() {
    const container = document.getElementById('recent-products');
    if (!container) return;
    
    const featuredProducts = products.filter(p => p.featured);
    let html = '';
    
    featuredProducts.forEach(product => {
        html += `
        <div class="col-md-4">
            <div class="product-card">
                <div class="product-card-img">
                    <a href="product-details.html?id=${product.id}">
                        <img src="${product.image}" alt="${product.name}" class="img-fluid">
                    </a>
                    <div class="product-card-overlay">
                        <div class="d-grid gap-2">
                            <button class="btn btn-dark rounded-0 add-to-cart" data-id="${product.id}">Add to Cart</button>
                            <button class="btn btn-outline-dark rounded-0 add-to-wishlist" data-id="${product.id}">Wishlist</button>
                        </div>
                    </div>
                    <div class="product-card-actions">
                        <button class="product-card-action-btn add-to-wishlist" data-id="${product.id}" title="Add to wishlist">
                            <i class="far fa-heart"></i>
                        </button>
                        <button class="product-card-action-btn quick-view" data-id="${product.id}" title="Quick view">
                            <i class="far fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="product-card-body p-3">
                    <h4 class="h6 mb-1">
                        <a href="product-details.html?id=${product.id}" class="text-decoration-none text-dark">${product.name}</a>
                    </h4>
                    <p class="small text-muted mb-2">${product.material}</p>
                    <p class="mb-0">$${product.price}</p>
                </div>
            </div>
        </div>
        `;
    });
    
    container.innerHTML = html;
    attachProductListeners();
}

// Load all products on shop page
function loadAllProducts() {
    const container = document.getElementById('product-grid');
    if (!container) return;
    
    let html = '';
    
    products.forEach(product => {
        html += `
        <div class="col-md-4">
            <div class="product-card">
                <div class="product-card-img">
                    <a href="product-details.html?id=${product.id}">
                        <img src="${product.image}" alt="${product.name}" class="img-fluid">
                    </a>
                    <div class="product-card-overlay">
                        <div class="d-grid gap-2">
                            <button class="btn btn-dark rounded-0 add-to-cart" data-id="${product.id}">Add to Cart</button>
                            <button class="btn btn-outline-dark rounded-0 add-to-wishlist" data-id="${product.id}">Wishlist</button>
                        </div>
                    </div>
                    <div class="product-card-actions">
                        <button class="product-card-action-btn add-to-wishlist" data-id="${product.id}" title="Add to wishlist">
                            <i class="far fa-heart"></i>
                        </button>
                        <button class="product-card-action-btn quick-view" data-id="${product.id}" title="Quick view">
                            <i class="far fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="product-card-body p-3">
                    <h4 class="h6 mb-1">
                        <a href="product-details.html?id=${product.id}" class="text-decoration-none text-dark">${product.name}</a>
                    </h4>
                    <p class="small text-muted mb-2">${product.material}</p>
                    <p class="mb-0">$${product.price}</p>
                </div>
            </div>
        </div>
        `;
    });
    
    container.innerHTML = html;
    attachProductListeners();
}

// Load related products on product details page
function loadRelatedProducts() {
    const container = document.getElementById('related-products');
    if (!container) return;
    
    // Get 3 random products (excluding current product)
    const relatedProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 3);
    let html = '';
    
    relatedProducts.forEach(product => {
        html += `
        <div class="col-md-4">
            <div class="product-card">
                <div class="product-card-img">
                    <a href="product-details.html?id=${product.id}">
                        <img src="${product.image}" alt="${product.name}" class="img-fluid">
                    </a>
                    <div class="product-card-overlay">
                        <div class="d-grid gap-2">
                            <button class="btn btn-dark rounded-0 add-to-cart" data-id="${product.id}">Add to Cart</button>
                        </div>
                    </div>
                </div>
                <div class="product-card-body p-3">
                    <h4 class="h6 mb-1">
                        <a href="product-details.html?id=${product.id}" class="text-decoration-none text-dark">${product.name}</a>
                    </h4>
                    <p class="small text-muted mb-2">${product.material}</p>
                    <p class="mb-0">$${product.price}</p>
                </div>
            </div>
        </div>
        `;
    });
    
    container.innerHTML = html;
    attachProductListeners();
}

// Initialize product detail page interactions
function initProductDetails() {
    // Image thumbnail switching
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainImage');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Update main image
            mainImage.src = this.dataset.image;
            mainImage.alt = this.alt;
            
            // Update active state
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Color selection
    const colorOptions = document.querySelectorAll('.color-option');
    const selectedColorSpan = document.getElementById('selectedColor');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Update selected color text
            selectedColorSpan.textContent = this.dataset.color;
            
            // Update main image if color has associated image
            if (this.dataset.image) {
                mainImage.src = this.dataset.image;
                
                // Update thumbnail active state
                thumbnails.forEach(thumb => {
                    if (thumb.dataset.image === this.dataset.image) {
                        thumb.click();
                    }
                });
            }
            
            // Update active state
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Quantity selector
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');
    const quantityInput = document.getElementById('quantity');
    
    if (decreaseBtn && increaseBtn && quantityInput) {
        decreaseBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });
        
        increaseBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value < 10) {
                quantityInput.value = value + 1;
            }
        });
    }
    
    // Add to cart from product page
    const addToCartBtn = document.querySelector('#productForm button[type="submit"]');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const size = document.querySelector('input[name="size"]:checked');
            if (!size) {
                showNotification('Please select a size.', 'error');
                return;
            }
            
            const product = {
                id: 1, // In real app, get from URL params
                name: 'Linen Relaxed Blazer',
                size: size.nextElementSibling.textContent,
                color: selectedColorSpan.textContent,
                price: 248,
                quantity: parseInt(quantityInput.value),
                image: 'images/product-01.jpg'
            };
            
            addToCart(product);
            showNotification('Added to cart.', 'success');
        });
    }
    
    // Add to wishlist from product page
    const addToWishlistBtn = document.getElementById('addToWishlist');
    if (addToWishlistBtn) {
        addToWishlistBtn.addEventListener('click', function() {
            const product = {
                id: 1,
                name: 'Linen Relaxed Blazer',
                color: selectedColorSpan.textContent,
                price: 248,
                image: 'images/product-01.jpg'
            };
            
            addToWishlist(product);
            showNotification('Added to wishlist.', 'success');
        });
    }
}

// Initialize filter functionality
function initFilters() {
    const clearBtn = document.getElementById('clear-filters');
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const checkboxes = document.querySelectorAll('.filter-sidebar input[type="checkbox"]');
    
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            // Uncheck all checkboxes
            check.forEach(cb => cb.checked = false);
            
            // Remove active state from color swatches
            colorSwatches.forEach(swatch => {
                swatch.style.borderColor = '#e9ecef';
            });
            
            // Reset product display
            loadAllProducts();
        });
    }
    
    // Color filter swatches
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            const currentBorder = this.style.borderColor;
            if (currentBorder === 'rgb(26, 26, 26)') {
                this.style.borderColor = '#e9ecef';
            } else {
                this.style.borderColor = '#1a1a1a';
            }
            
            // In a real app, filter products here
            filterProducts();
        });
    });
    
    // Checkbox filters
    checkboxes.forEach(cb => {
        cb.addEventListener('change', filterProducts);
    });
}

// Filter products (simplified - in real app would filter actual data)
function filterProducts() {
    // This is a simplified version
    // In a production template, you would filter the products array
    // and re-render the product grid
    
    showNotification('Filters applied.', 'info');
}

// Initialize cart functionality
function initCart() {
    // Quantity adjustments
    const decreaseBtns = document.querySelectorAll('.decrease-qty');
    const increaseBtns = document.querySelectorAll('.increase-qty');
    const quantityInputs = document.querySelectorAll('.cart-items input[type="number"]');
    const removeBtns = document.querySelectorAll('.remove-item');
    const clearCartBtn = document.getElementById('clearCart');
    
    // Decrease quantity
    decreaseBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            let value = parseInt(quantityInputs[index].value);
            if (value > 1) {
                quantityInputs[index].value = value - 1;
                updateCartTotals();
            }
        });
    });
    
    // Increase quantity
    increaseBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            let value = parseInt(quantityInputs[index].value);
            if (value < 10) {
                quantityInputs[index].value = value + 1;
                updateCartTotals();
            }
        });
    });
    
    // Input change
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (value < 1) this.value = 1;
            if (value > 10) this.value = 10;
            updateCartTotals();
        });
    });
    
    // Remove items
    removeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.closest('.cart-item');
            item.style.opacity = '0';
            setTimeout(() => {
                item.remove();
                updateCartTotals();
                updateCartCount();
                showNotification('Item removed from cart.', 'info');
            }, 300);
        });
    });
    
    // Clear cart
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            if (confirm('Remove all items from cart?')) {
                document.querySelectorAll('.cart-item').forEach(item => {
                    item.remove();
                });
                updateCartTotals();
                updateCartCount();
                showNotification('Cart cleared.', 'info');
            }
        });
    }
}

// Update cart totals
function updateCartTotals() {
    // In a real app, this would calculate based on actual items
    // This is a simplified version
    console.log('Updating cart totals...');
}

// Update cart count in navbar
function updateCartCount() {
    const countElements = document.querySelectorAll('.navbar .badge');
    const currentCount = document.querySelectorAll('.cart-item').length;
    
    countElements.forEach(el => {
        el.textContent = currentCount;
    });
}

// Initialize checkout functionality
function initCheckout() {
    const form = document.getElementById('checkoutForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let valid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            // Card number validation (simplified)
            const cardNumber = document.getElementById('cardNumber');
            if (cardNumber && cardNumber.value.replace(/\s/g, '').length < 16) {
                valid = false;
                cardNumber.classList.add('is-invalid');
            }
            
            if (valid) {
                // In a real app, this would process the payment
                showNotification('Order placed successfully!', 'success');
                
                // Redirect to confirmation page (not implemented in this template)
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            } else {
                showNotification('Please fill in all required fields correctly.', 'error');
            }
        });
    }
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-invalid');
            }
        });
    });
}

// Initialize contact form
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let valid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            if (valid) {
                showNotification('Message sent successfully!', 'success');
                form.reset();
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    }
}

// Attach event listeners to product buttons
function attachProductListeners() {
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            const product = products.find(p => p.id === productId);
            
            if (product) {
                addToCart({
                    ...product,
                    quantity: 1,
                    size: 'S', // Default size
                    color: product.color
                });
                showNotification('Added to cart.', 'success');
                updateCartCount();
            }
        });
    });
    
    // Add to wishlist buttons
    document.querySelectorAll('.add-to-wishlist').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            const product = products.find(p => p.id === productId);
            
            if (product) {
                addToWishlist(product);
                showNotification('Added to wishlist.', 'success');
            }
        });
    });
    
    // Quick view buttons (placeholder functionality)
    document.querySelectorAll('.quick-view').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            // In a real implementation, this would open a modal with product details
            window.location.href = `product-details.html?id=${productId}`;
        });
    });
}

// Add item to cart
function addToCart(product) {
    // In a real app, this would update localStorage or send to backend
    console.log('Adding to cart:', product);
    // Update cart count
    const currentCount = parseInt(document.querySelector('.navbar .badge').textContent) || 0;
    document.querySelectorAll('.navbar .badge').forEach(badge => {
        badge.textContent = currentCount + 1;
    });
}

// Add item to wishlist
function addToWishlist(product) {
    // In a real app, this would update localStorage or send to backend
    console.log('Adding to wishlist:', product);
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification alert alert-${type === 'error' ? 'danger' : type} rounded-0`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Email validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification {
        animation: slideIn 0.3s ease;
    }
`;
document.head.appendChild(style);