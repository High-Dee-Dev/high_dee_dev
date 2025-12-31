# AgencyPro - Modern Business Template
AgencyPro is a beautiful, fast, accessible, and conversion-focused one-page HTML template designed specifically for agencies and small businesses. Built with Bootstrap 5, modern HTML5, clean CSS, and lightweight vanilla JavaScript.

## Features

- Conversion-Optimized Design: Carefully crafted layout with clear CTAs and strategic placement
- Blazing Fast: Optimized assets, lazy loading, and minimal dependencies
- Fully Accessible: WCAG AA compliant with proper ARIA labels and keyboard navigation
- Mobile-First: Responsive design that works beautifully on all devices
- Easy to Customize: Well-commented code with CSS variables for quick theming
- Professional Sections: Hero, Services, Features, Portfolio, Pricing, Team, Testimonials, Contact, and Footer
- Interactive Elements: Smooth scrolling, testimonial slider, portfolio modal, form validation

## Quick Start

### Option 1: Basic Setup (No Build Tools)
1. Download the template
2. Open dist/index.html in your browser
3. Start editing the files in the dist/ folder

### Option 2: With Node.js (Optional)
Install dependencies:
npm install

Run development server:
npm start

Build for production:
npm run build

Run tests:
npm test

## Customization Guide

### Changing Colors
Edit the CSS variables at the top of assets/css/style.css:
```
:root {
    --primary-color: #4361ee;
    --secondary-color: #7209b7;
    --accent-color: #f72585;
    ... other variables ...
}
```
### Changing Fonts
Update the Google Fonts link in index.html:
```
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Merriweather:wght@300;400;700&display=swap" rel="stylesheet">
```
Then update the CSS variables:
```
:root {
    --font-heading: 'Your New Heading Font', serif;
    --font-body: 'Your New Body Font', sans-serif;
}
```
### Adding Portfolio Items
Edit the portfolioItems array in assets/js/main.js:
```
const portfolioItems = [
    {
        id: 1,
        title: "Your Project Title",
        image: "assets/img/your-image.jpg",
        description: "Project description...",
        technologies: "Tech stack used",
        timeline: "Project duration",
        link: "#",
        category: "web"
    },
    // Add more items...
];
```
Or load from JSON (see advanced customization section).

### Replacing Images
1. Replace placeholder images in assets/img/ folder
2. Update image references in HTML and JavaScript files
3. Optimize images for web (recommended: WebP format)

## Project Structure
```
bootstrap-multipurpose-onepage/
- dist/                      # Production files
-- index.html            # Main template (left-aligned hero)
-- index-alt.html        # Alternate template (centered hero)
-- assets/
--- css/
---- style.css     # Main stylesheet
--- js/
---- main.js       # Main JavaScript
--- img/              # All images
--- fonts/            # Local font files (optional)
-- demo.json             # Sample data
-- README.md             # This file
- src/                      # Source files (optional)
- package.json              # NPM configuration
- changelog.md              # Version history
- LICENSE                   # MIT License
```
## Advanced Customization

### Loading Data from JSON
The template includes a demo.json file. To use it:
```
// In main.js
fetch('demo.json')
    .then(response => response.json())
    .then(data => {
        // Use data.portfolio, data.testimonials, data.team
    });
```
### Adding Dark Mode
1. Add a toggle button in the navbar
2. Create dark mode CSS variables
3. Toggle a class on the body element
4. Store preference in localStorage

### Adding Animations
For subtle animations, consider using:
- CSS transitions (already included)
- Intersection Observer for scroll animations
- Animate.css library for more complex animations

## Performance Tips

1. Optimize Images: Convert to WebP format and compress
2. Minify Assets: Use build tools to minify CSS and JavaScript
3. Lazy Load: Images below the fold use loading="lazy"
4. Preload Critical Assets: Hero image is preloaded for LCP
5. Use CDNs: Bootstrap and Font Awesome loaded from CDNs

## Accessibility Checklist

- [ ] All images have descriptive alt text
- [ ] Proper heading hierarchy (h1 → h6)
- [ ] Sufficient color contrast (WCAG AA)
- [ ] Keyboard navigable (Tab, Enter, Space)
- [ ] ARIA labels for interactive elements
- [ ] Focus indicators visible
- [ ] Form fields properly labeled
- [ ] Skip to main content link (optional)

Run Lighthouse in Chrome DevTools for a complete audit.

## Image Credits

Hero Image: Photo by fauxels from Pexels  
Source: https://www.pexels.com/photo/people-working-in-the-office-7438107/

Portfolio Images: 
- work-1.jpg: Photo by Pixabay from Pexels
- work-2.jpg: Photo by Matheus Bertelli from Pexels
- work-3.jpg: Photo by Christina Morillo from Pexels
- work-4.jpg: Photo by Lukas from Pexels
- work-5.jpg: Photo by Marta Wave from Pexels
- work-6.jpg: Photo by Pixabay from Pexels

Team Images:
- team-1.jpg: Photo by Christina Morillo from Pexels
- team-2.jpg: Photo by Christina Morillo from Pexels
- team-3.jpg: Photo by Edmond Dantès from Pexels
- team-4.jpg: Photo by Edmond Dantès from Pexels

All images are from Pexels and are free for personal and commercial use. No attribution required, but appreciated.

## License

The template code is licensed under the MIT License - see the LICENSE file for details.

Images are not included in the license. Please ensure you have the right to use any images you replace them with, or use royalty-free images from sources like:
- Pexels: https://www.pexels.com/
- Unsplash: https://unsplash.com/
- Pixabay: https://pixabay.com/

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

IE11 is not supported. For IE11 support, consider adding polyfills.

## Support

Need help customizing the template? 

- Documentation: Refer to this README and code comments
- Issues: Check existing issues or create a new one
- Contact: For custom development work, contact your-email@example.com

## Changelog

See changelog.md for version history and updates.

## Credits

- Bootstrap 5: https://getbootstrap.com/ - CSS framework
- Font Awesome 6: https://fontawesome.com/ - Icons
- Google Fonts: https://fonts.google.com/ - Typography
- Pexels: https://www.pexels.com/ - Stock photos

---

Built with love for agencies and small businesses. If you use this template, a star or attribution is appreciated!