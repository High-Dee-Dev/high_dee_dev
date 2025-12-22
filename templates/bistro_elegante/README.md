# Bistro Elegante - Restaurant & Cafe Website Template
A beautiful, modern, and conversion-focused website template for restaurants and cafes. Built with Bootstrap 5, plain HTML, CSS, and vanilla JavaScript. Perfect for restaurant owners who want a professional online presence that drives reservations and orders.

## Quick Start
1. Download the files and extract to your project folder
2. Open index.html in your browser to view the site locally
3. For local development, use a local server:
   Using Python:
   python -m http.server 8000

   Using Node.js (if you have http-server installed):
   npx http-server

   Using PHP:
   php -S localhost:8000

File Structure
```
bistro-elegante/
├── index.html              # Homepage with hero, featured menu, testimonials
├── menu.html              # Full menu with filtering and categories
├── menu-item.html         # Individual dish detail pages
├── reservations.html      # Reservation booking page
├── order.html            # Online ordering placeholder
├── about.html            # Our story, team, and hours
├── events.html           # Events and private dining
├── contact.html          # Contact form and information
├── css/
│   └── styles.css        # Main stylesheet with CSS variables
├── js/
│   ├── main.js           # All interactive functionality
│   └── config.js         # Brand configuration and copy
├── assets/               # Images and static files
└── project-data.json     # Sample data for dynamic content
```
## Customization Guide
### First Steps (TODO)
1. Update Brand Colors - Edit CSS variables in css/styles.css:
   :root {
     --brand: #c17c54;    # Your primary color
     --accent: #8b4513;   # Your accent color
     ...
   }

2. Replace Logo - Add your logo files:
   - assets/logo.svg (for light backgrounds)
   - assets/logo-light.svg (for dark backgrounds)
   - Update paths in config.js

3. Update Hero Copy - Edit in js/config.js:
   copy: {
     hero: {
       title: 'Your restaurant headline',
       subtitle: 'Your compelling subheadline',
        ...
     }
   }

4. Contact Information - Update in js/config.js:
   contact: {
     phone: '+1234567890',
     email: 'your@restaurant.com',
     address: { # your address # }
   }

### Color Palettes
Two pre-designed color palettes are included:
***Warm Palette (Default)***
- Primary: #c17c54 (Warm brown)
- Great for cozy cafes and rustic restaurants

***Modern Palette (Commented)***
- Primary: #2c5530 (Forest green)
- Perfect for upscale bistros and modern eateries

Uncomment the modern palette in css/styles.css to switch.

## Image Assets
### Required Images
Download these high-quality images from Unsplash (free for commercial use):
1. Hero Image - assets/hero-restaurant-01.jpg
   - URL: https://images.unsplash.com/photo-1517248135467-4c7edcad34c4
   - Photographer: Unsplash+
   - Alt: Elegant dining table setting at restaurant

2. Menu Category Images
   - Starters: assets/category-starters.jpg
   - Mains: assets/category-mains.jpg 
   - Desserts: assets/category-desserts.jpg
   - Drinks: assets/category-drinks.jpg

3. Dish Photos
   - Salmon: assets/dish-salmon.jpg
   - Pasta: assets/dish-pasta.jpg
   - Steak: assets/dish-steak.jpg
   - Bruschetta: assets/dish-bruschetta.jpg

4. Team & Interior
   - Chef: assets/chef-profile.jpg
   - Restaurant: assets/restaurant-interior.jpg
   - Team members (3-4 images)

### Image Optimization
For best performance:
- Convert images to WebP format
- Resize hero images to 1920×800px
- Dish photos: 800×800px
- Team photos: 400×400px
- Use loading="lazy" for below-fold images

## Accessibility Checklist
- [ ] All images have descriptive alt text
- [ ] Proper heading hierarchy (h1 > h2 > h3)
- [ ] Sufficient color contrast (WCAG AA)
- [ ] Keyboard navigation works
- [ ] Form fields have proper labels
- [ ] ARIA attributes on dynamic content
- [ ] Skip navigation link
- [ ] Focus indicators visible

## SEO Checklist
- [ ] Unique title tags on each page
- [ ] Meta descriptions for all pages
- [ ] Open Graph tags implemented
- [ ] JSON-LD structured data
- [ ] Semantic HTML structure
- [ ] XML sitemap (to be added)
- [ ] robots.txt (to be added)

## Analytics & Tracking
### Setup Instructions
1. Google Analytics 4
   - Replace GA_TRACKING_ID in config.js
   - Add script to index.html head

2. Conversion Tracking
   - Reservation form submissions
   - Order button clicks
   - Phone number clicks
   - Newsletter signups

### A/B Test Suggestions
1. Hero CTA Test
   - Variation A: "Reserve Table" (current)
   - Variation B: "Book Your Experience"

2. Newsletter Incentive
   - Variation A: "10% off first reservation"
   - Variation B: "Free dessert with booking"

## Going Live Checklist
- [ ] Compress and optimize all images
- [ ] Convert images to WebP format
- [ ] Update all TODO markers in code
- [ ] Test on different devices and browsers
- [ ] Set up real reservation system
- [ ] Implement payment processing
- [ ] Add privacy policy and terms pages
- [ ] Set up email service for forms
- [ ] Configure SSL certificate
- [ ] Submit to Google My Business

## Backend Integration
### Reservation System
Replace the placeholder reservation form with:
Option 1: OpenTable
- Add OpenTable widget script
- Update reservation form to redirect to OpenTable

Option 2: Custom Backend
- Example API integration
async function submitReservation(formData) {
  const response = await fetch('/api/reservations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  return response.json();
}

### Online Ordering
For real ordering functionality:
1. Set up a backend (Node.js, Python, PHP)
2. Integrate payment processor (Stripe, Square, PayPal)
3. Update order form in order.html
4. Implement real cart functionality

Important: Never include API keys in client-side code!

## Troubleshooting
### Fonts Not Loading
- Check Google Fonts link in HTML
- Ensure internet connection
- Verify font family names in CSS

### Icons Not Showing
- Confirm Font Awesome CDN link
- Check internet connection
- Verify icon class names

### Forms Not Submitting
- Check JavaScript console for errors
- Verify all required fields
- Ensure no conflicting Bootstrap versions

### Mobile Issues
- Test with browser dev tools
- Check viewport meta tag
- Verify responsive breakpoints

## Design Decisions
### Why This Layout Works
1. Hero + Sticky Reservation - Immediate call-to-action reduces bounce rate
2. Menu-First Approach - Food imagery drives appetite and engagement
3. Progressive Disclosure - Information revealed as user scrolls
4. Multiple Conversion Paths - Reservations, orders, events, newsletter

### Performance Choices
1. Vanilla JavaScript - No framework overhead
2. Bootstrap CDN - Cached across sites
3. Lazy Loading - Images load as needed
4. Minimal Dependencies - Fast initial load

## Next Steps
### Immediate (Week 1)
- [ ] Add your restaurant's actual menu items
- [ ] Upload professional photos
- [ ] Set up Google My Business
- [ ] Connect social media accounts

### Short-term (Month 1)
- [ ] Implement real reservation system
- [ ] Set up email marketing
- [ ] Add blog/content section
- [ ] Implement review system

### Long-term (Quarter 1)
- [ ] Add online ordering with payments
- [ ] Implement loyalty program
- [ ] Add table management system
- [ ] Integrate with delivery platforms

## Support
This template is designed to be self-explanatory for developers. For questions:
1. Check the inline code comments
2. Review this README thoroughly
3. Check browser console for errors
4. Validate HTML structure

## License
MIT License - feel free to use for personal and commercial projects.