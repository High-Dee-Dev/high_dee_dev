/**
 * LuxeThreads - Product JavaScript File
 * Handles product-specific functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Product functionality initialized');
    
    // Initialize product details page
    if (document.querySelector('.product-details')) {
        initProductDetails();
    }
    
    // Initialize product gallery
    if (document.querySelector('.product-gallery')) {
        initProductGallery();
    }
    
    // Initialize product reviews
    if (document.querySelector('.reviews-list')) {
        initProductReviews();
    }
    
    // Initialize related products carousel
    if (document.querySelector('#relatedProductsCarousel')) {
        initRelatedProductsCarousel();
    }
    
    // Initialize size guide modal
    if (document.querySelector('#sizeGuideModal')) {
        initSizeGuide();
    }
});

/**
 * Initialize product details page
 */
function initProductDetails() {
    // Initialize quantity selector
    initQuantitySelector();
    
    // Initialize size selector
    initSizeSelector();
    
    // Initialize color selector
    initColorSelector();
    
    // Initialize product tabs
    initProductTabs();
    
    // Initialize share functionality
    initShareProduct();
    
    // Initialize zoom functionality
    initImageZoom();
    
    // Initialize product video
    initProductVideo();
    
    // Initialize availability check
    initAvailabilityCheck();
}

/**
 * Initialize quantity selector
 */
function initQuantitySelector() {
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');
    const quantityInput = document.getElementById('productQty');
    
    if (decreaseBtn && increaseBtn && quantityInput) {
        decreaseBtn.addEventListener('click', function() {
            let currentQty = parseInt(quantityInput.value);
            if (currentQty > 1) {
                quantityInput.value = currentQty - 1;
            }
        });
        
        increaseBtn.addEventListener('click', function() {
            let currentQty = parseInt(quantityInput.value);
            if (currentQty < 10) { // Maximum quantity
                quantityInput.value = currentQty + 1;
            } else {
                showNotification('Maximum quantity reached (10 items)', 'info');
            }
        });
        
        // Validate input
        quantityInput.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (isNaN(value) || value < 1) {
                this.value = 1;
            } else if (value > 10) {
                this.value = 10;
                showNotification('Maximum quantity is 10 items', 'info');
            }
        });
    }
}

/**
 * Initialize size selector
 */
function initSizeSelector() {
    const sizeOptions = document.querySelectorAll('.size-option');
    
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            sizeOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Update selected size display
            updateSelectedSize(this.textContent);
            
            // Check availability for selected size
            checkSizeAvailability(this.textContent);
        });
    });
    
    // Set default size if none selected
    if (sizeOptions.length > 0 && !document.querySelector('.size-option.active')) {
        const defaultSize = sizeOptions[2] || sizeOptions[0]; // Medium or first
        defaultSize.classList.add('active');
        updateSelectedSize(defaultSize.textContent);
    }
}

/**
 * Update selected size display
 */
function updateSelectedSize(size) {
    const sizeDisplay = document.getElementById('selectedSize');
    if (sizeDisplay) {
        sizeDisplay.textContent = size;
    }
    
    // Update add to cart button text
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
        const originalText = addToCartBtn.innerHTML;
        const newText = originalText.replace(/Size: \w+/, `Size: ${size}`);
        if (newText !== originalText) {
            addToCartBtn.innerHTML = newText;
        }
    }
}

/**
 * Check size availability
 */
function checkSizeAvailability(size) {
    // In a real app, this would check with the server
    // For demo purposes, we'll simulate availability
    
    const outOfStockSizes = ['XS', 'XXL']; // Example out of stock sizes
    
    if (outOfStockSizes.includes(size)) {
        showNotification(`Size ${size} is currently out of stock`, 'warning');
        
        // Disable add to cart button
        const addToCartBtn = document.getElementById('addToCartBtn');
        if (addToCartBtn) {
            addToCartBtn.disabled = true;
            addToCartBtn.innerHTML = '<i class="fas fa-ban me-2"></i> Out of Stock';
        }
    } else {
        // Enable add to cart button
        const addToCartBtn = document.getElementById('addToCartBtn');
        if (addToCartBtn) {
            addToCartBtn.disabled = false;
            addToCartBtn.innerHTML = '<i class="fas fa-shopping-bag me-2"></i> Add to Cart';
        }
    }
}

/**
 * Initialize color selector
 */
function initColorSelector() {
    const colorOptions = document.querySelectorAll('.color-option');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            colorOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Get selected color
            const color = this.getAttribute('data-color');
            
            // Update selected color display
            updateSelectedColor(color);
            
            // Update product image based on color
            updateProductImage(color);
        });
    });
    
    // Set default color if none selected
    if (colorOptions.length > 0 && !document.querySelector('.color-option.active')) {
        const defaultColor = colorOptions[0];
        defaultColor.classList.add('active');
        updateSelectedColor(defaultColor.getAttribute('data-color'));
    }
}

/**
 * Update selected color display
 */
function updateSelectedColor(color) {
    const colorDisplay = document.getElementById('selectedColor');
    if (colorDisplay) {
        colorDisplay.textContent = color;
    }
}

/**
 * Update product image based on color
 */
function updateProductImage(color) {
    // In a real app, this would load different images for different colors
    // For demo purposes, we'll just show a notification
    
    const mainImage = document.getElementById('mainProductImage');
    if (mainImage) {
        // Add loading effect
        mainImage.style.opacity = '0.5';
        
        setTimeout(() => {
            // Simulate loading new image
            mainImage.style.opacity = '1';
            showNotification(`Showing ${color} color variant`, 'info');
        }, 300);
    }
}

/**
 * Initialize product gallery
 */
function initProductGallery() {
    const thumbnails = document.querySelectorAll('.thumb-item img');
    const mainImage = document.getElementById('mainProductImage');
    
    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                const newSrc = this.getAttribute('data-image');
                if (newSrc) {
                    // Update active thumbnail
                    document.querySelectorAll('.thumb-item').forEach(item => {
                        item.classList.remove('active');
                    });
                    this.parentElement.classList.add('active');
                    
                    // Fade out current image
                    mainImage.style.opacity = '0';
                    
                    // Load new image
                    setTimeout(() => {
                        mainImage.src = newSrc;
                        mainImage.alt = this.alt;
                        
                        // Fade in new image
                        setTimeout(() => {
                            mainImage.style.opacity = '1';
                        }, 50);
                    }, 300);
                }
            });
        });
        
        // Add keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (document.querySelector('.product-gallery')) {
                const activeThumb = document.querySelector('.thumb-item.active');
                if (activeThumb) {
                    let nextThumb;
                    
                    if (e.key === 'ArrowRight') {
                        nextThumb = activeThumb.nextElementSibling || thumbnails[0].parentElement;
                    } else if (e.key === 'ArrowLeft') {
                        nextThumb = activeThumb.previousElementSibling || thumbnails[thumbnails.length - 1].parentElement;
                    }
                    
                    if (nextThumb) {
                        const thumbImg = nextThumb.querySelector('img');
                        if (thumbImg) {
                            thumbImg.click();
                        }
                    }
                }
            }
        });
    }
    
    // Initialize gallery navigation buttons if they exist
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    
    if (prevBtn && nextBtn && thumbnails.length > 0) {
        prevBtn.addEventListener('click', function() {
            const activeThumb = document.querySelector('.thumb-item.active');
            if (activeThumb) {
                const prevThumb = activeThumb.previousElementSibling || thumbnails[thumbnails.length - 1].parentElement;
                const thumbImg = prevThumb.querySelector('img');
                if (thumbImg) {
                    thumbImg.click();
                }
            }
        });
        
        nextBtn.addEventListener('click', function() {
            const activeThumb = document.querySelector('.thumb-item.active');
            if (activeThumb) {
                const nextThumb = activeThumb.nextElementSibling || thumbnails[0].parentElement;
                const thumbImg = nextThumb.querySelector('img');
                if (thumbImg) {
                    thumbImg.click();
                }
            }
        });
    }
}

/**
 * Initialize image zoom functionality
 */
function initImageZoom() {
    const mainImage = document.getElementById('mainProductImage');
    
    if (mainImage && window.innerWidth > 768) {
        const zoomContainer = mainImage.parentElement;
        
        // Create zoom lens
        const lens = document.createElement('div');
        lens.className = 'zoom-lens';
        lens.style.cssText = `
            position: absolute;
            border: 1px solid #ddd;
            background-color: rgba(255, 255, 255, 0.4);
            cursor: move;
            display: none;
            z-index: 10;
        `;
        
        // Create zoom result
        const result = document.createElement('div');
        result.className = 'zoom-result';
        result.style.cssText = `
            position: absolute;
            top: 0;
            left: calc(100% + 20px);
            width: 400px;
            height: 400px;
            border: 1px solid #ddd;
            background-color: white;
            background-repeat: no-repeat;
            display: none;
            z-index: 10;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        `;
        
        zoomContainer.style.position = 'relative';
        zoomContainer.appendChild(lens);
        zoomContainer.appendChild(result);
        
        // Calculate zoom ratio
        const zoomRatio = 2;
        
        // Mouse enter event
        zoomContainer.addEventListener('mouseenter', function() {
            lens.style.display = 'block';
            result.style.display = 'block';
            
            // Set lens size (1/zoomRatio of image size)
            const imgWidth = mainImage.offsetWidth;
            const imgHeight = mainImage.offsetHeight;
            lens.style.width = (imgWidth / zoomRatio) + 'px';
            lens.style.height = (imgHeight / zoomRatio) + 'px';
            
            // Set result background size
            result.style.backgroundSize = (imgWidth * zoomRatio) + 'px ' + (imgHeight * zoomRatio) + 'px';
            result.style.backgroundImage = `url('${mainImage.src}')`;
        });
        
        // Mouse leave event
        zoomContainer.addEventListener('mouseleave', function() {
            lens.style.display = 'none';
            result.style.display = 'none';
        });
        
        // Mouse move event
        zoomContainer.addEventListener('mousemove', function(e) {
            const rect = mainImage.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate lens position
            const lensWidth = lens.offsetWidth;
            const lensHeight = lens.offsetHeight;
            
            let lensX = x - lensWidth / 2;
            let lensY = y - lensHeight / 2;
            
            // Keep lens within image bounds
            if (lensX < 0) lensX = 0;
            if (lensY < 0) lensY = 0;
            if (lensX > imgWidth - lensWidth) lensX = imgWidth - lensWidth;
            if (lensY > imgHeight - lensHeight) lensY = imgHeight - lensHeight;
            
            // Update lens position
            lens.style.left = lensX + 'px';
            lens.style.top = lensY + 'px';
            
            // Calculate background position for result
            const bgX = (lensX * zoomRatio) * -1;
            const bgY = (lensY * zoomRatio) * -1;
            
            // Update result background position
            result.style.backgroundPosition = bgX + 'px ' + bgY + 'px';
        });
    }
}

/**
 * Initialize product tabs
 */
function initProductTabs() {
    const tabLinks = document.querySelectorAll('#productTab .nav-link');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get target tab content
            const targetId = this.getAttribute('data-bs-target');
            const targetContent = document.querySelector(targetId);
            
            if (targetContent) {
                // Hide all tab content
                document.querySelectorAll('.tab-pane').forEach(pane => {
                    pane.classList.remove('show', 'active');
                });
                
                // Remove active class from all links
                tabLinks.forEach(tab => {
                    tab.classList.remove('active');
                });
                
                // Show target content
                targetContent.classList.add('show', 'active');
                this.classList.add('active');
                
                // Load reviews if reviews tab is clicked
                if (targetId === '#reviews') {
                    loadProductReviews();
                }
            }
        });
    });
    
    // Load reviews if reviews tab is active on page load
    const activeTab = document.querySelector('#productTab .nav-link.active');
    if (activeTab && activeTab.getAttribute('data-bs-target') === '#reviews') {
        loadProductReviews();
    }
}

/**
 * Initialize product reviews
 */
function initProductReviews() {
    // Initialize review form
    const reviewForm = document.querySelector('.review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitReview(this);
        });
        
        // Initialize star rating input
        const starInputs = reviewForm.querySelectorAll('.star-input');
        starInputs.forEach(star => {
            star.addEventListener('click', function() {
                const rating = this.getAttribute('data-value');
                setStarRating(rating);
            });
        });
    }
    
    // Load reviews
    loadProductReviews();
}

/**
 * Load product reviews
 */
function loadProductReviews() {
    const reviewsContainer = document.querySelector('.reviews-list');
    if (!reviewsContainer) return;
    
    // In a real app, this would fetch from a server
    // For demo purposes, we'll use sample data
    
    const sampleReviews = [
        {
            id: 1,
            name: "Sarah Johnson",
            rating: 5,
            date: "2 weeks ago",
            comment: "Absolutely love this dress! The silk is so luxurious and it fits perfectly. I wore it to a wedding and received so many compliments. Worth every penny!",
            verified: true
        },
        {
            id: 2,
            name: "Emily Chen",
            rating: 4.5,
            date: "1 month ago",
            comment: "Beautiful dress, but it runs a little small. I usually wear a medium but needed a large. Once I got the right size, it was perfect. The quality is exceptional.",
            verified: true
        },
        {
            id: 3,
            name: "Jessica Williams",
            rating: 5,
            date: "3 months ago",
            comment: "The craftsmanship is outstanding. Every stitch is perfect and the fabric feels amazing. This is my go-to dress for special occasions.",
            verified: false
        }
    ];
    
    // Update rating summary
    updateRatingSummary(sampleReviews);
    
    // Display reviews
    let reviewsHtml = '';
    sampleReviews.forEach(review => {
        reviewsHtml += `
            <div class="review-item border-bottom pb-4 mb-4">
                <div class="d-flex justify-content-between mb-2">
                    <div>
                        <h6 class="mb-0">${review.name}</h6>
                        <div class="stars small">
                            ${generateStarRating(review.rating)}
                            ${review.verified ? '<span class="badge bg-success ms-2">Verified Purchase</span>' : ''}
                        </div>
                    </div>
                    <small class="text-muted">${review.date}</small>
                </div>
                <p class="mb-0">${review.comment}</p>
            </div>
        `;
    });
    
    reviewsContainer.innerHTML = reviewsHtml;
}

/**
 * Update rating summary
 */
function updateRatingSummary(reviews) {
    // Calculate average rating
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    
    // Update average rating display
    const avgRatingElement = document.querySelector('.average-rating');
    if (avgRatingElement) {
        avgRatingElement.textContent = averageRating.toFixed(1);
    }
    
    // Update star display
    const starsElement = document.querySelector('.rating-stars');
    if (starsElement) {
        starsElement.innerHTML = generateStarRating(averageRating);
    }
    
    // Update rating distribution
    updateRatingDistribution(reviews);
}

/**
 * Update rating distribution
 */
function updateRatingDistribution(reviews) {
    // Count ratings
    const ratingCounts = {5: 0, 4: 0, 3: 0, 2: 0, 1: 0};
    
    reviews.forEach(review => {
        const rating = Math.round(review.rating);
        if (ratingCounts[rating] !== undefined) {
            ratingCounts[rating]++;
        }
    });
    
    // Update progress bars
    for (let i = 5; i >= 1; i--) {
        const count = ratingCounts[i] || 0;
        const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
        
        const progressBar = document.querySelector(`.rating-${i}-stars .progress-bar`);
        if (progressBar) {
            progressBar.style.width = `${percentage}%`;
        }
        
        const countElement = document.querySelector(`.rating-${i}-stars .rating-count`);
        if (countElement) {
            countElement.textContent = count;
        }
        
        const percentageElement = document.querySelector(`.rating-${i}-stars .rating-percentage`);
        if (percentageElement) {
            percentageElement.textContent = `${percentage.toFixed(0)}%`;
        }
    }
}

/**
 * Set star rating in review form
 */
function setStarRating(rating) {
    const starsContainer = document.querySelector('.star-rating-input');
    if (!starsContainer) return;
    
    // Update star display
    const stars = starsContainer.querySelectorAll('.star-input');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.innerHTML = '<i class="fas fa-star text-warning"></i>';
        } else {
            star.innerHTML = '<i class="far fa-star text-warning"></i>';
        }
    });
    
    // Update hidden input
    const ratingInput = document.getElementById('reviewRating');
    if (ratingInput) {
        ratingInput.value = rating;
    }
}

/**
 * Submit review
 */
function submitReview(form) {
    // Get form data
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const rating = formData.get('rating');
    const comment = formData.get('comment');
    
    // Validate form
    if (!name || !email || !rating || !comment) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // In a real app, this would submit to a server
    // For demo purposes, we'll show a success message
    
    showNotification('Thank you for your review! It will be published after moderation.', 'success');
    
    // Reset form
    form.reset();
    
    // Reset star rating
    setStarRating(0);
}

/**
 * Validate email
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Initialize share functionality
 */
function initShareProduct() {
    const shareBtn = document.getElementById('shareProduct');
    
    if (shareBtn && navigator.share) {
        shareBtn.style.display = 'block';
        
        shareBtn.addEventListener('click', async function() {
            try {
                await navigator.share({
                    title: document.title,
                    text: 'Check out this amazing product!',
                    url: window.location.href
                });
                
                showNotification('Product shared successfully!', 'success');
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('Share failed:', err);
                    showNotification('Sharing failed. Please try again.', 'error');
                }
            }
        });
    } else if (shareBtn) {
        // Fallback for browsers that don't support Web Share API
        shareBtn.addEventListener('click', function() {
            // Copy URL to clipboard
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                showNotification('Product link copied to clipboard!', 'success');
            }).catch(err => {
                console.error('Copy failed:', err);
                showNotification('Failed to copy link. Please copy the URL manually.', 'error');
            });
        });
    }
}

/**
 * Initialize product video
 */
function initProductVideo() {
    const videoBtn = document.querySelector('.video-play-btn');
    const videoModal = document.getElementById('productVideoModal');
    
    if (videoBtn && videoModal) {
        videoBtn.addEventListener('click', function() {
            const video = videoModal.querySelector('video');
            if (video) {
                video.play();
            }
        });
        
        // Pause video when modal is closed
        videoModal.addEventListener('hidden.bs.modal', function() {
            const video = this.querySelector('video');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        });
    }
}

/**
 * Initialize availability check
 */
function initAvailabilityCheck() {
    // Check availability on page load
    const activeSize = document.querySelector('.size-option.active');
    if (activeSize) {
        checkSizeAvailability(activeSize.textContent);
    }
    
    // Check availability when size changes
    document.querySelectorAll('.size-option').forEach(option => {
        option.addEventListener('click', function() {
            setTimeout(() => {
                checkSizeAvailability(this.textContent);
            }, 100);
        });
    });
}

/**
 * Initialize related products carousel
 */
function initRelatedProductsCarousel() {
    const carousel = document.getElementById('relatedProductsCarousel');
    if (!carousel) return;
    
    // Initialize Bootstrap carousel
    const bsCarousel = new bootstrap.Carousel(carousel, {
        interval: 5000,
        wrap: true
    });
    
    // Add touch/swipe support
    let startX = 0;
    let endX = 0;
    
    carousel.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });
    
    carousel.addEventListener('touchmove', function(e) {
        endX = e.touches[0].clientX;
    });
    
    carousel.addEventListener('touchend', function() {
        const threshold = 50;
        
        if (startX - endX > threshold) {
            // Swipe left - next slide
            bsCarousel.next();
        } else if (endX - startX > threshold) {
            // Swipe right - previous slide
            bsCarousel.prev();
        }
    });
}

/**
 * Initialize size guide
 */
function initSizeGuide() {
    const sizeGuideBtn = document.querySelector('[data-bs-target="#sizeGuideModal"]');
    const sizeGuideModal = document.getElementById('sizeGuideModal');
    
    if (sizeGuideBtn && sizeGuideModal) {
        // Add click tracking
        sizeGuideBtn.addEventListener('click', function() {
            console.log('Size guide opened');
        });
        
        // Initialize size calculator if exists
        const sizeCalculator = sizeGuideModal.querySelector('.size-calculator');
        if (sizeCalculator) {
            initSizeCalculator(sizeCalculator);
        }
    }
}

/**
 * Initialize size calculator
 */
function initSizeCalculator(calculator) {
    const form = calculator.querySelector('form');
    const result = calculator.querySelector('.size-result');
    
    if (form && result) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get measurements
            const bust = parseFloat(form.querySelector('#bustMeasurement').value);
            const waist = parseFloat(form.querySelector('#waistMeasurement').value);
            const hips = parseFloat(form.querySelector('#hipsMeasurement').value);
            
            // Validate inputs
            if (!bust || !waist || !hips) {
                showNotification('Please enter all measurements', 'error');
                return;
            }
            
            // Calculate size (simplified algorithm)
            let size = '';
            const avg = (bust + waist + hips) / 3;
            
            if (avg < 33) size = 'XS';
            else if (avg < 35) size = 'S';
            else if (avg < 37) size = 'M';
            else if (avg < 39) size = 'L';
            else if (avg < 41) size = 'XL';
            else size = 'XXL';
            
            // Display result
            result.innerHTML = `
                <div class="alert alert-info">
                    <h5 class="alert-heading">Recommended Size: ${size}</h5>
                    <p class="mb-0">Based on your measurements:</p>
                    <ul class="mb-0">
                        <li>Bust: ${bust} in</li>
                        <li>Waist: ${waist} in</li>
                        <li>Hips: ${hips} in</li>
                    </ul>
                    <hr>
                    <p class="mb-0 small">Note: This is a general recommendation. For best fit, refer to the detailed size chart.</p>
                </div>
            `;
            
            // Scroll to result
            result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }
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