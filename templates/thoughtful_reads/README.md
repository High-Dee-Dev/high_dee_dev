# Thoughtful Reads - Premium Blog & Magazine Template
A beautiful, modern, and conversion-optimized blog and magazine template built with Bootstrap 5, featuring dark mode, responsive design, and comprehensive monetization features.

## Features

### Core Features
* Bootstrap 5.3 - Latest version with responsive grid system
* Dark/Light Mode - Toggle with localStorage persistence
* Semantic HTML5 - Accessible and SEO-friendly markup
* Vanilla JavaScript - No heavy frameworks, just clean code
* CSS Custom Properties - Easy theming and customization
* Font Awesome Icons - Consistent iconography throughout

### Performance & SEO
* Critical CSS Inlining - Above-the-fold optimization
* Lazy Loading Images - Improved page load times
* Structured Data - JSON-LD for articles and organization
* Open Graph Tags - Social media sharing optimization
* Accessibility - WCAG 2.1 compliant with ARIA labels

### Conversion & Monetization
* Newsletter Signup Forms - Multiple placement options
* Affiliate CTA Blocks - Ready for product promotions
* Ad Placeholders - Standard ad sizes included
* Featured Content Areas - Highlight premium content
* Social Sharing - Easy content distribution

## Quick Start

### Option 1: Simple Setup (No Build Tools)
1. Download the template files
2. Open index.html in your browser
3. Start customizing the HTML and CSS

### Option 2: Development Setup (Recommended)
1. Clone or download the template files
2. Install Node.js (if not already installed)
3. Install dependencies:
   npm install
4. Start development server:
   npm run dev
5. Customize styles (if using Sass):
   npm run sass:watch

## Customization Guide

### Changing Colors
Edit the CSS custom properties in assets/css/main.css:
```
:root {
  --primary-color: #2c5530;      /* Main brand color */
  --secondary-color: #4a7c59;    /* Secondary brand color */
  --accent-color: #8fb996;       /* Accent color for highlights */
  --text-dark: #1a1a1a;          /* Main text color */
  /* ... more variables */
}
```
### Changing Fonts
Update the font variables in the same file:
```
:root {
  --font-heading: 'Georgia', serif;          /* Headings font */
  --font-body: 'Inter', sans-serif;          /* Body text font */
}
```
### Adding New Components
1. Create your component HTML in the components/ directory
2. Add styles to assets/css/_components.scss
3. Include the component using server-side includes or manually

### Customizing the Hero Section
Edit the hero section in index.html:
```
<section class="hero-section">
  <div class="hero-content">
    <span class="hero-badge">Your Badge Text</span>
    <h1 class="hero-title">Your Headline</h1>
    <p class="hero-subtitle">Your compelling subtitle</p>
    <!-- Call-to-action buttons -->
  </div>
</section>
```
## Pages Included
### Homepage (index.html)
* Hero section with featured story
* Trending topics ticker
* Featured posts grid
* Latest articles
* Newsletter CTA section
* Sidebar with widgets

### Article Page (post.html)
* Full article content
* Author bio box
* Social sharing buttons
* Recommended articles
* Comments section
* Newsletter signup

### Category Page (category.html)
* Category header with description
* Filterable article grid
* Pagination
* Category-specific sidebar

### About Page (about.html)
* Mission statement
* Team members
* Values section
* Call-to-action

### Contact Page (contact.html)
* Contact form
* Multiple contact methods
* FAQ section
* Office location

## Build Tools
### Available Scripts
* npm run dev - Start live development server
* npm run sass:watch - Watch and compile Sass files
* npm run sass:build - Build Sass files once
* npm run build - Build for production
* npm run validate - Validate HTML files

### Sass Structure
// _variables.scss - Design tokens
// _components.scss - Component styles
// main.css - Compiled output (includes both above)

## SEO & Accessibility
### SEO Features
* Semantic HTML5 markup
* JSON-LD structured data
* Meta descriptions and Open Graph tags
* Clean URL structure
* Image optimization with srcset

### Accessibility Features
* ARIA labels and roles
* Keyboard navigation support
* Skip to content links
* High contrast text
* Focus indicators

## Monetization Features
### Built-in Revenue Streams
1. Newsletter Signups - Multiple placement options
2. Affiliate Marketing - Ready-to-use CTA blocks
3. Ad Placeholders - Standard ad sizes (300x250, 728x90, etc.)
4. Sponsored Content - Featured article spots
5. Product Promotions - Custom CTA sections

### Conversion Optimization
* Strategic CTA placement
* Social proof elements
* Urgency and scarcity cues
* Multiple contact points
* A/B test ready components

## Dark Mode Implementation
The template includes a complete dark mode implementation:
```
// Toggle dark/light mode
themeToggle.toggleTheme();

// Set specific theme
themeToggle.setTheme('dark');

// Reset to system preference
themeToggle.resetToSystem();
```
## Performance Optimization
### Core Web Vitals
* LCP: Hero image optimized with srcset
* FID: Minimal JavaScript with progressive enhancement
* CLS: Stable layout with proper image dimensions

### Loading Strategies
* Critical CSS inlined in <head>
* Lazy loading for below-fold images
* Font preloading and optimization
* Minimal render-blocking resources

## Browser Support
* Chrome (last 2 versions)
* Firefox (last 2 versions)
* Safari (last 2 versions)
* Edge (last 2 versions)

## Content Management
### Using with Static Site Generators
The template is compatible with popular SSGs:
* Jekyll: Use Liquid includes for components
* Hugo: Use partials for components
* 11ty: Use Nunjucks or Handlebars
* Gatsby: Convert to React components

### Sample Content
Replace the demo content in demo-data/posts.json with your own articles. The template will automatically populate pages with this data.

## Deployment
### Static Hosting
The template works with any static hosting service:
* Netlify: Drag and drop the folder
* Vercel: Connect your Git repository
* GitHub Pages: Push to your repository
* Traditional hosting: Upload via FTP

### Build for Production
npm run build
This will compile Sass files and optimize assets for production.

## Support
### Documentation
* This README file
* Inline code comments
* Component documentation in HTML files

### Common Customizations
* Changing colors: Edit CSS custom properties
* Adding pages: Duplicate existing pages and modify content
* Custom components: Add to components/ directory
* New layouts: Modify the grid system in HTML

### Troubleshooting
1. Styles not loading: Check CSS file paths
2. JavaScript errors: Check browser console for details
3. Images not showing: Verify image paths and file names
4. Mobile issues: Test with browser developer tools

## License
This template is licensed under the MIT License. You are free to use, modify, and distribute this template for personal and commercial projects.

## Credits
* Bootstrap 5 - CSS framework
* Font Awesome - Icons
* Unsplash - Demo images
* Google Fonts - Typography

---
Happy publishing! If you have any questions or need help customizing the template, please refer to the code comments or create an issue in the repository.

Built with care for content creators and publishers worldwide.