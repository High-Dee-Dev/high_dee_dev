/**
 * LuxeThreads - Cart JavaScript File
 * Handles cart-specific functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Cart functionality initialized');
    
    // Initialize cart page
    if (document.querySelector('.cart-table')) {
        initCartPage();
    }
    
    // Initialize checkout page
    if (document.querySelector('.checkout-form')) {
        initCheckoutPage();
    }
});

/**
 * Initialize cart page
 */
function initCartPage() {
    // Load cart data
    let cart = JSON.parse(localStorage.getItem('luxethreads_cart')) || [];
    
    // If cart is empty, show empty message
    if (cart.length === 0) {
        showEmptyCart();
        return;
    }
    
    // Initialize quantity controls
    initQuantityControls();
    
    // Initialize remove buttons
    initRemoveButtons();
    
    // Initialize continue shopping button
    initContinueShopping();
    
    // Initialize checkout button
    initCheckoutButton();
    
    // Update cart summary
    updateCartSummary(cart);
}

/**
 * Show empty cart message
 */
function showEmptyCart() {
    const cartTableBody = document.querySelector('.cart-table tbody');
    if (cartTableBody) {
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
    }
    
    // Hide cart summary
    const cartSummary = document.querySelector('.cart-summary');
    if (cartSummary) {
        cartSummary.style.display = 'none';
    }
}

/**
 * Initialize quantity controls
 */
function initQuantityControls() {
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
        updateCartDisplay(cart);
        updateCartSummary(cart);
        updateCartCount(cart.reduce((total, item) => total + item.quantity, 0));
    }
}

/**
 * Initialize remove buttons
 */
function initRemoveButtons() {
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
    updateCartDisplay(cart);
    updateCartSummary(cart);
    updateCartCount(cart.reduce((total, item) => total + item.quantity, 0));
    
    // Show notification
    showNotification('Product removed from cart', 'info');
}

/**
 * Update cart display
 */
function updateCartDisplay(cart) {
    const cartTableBody = document.querySelector('.cart-table tbody');
    if (!cartTableBody) return;
    
    if (cart.length === 0) {
        showEmptyCart();
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
    
    // Reinitialize event listeners
    initQuantityControls();
    initRemoveButtons();
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
 * Initialize continue shopping button
 */
function initContinueShopping() {
    const continueBtn = document.querySelector('.btn-continue-shopping');
    if (continueBtn) {
        continueBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'shop.html';
        });
    }
}

/**
 * Initialize checkout button
 */
function initCheckoutButton() {
    const checkoutBtn = document.querySelector('.btn-checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check if cart is empty
            let cart = JSON.parse(localStorage.getItem('luxethreads_cart')) || [];
            if (cart.length === 0) {
                showNotification('Your cart is empty. Add some products before checking out.', 'error');
                return;
            }
            
            // Proceed to checkout
            window.location.href = 'checkout.html';
        });
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
 * Initialize checkout page
 */
function initCheckoutPage() {
    // Load cart data
    let cart = JSON.parse(localStorage.getItem('luxethreads_cart')) || [];
    
    // If cart is empty, redirect to shop
    if (cart.length === 0) {
        showNotification('Your cart is empty. Redirecting to shop...', 'info');
        setTimeout(() => {
            window.location.href = 'shop.html';
        }, 2000);
        return;
    }
    
    // Initialize checkout steps
    initCheckoutSteps();
    
    // Initialize form validation
    initCheckoutForm();
    
    // Initialize payment methods
    initPaymentMethods();
    
    // Initialize place order button
    initPlaceOrderButton();
    
    // Update order summary
    updateOrderSummary(cart);
}

/**
 * Initialize checkout steps
 */
function initCheckoutSteps() {
    const steps = document.querySelectorAll('.step');
    const nextButtons = document.querySelectorAll('.btn-next-step');
    const prevButtons = document.querySelectorAll('.btn-prev-step');
    
    // Set initial active step
    if (steps.length > 0) {
        steps[0].classList.add('active');
    }
    
    // Next step buttons
    nextButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const currentStep = this.closest('.checkout-step');
            const nextStepId = this.getAttribute('data-next');
            
            if (validateStep(currentStep)) {
                // Hide current step
                currentStep.classList.remove('active');
                
                // Show next step
                const nextStep = document.getElementById(nextStepId);
                if (nextStep) {
                    nextStep.classList.add('active');
                    
                    // Update step indicators
                    updateStepIndicators(nextStepId);
                }
            }
        });
    });
    
    // Previous step buttons
    prevButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const currentStep = this.closest('.checkout-step');
            const prevStepId = this.getAttribute('data-prev');
            
            // Hide current step
            currentStep.classList.remove('active');
            
            // Show previous step
            const prevStep = document.getElementById(prevStepId);
            if (prevStep) {
                prevStep.classList.add('active');
                
                // Update step indicators
                updateStepIndicators(prevStepId, false);
            }
        });
    });
}

/**
 * Validate checkout step
 */
function validateStep(step) {
    const requiredFields = step.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('is-invalid');
            
            // Show error message
            const feedback = field.nextElementSibling;
            if (feedback && feedback.classList.contains('invalid-feedback')) {
                feedback.style.display = 'block';
            }
        } else {
            field.classList.remove('is-invalid');
            
            // Hide error message
            const feedback = field.nextElementSibling;
            if (feedback && feedback.classList.contains('invalid-feedback')) {
                feedback.style.display = 'none';
            }
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields', 'error');
    }
    
    return isValid;
}

/**
 * Update step indicators
 */
function updateStepIndicators(activeStepId, forward = true) {
    const steps = document.querySelectorAll('.step');
    let foundActive = false;
    
    steps.forEach(step => {
        const stepId = step.getAttribute('data-step');
        
        if (stepId === activeStepId) {
            foundActive = true;
            step.classList.add('active');
            if (forward) {
                step.classList.remove('completed');
            }
        } else if (foundActive) {
            step.classList.remove('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active');
            step.classList.add('completed');
        }
    });
}

/**
 * Initialize checkout form
 */
function initCheckoutForm() {
    const form = document.querySelector('.checkout-form');
    if (!form) return;
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                validateField(this);
            }
        });
    });
    
    // Email confirmation validation
    const email = form.querySelector('#email');
    const confirmEmail = form.querySelector('#confirmEmail');
    
    if (email && confirmEmail) {
        confirmEmail.addEventListener('blur', function() {
            if (email.value !== confirmEmail.value) {
                this.classList.add('is-invalid');
                showNotification('Email addresses do not match', 'error');
            } else {
                this.classList.remove('is-invalid');
            }
        });
    }
    
    // Auto-format phone number
    const phone = form.querySelector('#phone');
    if (phone) {
        phone.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    }
    
    // Auto-format credit card
    const cardNumber = form.querySelector('#cardNumber');
    if (cardNumber) {
        cardNumber.addEventListener('input', function() {
            formatCardNumber(this);
        });
    }
    
    // Auto-format expiry date
    const cardExpiry = form.querySelector('#cardExpiry');
    if (cardExpiry) {
        cardExpiry.addEventListener('input', function() {
            formatExpiryDate(this);
        });
    }
}

/**
 * Validate form field
 */
function validateField(field) {
    const value = field.value.trim();
    
    if (field.hasAttribute('required') && !value) {
        field.classList.add('is-invalid');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('is-invalid');
            return false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        if (!phoneRegex.test(value.replace(/\D/g, ''))) {
            field.classList.add('is-invalid');
            return false;
        }
    }
    
    // Credit card validation
    if (field.id === 'cardNumber' && value) {
        const cardNumber = value.replace(/\D/g, '');
        if (cardNumber.length < 13 || cardNumber.length > 19) {
            field.classList.add('is-invalid');
            return false;
        }
        
        // Luhn algorithm check
        if (!validateLuhn(cardNumber)) {
            field.classList.add('is-invalid');
            return false;
        }
    }
    
    // CVV validation
    if (field.id === 'cardCVV' && value) {
        if (value.length < 3 || value.length > 4) {
            field.classList.add('is-invalid');
            return false;
        }
    }
    
    field.classList.remove('is-invalid');
    return true;
}

/**
 * Format phone number
 */
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length > 0) {
        if (value.length <= 3) {
            value = value;
        } else if (value.length <= 6) {
            value = `(${value.substring(0, 3)}) ${value.substring(3)}`;
        } else {
            value = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6, 10)}`;
        }
    }
    
    input.value = value;
}

/**
 * Format credit card number
 */
function formatCardNumber(input) {
    let value = input.value.replace(/\D/g, '');
    let formatted = '';
    
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formatted += ' ';
        }
        formatted += value[i];
    }
    
    input.value = formatted.substring(0, 19);
}

/**
 * Format expiry date
 */
function formatExpiryDate(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    
    input.value = value.substring(0, 5);
}

/**
 * Validate Luhn algorithm for credit cards
 */
function validateLuhn(cardNumber) {
    let sum = 0;
    let isEven = false;
    
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i]);
        
        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        
        sum += digit;
        isEven = !isEven;
    }
    
    return sum % 10 === 0;
}

/**
 * Initialize payment methods
 */
function initPaymentMethods() {
    const paymentMethods = document.querySelectorAll('.payment-method');
    
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            // Remove active class from all methods
            paymentMethods.forEach(m => m.classList.remove('active'));
            
            // Add active class to clicked method
            this.classList.add('active');
            
            // Show/hide payment forms
            const methodType = this.getAttribute('data-method');
            showPaymentForm(methodType);
        });
    });
    
    // Set credit card as default
    const creditCardMethod = document.querySelector('.payment-method[data-method="credit-card"]');
    if (creditCardMethod) {
        creditCardMethod.classList.add('active');
        showPaymentForm('credit-card');
    }
}

/**
 * Show payment form based on selected method
 */
function showPaymentForm(methodType) {
    // Hide all payment forms
    document.querySelectorAll('.payment-form').forEach(form => {
        form.style.display = 'none';
    });
    
    // Show selected payment form
    const selectedForm = document.getElementById(`${methodType}-form`);
    if (selectedForm) {
        selectedForm.style.display = 'block';
    }
}

/**
 * Initialize place order button
 */
function initPlaceOrderButton() {
    const placeOrderBtn = document.querySelector('.btn-place-order');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Validate all steps
            const steps = document.querySelectorAll('.checkout-step');
            let allValid = true;
            
            steps.forEach(step => {
                if (step.classList.contains('active')) {
                    if (!validateStep(step)) {
                        allValid = false;
                    }
                }
            });
            
            if (!allValid) {
                showNotification('Please fix all errors before placing your order', 'error');
                return;
            }
            
            // Show loading state
            this.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Processing...';
            this.disabled = true;
            
            // Simulate order processing
            setTimeout(() => {
                // In a real app, this would submit to a server
                processOrder();
            }, 2000);
        });
    }
}

/**
 * Process order
 */
function processOrder() {
    // Get order data
    const orderData = {
        shipping: getFormData('shipping-form'),
        billing: getFormData('billing-form'),
        payment: getFormData('payment-form'),
        cart: JSON.parse(localStorage.getItem('luxethreads_cart')) || [],
        orderDate: new Date().toISOString(),
        orderId: generateOrderId()
    };
    
    // Save order to localStorage (in a real app, this would go to a server)
    localStorage.setItem('last_order', JSON.stringify(orderData));
    
    // Clear cart
    localStorage.removeItem('luxethreads_cart');
    updateCartCount(0);
    
    // Redirect to confirmation page
    window.location.href = 'order-confirmation.html';
}

/**
 * Get form data
 */
function getFormData(formId) {
    const form = document.getElementById(formId);
    if (!form) return {};
    
    const formData = {};
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        if (input.name) {
            formData[input.name] = input.value.trim();
        }
    });
    
    return formData;
}

/**
 * Generate order ID
 */
function generateOrderId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `ORD-${timestamp}-${random}`;
}

/**
 * Update order summary
 */
function updateOrderSummary(cart) {
    const orderItems = document.querySelector('.order-items');
    const orderSubtotal = document.getElementById('orderSubtotal');
    const orderShipping = document.getElementById('orderShipping');
    const orderTax = document.getElementById('orderTax');
    const orderTotal = document.getElementById('orderTotal');
    
    if (!orderItems) return;
    
    // Calculate totals
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 9.99;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;
    
    // Update order items
    let itemsHtml = '';
    cart.forEach(item => {
        itemsHtml += `
            <div class="order-item d-flex justify-content-between mb-2">
                <div>
                    <span class="fw-medium">${item.name}</span>
                    <small class="text-muted d-block">Qty: ${item.quantity} | Size: ${item.size}</small>
                </div>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
    });
    
    orderItems.innerHTML = itemsHtml;
    
    // Update totals
    if (orderSubtotal) orderSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (orderShipping) orderShipping.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    if (orderTax) orderTax.textContent = `$${tax.toFixed(2)}`;
    if (orderTotal) orderTotal.textContent = `$${total.toFixed(2)}`;
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