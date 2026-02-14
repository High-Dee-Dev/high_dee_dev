/**
 * LuxeThreads - Main JavaScript File
 * Handles global functionality, navigation, and UI interactions
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('LuxeThreads template loaded successfully');
    
    // Initialize all components
    initNavbar();
    initSearchToggle();
    initScrollAnimations();
    initProductData();
    initCartFunctionality();
    initWishlistFunctionality();
    initMobileMenu();
    initBackToTop();
    initNewsletterForm();
    initImageLoading();
});

/**
 * Initialize navbar behavior
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Add active class to current page link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (linkPage && currentPage.includes(linkPage.replace('.html', '')))) {
            link.classList.add('active');
        }
    });
}

/**
 * Initialize search toggle functionality
 */
function initSearchToggle() {
    const searchToggle = document.getElementById('searchToggle');
    const searchBar = document.getElementById('searchBar');
    const closeSearch = document.getElementById('closeSearch');
    
    if (searchToggle && searchBar) {
        searchToggle.addEventListener('click', function(e) {
            e.preventDefault();
            searchBar.classList.toggle('show');
            
            // Focus on search input when shown
            if (searchBar.classList.contains('show')) {
                const searchInput = searchBar.querySelector('input');
                setTimeout(() => searchInput.focus(), 300);
            }
        });
        
        // Close search when clicking close button
        if (closeSearch) {
            closeSearch.addEventListener('click', function() {
                searchBar.classList.remove('show');
            });
        }
        
        // Close search when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchToggle.contains(e.target) && 
                !searchBar.contains(e.target) && 
                searchBar.classList.contains('show')) {
                searchBar.classList.remove('show');
            }
        });
        
        // Close search on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && searchBar.classList.contains('show')) {
                searchBar.classList.remove('show');
            }
        });
    }
}

/**
 * Initialize scroll animations for elements
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-reveal');
    
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Add scroll animation to hero section on home page
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translate3d(0px, ${rate}px, 0px)`;
        });
    }
}

/**
 * Initialize product data loading for featured products
 */
function initProductData() {
    // Sample product data
    const products = [
        {
            id: 1,
            name: "Elegant Silk Evening Dress",
            category: "Dresses",
            price: 189.99,
            oldPrice: 249.99,
            image: "assets/images/products/product1.jpg",
            rating: 4.5,
            reviewCount: 128,
            sale: true,
            new: false,
            colors: ["Black", "Gray", "Brown", "Dark Green"]
        },
        {
            id: 2,
            name: "Premium Wool Blend Coat",
            category: "Outerwear",
            price: 299.99,
            oldPrice: 399.99,
            image: "assets/images/products/product2.jpg",
            rating: 4.7,
            reviewCount: 89,
            sale: true,
            new: false,
            colors: ["Camel", "Black", "Navy"]
        },
        {
            id: 3,
            name: "Classic Cotton Oxford Shirt",
            category: "Shirts",
            price: 79.99,
            oldPrice: null,
            image: "assets/images/products/product3.jpg",
            rating: 4.3,
            reviewCount: 56,
            sale: false,
            new: true,
            colors: ["White", "Blue", "Pink"]
        },
        {
            id: 4,
            name: "Designer Leather Handbag",
            category: "Accessories",
            price: 349.99,
            oldPrice: null,
            image: "assets/images/products/product4.jpg",
            rating: 4.8,
            reviewCount: 42,
            sale: false,
            new: true,
            colors: ["Black", "Brown", "Burgundy"]
        },
        {
            id: 5,
            name: "Tailored Wool Trousers",
            category: "Pants",
            price: 129.99,
            oldPrice: 159.99,
            image: "assets/images/products/product5.jpg",
            rating: 4.4,
            reviewCount: 67,
            sale: true,
            new: false,
            colors: ["Gray", "Navy", "Black"]
        },
        {
            id: 6,
            name: "Cashmere Sweater",
            category: "Knitwear",
            price: 179.99,
            oldPrice: null,
            image: "assets/images/products/product6.jpg",
            rating: 4.9,
            reviewCount: 103,
            sale: false,
            new: true,
            colors: ["Cream", "Gray", "Navy"]
        }
    ];
    
    // Load featured products on home page
    const featuredProductsContainer = document.getElementById('featuredProducts');
    if (featuredProductsContainer) {
        loadFeaturedProducts(products.slice(0, 6), featuredProductsContainer);
    }
    
    // Load all products on shop page
    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid) {
        loadAllProducts(products, productsGrid);
        initShopFilters();
        initViewToggle();
    }
    
    // Load related products on product details page
    const relatedProducts = document.getElementById('relatedProducts');
    if (relatedProducts) {
        loadRelatedProducts(products.slice(0, 4), relatedProducts);
        initProductGallery();
        initProductSelectors();
    }
}

/**
 * Load featured products on home page
 */
function loadFeaturedProducts(products, container) {
    if (!container) return;
    
    let html = '';
    products.forEach(product => {
        html += `
            <div class="col-lg-4 col-md-6 mb-4 stagger-item">
                <div class="product-card">
                    <div class="product-image">
                        <a href="pages/product-details.html">
                            <img src="${product.image}" alt="${product.name}" class="img-fluid">
                        </a>
                        <div class="product-badges">
                            ${product.sale ? '<span class="badge sale">Sale</span>' : ''}
                            ${product.new ? '<span class="badge new">New</span>' : ''}
                        </div>
                        <div class="product-actions">
                            <button class="action-btn quick-view-btn" data-product-id="${product.id}">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="action-btn wishlist-btn" data-product-id="${product.id}">
                                <i class="far fa-heart"></i>
                            </button>
                        </div>
                    </div>
                    <div class="product-info">
                        <a href="pages/product-details.html" class="product-title">${product.name}</a>
                        <span class="product-category">${product.category}</span>
                        <div class="product-price">
                            <span class="current-price">$${product.price.toFixed(2)}</span>
                            ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
                        </div>
                        <div class="product-rating">
                            <div class="stars">
                                ${generateStarRating(product.rating)}
                            </div>
                            <span class="rating-count">(${product.reviewCount})</span>
                        </div>
                        <button class="add-to-cart-btn" data-product-id="${product.id}">
                            <i class="fas fa-shopping-bag me-2"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    // Add event listeners to newly created buttons
    initProductCardInteractions();
}

/**
 * Load all products on shop page
 */
function loadAllProducts(products, container) {
    if (!container) return;
    
    let html = '';
    products.forEach(product => {
        html += `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="product-card">
                    <div class="product-image">
                        <a href="product-details.html">
                            <img src="../${product.image}" alt="${product.name}" class="img-fluid">
                        </a>
                        <div class="product-badges">
                            ${product.sale ? '<span class="badge sale">Sale</span>' : ''}
                            ${product.new ? '<span class="badge new">New</span>' : ''}
                        </div>
                        <div class="product-actions">
                            <button class="action-btn quick-view-btn" data-product-id="${product.id}">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="action-btn wishlist-btn" data-product-id="${product.id}">
                                <i class="far fa-heart"></i>
                            </button>
                        </div>
                    </div>
                    <div class="product-info">
                        <a href="product-details.html" class="product-title">${product.name}</a>
                        <span class="product-category">${product.category}</span>
                        <div class="product-price">
                            <span class="current-price">$${product.price.toFixed(2)}</span>
                            ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
                        </div>
                        <div class="product-rating">
                            <div class="stars">
                                ${generateStarRating(product.rating)}
                            </div>
                            <span class="rating-count">(${product.reviewCount})</span>
                        </div>
                        <button class="add-to-cart-btn" data-product-id="${product.id}">
                            <i class="fas fa-shopping-bag me-2"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    initProductCardInteractions();
}

/**
 * Load related products on product details page
 */
function loadRelatedProducts(products, container) {
    if (!container) return;
    
    let html = '';
    products.forEach(product => {
        html += `
            <div class="col-lg-3 col-md-6 mb-4">
                <div class="product-card">
                    <div class="product-image">
                        <a href="product-details.html">
                            <img src="../${product.image}" alt="${product.name}" class="img-fluid">
                        </a>
                        <div class="product-badges">
                            ${product.sale ? '<span class="badge sale">Sale</span>' : ''}
                            ${product.new ? '<span class="badge new">New</span>' : ''}
                        </div>
                        <div class="product-actions">
                            <button class="action-btn quick-view-btn" data-product-id="${product.id}">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="action-btn wishlist-btn" data-product-id="${product.id}">
                                <i class="far fa-heart"></i>
                            </button>
                        </div>
                    </div>
                    <div class="product-info">
                        <a href="product-details.html" class="product-title">${product.name}</a>
                        <span class="product-category">${product.category}</span>
                        <div class="product-price">
                            <span class="current-price">$${product.price.toFixed(2)}</span>
                            ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    initProductCardInteractions();
}

/**
 * Generate star rating HTML
 */
function generateStarRating(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars += '<i class="fas fa-star text-warning"></i>';
        } else if (i === fullStars && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt text-warning"></i>';
        } else {
            stars += '<i class="far fa-star text-warning"></i>';
        }
    }
    
    return stars;
}

/**
 * Initialize product card interactions
 */
function initProductCardInteractions() {
    // Quick view buttons
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            showQuickView(productId);
        });
    });
    
    // Wishlist buttons
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            toggleWishlist(productId, this);
        });
    });
    
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            addToCart(productId);
            
            // Add animation
            this.classList.add('add-to-cart-animation');
            setTimeout(() => {
                this.classList.remove('add-to-cart-animation');
            }, 400);
        });
    });
}

/**
 * Initialize shop page filters
 */
function initShopFilters() {
    // Price range slider
    const priceRange = document.getElementById('priceRange');
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    const applyPrice = document.getElementById('applyPrice');
    
    if (priceRange && minPrice && maxPrice) {
        // Set initial values
        minPrice.textContent = '0';
        maxPrice.textContent = priceRange.value;
        
        // Update max price when slider changes
        priceRange.addEventListener('input', function() {
            maxPrice.textContent = this.value;
        });
        
        // Apply price filter
        if (applyPrice) {
            applyPrice.addEventListener('click', function() {
                const max = priceRange.value;
                filterByPrice(max);
            });
        }
    }
    
    // Size filter
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterBySize(this.textContent);
        });
    });
    
    // Color filter
    document.querySelectorAll('.color-filter .color-option').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.color-filter .color-option').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterByColor(this.getAttribute('title'));
        });
    });
    
    // Clear filters
    const clearFilters = document.getElementById('clearFilters');
    if (clearFilters) {
        clearFilters.addEventListener('click', function() {
            clearAllFilters();
        });
    }
    
    // Sort products
    const sortSelect = document.getElementById('sortProducts');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortProducts(this.value);
        });
    }
}

/**
 * Initialize grid/list view toggle
 */
function initViewToggle() {
    const gridViewBtn = document.getElementById('gridView');
    const listViewBtn = document.getElementById('listView');
    const productsGrid = document.getElementById('productsGrid');
    
    if (gridViewBtn && listViewBtn && productsGrid) {
        gridViewBtn.addEventListener('click', function() {
            this.classList.add('active');
            listViewBtn.classList.remove('active');
            productsGrid.classList.remove('list-view');
            productsGrid.classList.add('grid-view');
        });
        
        listViewBtn.addEventListener('click', function() {
            this.classList.add('active');
            gridViewBtn.classList.remove('active');
            productsGrid.classList.remove('grid-view');
            productsGrid.classList.add('list-view');
        });
    }
}

/**
 * Filter products by price
 */
function filterByPrice(maxPrice) {
    console.log(`Filtering products by max price: $${maxPrice}`);
    // Implement actual filtering logic here
    // For now, just show a notification
    showNotification(`Filtered products under $${maxPrice}`, 'info');
}

/**
 * Filter products by size
 */
function filterBySize(size) {
    console.log(`Filtering products by size: ${size}`);
    showNotification(`Filtered products by size: ${size}`, 'info');
}

/**
 * Filter products by color
 */
function filterByColor(color) {
    console.log(`Filtering products by color: ${color}`);
    showNotification(`Filtered products by color: ${color}`, 'info');
}

/**
 * Clear all filters
 */
function clearAllFilters() {
    console.log('Clearing all filters');
    
    // Reset price range
    const priceRange = document.getElementById('priceRange');
    const maxPrice = document.getElementById('maxPrice');
    if (priceRange && maxPrice) {
        priceRange.value = 500;
        maxPrice.textContent = '500';
    }
    
    // Reset size filter
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.size-btn').forEach(btn => {
        if (btn.textContent === 'M') btn.classList.add('active');
    });
    
    // Reset color filter
    document.querySelectorAll('.color-filter .color-option').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.color-filter .color-option').forEach(btn => {
        if (btn.getAttribute('title') === 'White') btn.classList.add('active');
    });
    
    // Reset brand filters
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = checkbox.id === 'brand1';
    });
    
    showNotification('All filters cleared', 'success');
}

/**
 * Sort products
 */
function sortProducts(sortBy) {
    console.log(`Sorting products by: ${sortBy}`);
    
    const sortMessages = {
        'featured': 'Sorted by featured',
        'newest': 'Sorted by newest first',
        'price-low': 'Sorted by price: low to high',
        'price-high': 'Sorted by price: high to low',
        'name': 'Sorted by name A-Z'
    };
    
    showNotification(sortMessages[sortBy] || 'Products sorted', 'info');
}

/**
 * Initialize cart functionality
 */
function initCartFunctionality() {
    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('luxethreads_cart')) || [];
    updateCartCount(cart.length);
    
    // Initialize cart page if exists
    if (document.querySelector('.cart-table')) {
        loadCartItems(cart);
        initCartQuantityControls();
        initCartRemoveButtons();
        updateCartSummary(cart);
    }
}

/**
 * Add product to cart
 */
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('luxethreads_cart')) || [];
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === parseInt(productId));
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        // Get product details (in a real app, this would come from a database)
        const product = getProductById(productId);
        if (product) {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1,
                size: 'M',
                color: 'Black'
            });
        }
    }
    
    // Save to localStorage
    localStorage.setItem('luxethreads_cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount(cart.length);
    
    // Show success notification
    showNotification('Product added to cart!', 'success');
    
    // Trigger cart update if on cart page
    if (document.querySelector('.cart-table')) {
        loadCartItems(cart);
        updateCartSummary(cart);
    }
}

/**
 * Update cart count in navbar
 */
function updateCartCount(count) {
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = count;
        if (count > 0) {
            element.style.display = 'inline-block';
        } else {
            element.style.display = 'none';
        }
    });
}

/**
 * Load cart items on cart page
 */
function loadCartItems(cart) {
    const cartTableBody = document.querySelector('.cart-table tbody');
    if (!cartTableBody) return;
    
    if (cart.length === 0) {
        cartTableBody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-5">
                    <div class="empty-cart">
                        <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                        <h4>Your cart is empty</h4>
                        <p class="text-muted mb-4">Add some products to your cart to see them here.</p>
                        <a href="shop.html" class="btn btn-dark">Continue Shopping</a>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    let html = '';
    cart.forEach(item => {
        html += `
            <tr data-product-id="${item.id}">
                <td>
                    <div class="cart-product">
                        <img src="../${item.image}" alt="${item.name}" width="80">
                        <div>
                            <h6 class="mb-1">${item.name}</h6>
                            <small class="text-muted">Size: ${item.size} | Color: ${item.color}</small>
                        </div>
                    </div>
                </td>
                <td class="text-center">$${item.price.toFixed(2)}</td>
                <td class="text-center">
                    <div class="cart-quantity">
                        <div class="input-group input-group-sm">
                            <button class="btn btn-outline-secondary" type="button" data-action="decrease">-</button>
                            <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
                            <button class="btn btn-outline-secondary" type="button" data-action="increase">+</button>
                        </div>
                    </div>
                </td>
                <td class="text-center">$${(item.price * item.quantity).toFixed(2)}</td>
                <td class="text-center">
                    <button class="btn btn-link text-danger remove-item" data-product-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    cartTableBody.innerHTML = html;
}

/**
 * Initialize cart quantity controls
 */
function initCartQuantityControls() {
    document.querySelectorAll('.cart-quantity button').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            const row = this.closest('tr');
            const productId = row.getAttribute('data-product-id');
            
            updateCartQuantity(productId, action);
        });
    });
}

/**
 * Update cart quantity
 */
function updateCartQuantity(productId, action) {
    let cart = JSON.parse(localStorage.getItem('luxethreads_cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === parseInt(productId));
    
    if (itemIndex !== -1) {
        if (action === 'increase') {
            cart[itemIndex].quantity += 1;
        } else if (action === 'decrease' && cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        }
        
        localStorage.setItem('luxethreads_cart', JSON.stringify(cart));
        loadCartItems(cart);
        updateCartSummary(cart);
        updateCartCount(cart.reduce((total, item) => total + item.quantity, 0));
    }
}

/**
 * Initialize cart remove buttons
 */
function initCartRemoveButtons() {
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            removeFromCart(productId);
        });
    });
}

/**
 * Remove item from cart
 */
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('luxethreads_cart')) || [];
    cart = cart.filter(item => item.id !== parseInt(productId));
    
    localStorage.setItem('luxethreads_cart', JSON.stringify(cart));
    loadCartItems(cart);
    updateCartSummary(cart);
    updateCartCount(cart.reduce((total, item) => total + item.quantity, 0));
    
    showNotification('Product removed from cart', 'info');
}

/**
 * Update cart summary
 */
function updateCartSummary(cart) {
    const subtotalElement = document.getElementById('cartSubtotal');
    const shippingElement = document.getElementById('cartShipping');
    const taxElement = document.getElementById('cartTax');
    const totalElement = document.getElementById('cartTotal');
    
    if (!subtotalElement) return;
    
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 9.99;
    const tax = subtotal * 0.08; // 8% tax
    
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    shippingElement.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    taxElement.textContent = `$${tax.toFixed(2)}`;
    
    if (totalElement) {
        const total = subtotal + shipping + tax;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
}

/**
 * Initialize wishlist functionality
 */
function initWishlistFunctionality() {
    // Load wishlist from localStorage
    let wishlist = JSON.parse(localStorage.getItem('luxethreads_wishlist')) || [];
    updateWishlistCount(wishlist.length);
    
    // Initialize wishlist page if exists
    if (document.querySelector('.wishlist-container')) {
        loadWishlistItems(wishlist);
    }
}

/**
 * Toggle product in wishlist
 */
function toggleWishlist(productId, button) {
    let wishlist = JSON.parse(localStorage.getItem('luxethreads_wishlist')) || [];
    const productIndex = wishlist.findIndex(item => item.id === parseInt(productId));
    
    if (productIndex === -1) {
        // Add to wishlist
        const product = getProductById(productId);
        if (product) {
            wishlist.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image
            });
            
            // Update button icon
            if (button) {
                button.innerHTML = '<i class="fas fa-heart"></i>';
                button.classList.add('active');
            }
            
            showNotification('Added to wishlist!', 'success');
        }
    } else {
        // Remove from wishlist
        wishlist.splice(productIndex, 1);
        
        // Update button icon
        if (button) {
            button.innerHTML = '<i class="far fa-heart"></i>';
            button.classList.remove('active');
        }
        
        showNotification('Removed from wishlist', 'info');
    }
    
    // Save to localStorage
    localStorage.setItem('luxethreads_wishlist', JSON.stringify(wishlist));
    
    // Update wishlist count
    updateWishlistCount(wishlist.length);
    
    // Reload wishlist page if exists
    if (document.querySelector('.wishlist-container')) {
        loadWishlistItems(wishlist);
    }
}

/**
 * Update wishlist count in navbar
 */
function updateWishlistCount(count) {
    const wishlistCountElements = document.querySelectorAll('.wishlist-count');
    wishlistCountElements.forEach(element => {
        element.textContent = count;
        if (count > 0) {
            element.style.display = 'inline-block';
        } else {
            element.style.display = 'none';
        }
    });
}

/**
 * Load wishlist items on wishlist page
 */
function loadWishlistItems(wishlist) {
    const wishlistContainer = document.querySelector('.wishlist-container');
    if (!wishlistContainer) return;
    
    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = `
            <div class="text-center py-5">
                <i class="far fa-heart fa-3x text-muted mb-3"></i>
                <h4>Your wishlist is empty</h4>
                <p class="text-muted mb-4">Save your favorite items here to purchase later.</p>
                <a href="shop.html" class="btn btn-dark">Browse Products</a>
            </div>
        `;
        return;
    }
    
    let html = '<div class="row">';
    wishlist.forEach(item => {
        html += `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="product-card">
                    <div class="product-image">
                        <a href="product-details.html">
                            <img src="../${item.image}" alt="${item.name}" class="img-fluid">
                        </a>
                        <div class="product-actions">
                            <button class="action-btn wishlist-btn active" data-product-id="${item.id}">
                                <i class="fas fa-heart"></i>
                            </button>
                        </div>
                    </div>
                    <div class="product-info">
                        <a href="product-details.html" class="product-title">${item.name}</a>
                        <div class="product-price">
                            <span class="current-price">$${item.price.toFixed(2)}</span>
                        </div>
                        <button class="add-to-cart-btn w-100" data-product-id="${item.id}">
                            <i class="fas fa-shopping-bag me-2"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    html += '</div>';
    
    wishlistContainer.innerHTML = html;
    
    // Reinitialize interactions
    initProductCardInteractions();
}

/**
 * Get product by ID
 */
function getProductById(productId) {
    // Sample product data - in a real app, this would come from a database
    const products = [
        {
            id: 1,
            name: "Elegant Silk Evening Dress",
            price: 189.99,
            image: "assets/images/products/product1.jpg"
        },
        {
            id: 2,
            name: "Premium Wool Blend Coat",
            price: 299.99,
            image: "assets/images/products/product2.jpg"
        },
        {
            id: 3,
            name: "Classic Cotton Oxford Shirt",
            price: 79.99,
            image: "assets/images/products/product3.jpg"
        },
        {
            id: 4,
            name: "Designer Leather Handbag",
            price: 349.99,
            image: "assets/images/products/product4.jpg"
        },
        {
            id: 5,
            name: "Tailored Wool Trousers",
            price: 129.99,
            image: "assets/images/products/product5.jpg"
        },
        {
            id: 6,
            name: "Cashmere Sweater",
            price: 179.99,
            image: "assets/images/products/product6.jpg"
        }
    ];
    
    return products.find(product => product.id === parseInt(productId));
}

/**
 * Show quick view modal
 */
function showQuickView(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    const modal = new bootstrap.Modal(document.getElementById('quickViewModal'));
    const modalBody = document.querySelector('#quickViewModal .modal-body');
    
    // In a real app, this would fetch detailed product info
    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${product.image}" alt="${product.name}" class="img-fluid rounded">
            </div>
            <div class="col-md-6">
                <h4>${product.name}</h4>
                <div class="product-price mb-3">
                    <span class="h3 text-dark">$${product.price.toFixed(2)}</span>
                </div>
                <p class="text-muted mb-4">This premium product features high-quality materials and expert craftsmanship.</p>
                
                <div class="mb-4">
                    <h6>Size:</h6>
                    <div class="d-flex flex-wrap gap-2">
                        <button class="btn btn-outline-secondary btn-sm">XS</button>
                        <button class="btn btn-outline-secondary btn-sm">S</button>
                        <button class="btn btn-dark btn-sm">M</button>
                        <button class="btn btn-outline-secondary btn-sm">L</button>
                        <button class="btn btn-outline-secondary btn-sm">XL</button>
                    </div>
                </div>
                
                <div class="mb-4">
                    <h6>Color:</h6>
                    <div class="d-flex gap-2">
                        <div class="color-option active" style="background-color: #000; width: 30px; height: 30px; border-radius: 50%;"></div>
                        <div class="color-option" style="background-color: #6c757d; width: 30px; height: 30px; border-radius: 50%;"></div>
                        <div class="color-option" style="background-color: #8B4513; width: 30px; height: 30px; border-radius: 50%;"></div>
                    </div>
                </div>
                
                <div class="d-grid gap-2">
                    <button class="btn btn-dark btn-lg add-to-cart-btn" data-product-id="${productId}">
                        <i class="fas fa-shopping-bag me-2"></i> Add to Cart
                    </button>
                    <button class="btn btn-outline-dark btn-lg wishlist-btn" data-product-id="${productId}">
                        <i class="far fa-heart me-2"></i> Add to Wishlist
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.show();
    
    // Add event listeners to modal buttons
    setTimeout(() => {
        const addToCartBtn = modalBody.querySelector('.add-to-cart-btn');
        const wishlistBtn = modalBody.querySelector('.wishlist-btn');
        
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function() {
                addToCart(productId);
                modal.hide();
            });
        }
        
        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', function() {
                toggleWishlist(productId, this);
            });
        }
    }, 100);
}

/**
 * Initialize mobile menu improvements
 */
function initMobileMenu() {
    // Close dropdowns when clicking outside on mobile
    if (window.innerWidth < 992) {
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.classList.remove('show');
                });
            }
        });
    }
}

/**
 * Initialize back to top button
 */
function initBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.className = 'btn btn-dark btn-back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(backToTop);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });
    
    // Scroll to top when clicked
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Initialize newsletter form
 */
function initNewsletterForm() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // In a real app, this would send to a server
                showNotification('Thank you for subscribing!', 'success');
                emailInput.value = '';
                
                // Reset form
                const privacyCheck = this.querySelector('#privacyCheck');
                if (privacyCheck) privacyCheck.checked = false;
            } else {
                showNotification('Please enter a valid email address', 'error');
                emailInput.focus();
            }
        });
    });
}

/**
 * Validate email address
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Initialize image loading with lazy loading
 */
function initImageLoading() {
    // Add loading="lazy" to images that don't have it
    document.querySelectorAll('img:not([loading])').forEach(img => {
        if (!img.src.includes('data:image')) {
            img.loading = 'lazy';
        }
    });
    
    // Add fade-in effect for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        max-width: 500px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideInRight 0.3s ease-out;
    `;
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    // Remove on close
    notification.querySelector('.btn-close').addEventListener('click', function() {
        notification.remove();
    });
}

/**
 * Initialize product gallery on product details page
 */
function initProductGallery() {
    const thumbnails = document.querySelectorAll('.thumb-item img');
    const mainImage = document.getElementById('mainProductImage');
    
    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                const newSrc = this.getAttribute('data-image');
                if (newSrc) {
                    // Update main image
                    mainImage.src = newSrc;
                    
                    // Update active thumbnail
                    document.querySelectorAll('.thumb-item').forEach(item => {
                        item.classList.remove('active');
                    });
                    this.parentElement.classList.add('active');
                }
            });
        });
    }
}

/**
 * Initialize product selectors on product details page
 */
function initProductSelectors() {
    // Size selector
    document.querySelectorAll('.size-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.size-option').forEach(opt => {
                opt.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Color selector
    document.querySelectorAll('.color-selector .color-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.color-selector .color-option').forEach(opt => {
                opt.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Quantity selector
    const decreaseQty = document.getElementById('decreaseQty');
    const increaseQty = document.getElementById('increaseQty');
    const productQty = document.getElementById('productQty');
    
    if (decreaseQty && increaseQty && productQty) {
        decreaseQty.addEventListener('click', function() {
            let qty = parseInt(productQty.value);
            if (qty > 1) {
                productQty.value = qty - 1;
            }
        });
        
        increaseQty.addEventListener('click', function() {
            let qty = parseInt(productQty.value);
            productQty.value = qty + 1;
        });
    }
    
    // Add to cart button on product details page
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const productId = 1; // In a real app, this would come from the page
            addToCart(productId);
            
            // Add animation
            this.classList.add('add-to-cart-animation');
            setTimeout(() => {
                this.classList.remove('add-to-cart-animation');
            }, 400);
        });
    }
    
    // Add to wishlist button on product details page
    const addToWishlistBtn = document.getElementById('addToWishlistBtn');
    if (addToWishlistBtn) {
        addToWishlistBtn.addEventListener('click', function() {
            const productId = 1; // In a real app, this would come from the page
            toggleWishlist(productId, this);
        });
    }
    
    // Share button
    const shareProduct = document.getElementById('shareProduct');
    if (shareProduct && navigator.share) {
        shareProduct.addEventListener('click', async function() {
            try {
                await navigator.share({
                    title: document.title,
                    text: 'Check out this product from LuxeThreads',
                    url: window.location.href
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        });
    }
}