/**
 * Thoughtful Reads - Theme Toggle Functionality
 * 
 * Handles light/dark mode switching with localStorage persistence.
 * Includes system preference detection and smooth transitions.
 * 
 * @version 1.0.0
 * @license MIT
 */

// Theme Toggle Functionality
class ThemeToggle {
    constructor() {
        this.theme = 'light';
        this.init();
    }
    
    init() {
        this.loadTheme();
        this.createToggleButtons();
        this.setupEventListeners();
    }
    
    loadTheme() {
        const savedTheme = localStorage.getItem('thoughtful-reads-theme');
        if (savedTheme) {
            this.theme = savedTheme;
        } else {
            this.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        this.applyTheme(this.theme);
    }
    
    createToggleButtons() {
        const buttons = document.querySelectorAll('.theme-toggle');
        buttons.forEach(button => {
            button.innerHTML = this.theme === 'light' 
                ? '<i class="fas fa-moon" aria-hidden="true"></i>'
                : '<i class="fas fa-sun" aria-hidden="true"></i>';
            
            // Update aria-label
            const nextTheme = this.theme === 'light' ? 'dark' : 'light';
            button.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
        });
    }
    
    setupEventListeners() {
        // Toggle theme when any theme button is clicked
        document.querySelectorAll('.theme-toggle').forEach(button => {
            button.addEventListener('click', () => {
                this.toggleTheme();
            });
        });
        
        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem('thoughtful-reads-theme')) {
                    this.theme = e.matches ? 'dark' : 'light';
                    this.applyTheme(this.theme);
                    this.createToggleButtons();
                }
            });
        }
    }
    
    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.theme);
        this.saveTheme();
        this.createToggleButtons();
    }
    
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update meta theme-color for mobile browsers
        const color = theme === 'dark' ? '#1a1a1a' : '#2c5530';
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        metaThemeColor.content = color;
    }
    
    saveTheme() {
        localStorage.setItem('thoughtful-reads-theme', this.theme);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme toggle
    window.themeToggle = new ThemeToggle();
    
    // Mobile search functionality
    const searchForms = document.querySelectorAll('.search-form');
    searchForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = this.querySelector('.search-input').value.trim();
            if (query.length >= 2) {
                // In a real implementation, you would handle the search
                alert(`Searching for: "${query}"\n\nThis would redirect to search results in a production environment.`);
                
                // Close offcanvas if it's open
                const offcanvas = document.getElementById('mobileMenu');
                const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
                if (bsOffcanvas) {
                    bsOffcanvas.hide();
                }
            } else {
                alert('Please enter at least 2 characters to search.');
            }
        });
    });
});

// class ThemeToggle {
//     constructor() {
//         this.theme = 'light';
//         this.toggleButton = null;
//         this.transitionDuration = 300;
        
//         this.init();
//     }
    
//     /**
//      * Initialize theme toggle functionality
//      */
//     init() {
//         this.loadTheme();
//         this.createToggleButton();
//         this.setupEventListeners();
//         this.applyTheme(this.theme, false); // Apply without transition on init
//     }
    
//     /**
//      * Load theme preference from localStorage or system preference
//      */
//     loadTheme() {
//         // Check localStorage first
//         const savedTheme = localStorage.getItem('thoughtful-reads-theme');
        
//         if (savedTheme) {
//             this.theme = savedTheme;
//         } else {
//             // Check system preference
//             this.theme = this.getSystemTheme();
//         }
//     }
    
//     /**
//      * Get system theme preference
//      * @returns {string} 'dark' or 'light'
//      */
//     getSystemTheme() {
//         if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//             return 'dark';
//         }
//         return 'light';
//     }
    
//     /**
//      * Create and inject theme toggle button into DOM
//      */
//     createToggleButton() {
//         // Check if button already exists
//         if (document.getElementById('theme-toggle')) {
//             this.toggleButton = document.getElementById('theme-toggle');
//             return;
//         }
        
//         // Create toggle button
//         this.toggleButton = document.createElement('button');
//         this.toggleButton.id = 'theme-toggle';
//         this.toggleButton.className = 'btn btn-outline-secondary btn-sm theme-toggle';
//         this.toggleButton.setAttribute('aria-label', 'Toggle dark mode');
//         this.toggleButton.setAttribute('title', 'Toggle dark/light mode');
        
//         // Set initial icon
//         this.updateToggleIcon();
        
//         // Add to DOM - try to find a good location
//         const header = document.querySelector('.site-header');
//         if (header) {
//             const navbarCollapse = header.querySelector('.navbar-collapse');
//             if (navbarCollapse) {
//                 // Add to navbar
//                 const toggleContainer = document.createElement('div');
//                 toggleContainer.className = 'd-flex align-items-center ms-2';
//                 toggleContainer.appendChild(this.toggleButton);
//                 navbarCollapse.querySelector('.navbar-nav').appendChild(toggleContainer);
//             } else {
//                 // Fallback: add to header
//                 header.appendChild(this.toggleButton);
//             }
//         } else {
//             // Final fallback: add to body
//             document.body.appendChild(this.toggleButton);
//         }
        
//         // Add CSS for positioning
//         this.addToggleStyles();
//     }
    
//     /**
//      * Add CSS styles for theme toggle button
//      */
//     addToggleStyles() {
//         const styles = `
//             .theme-toggle {
//                 border: 1px solid var(--border-color);
//                 background: var(--bg-light);
//                 color: var(--text-dark);
//                 width: 40px;
//                 height: 40px;
//                 border-radius: 50%;
//                 display: flex;
//                 align-items: center;
//                 justify-content: center;
//                 transition: all 0.3s ease;
//             }
            
//             .theme-toggle:hover {
//                 background: var(--bg-card);
//                 transform: scale(1.1);
//             }
            
//             .theme-toggle:focus {
//                 outline: 2px solid var(--accent-color);
//                 outline-offset: 2px;
//             }
            
//             [data-theme="dark"] .theme-toggle {
//                 background: var(--bg-card);
//                 border-color: var(--border-color);
//                 color: var(--text-dark);
//             }
            
//             @media (max-width: 991.98px) {
//                 .theme-toggle {
//                     margin: 0.5rem 1rem;
//                     align-self: flex-start;
//                 }
//             }
//         `;
        
//         const styleSheet = document.createElement('style');
//         styleSheet.textContent = styles;
//         document.head.appendChild(styleSheet);
//     }
    
//     /**
//      * Set up event listeners for theme toggle
//      */
//     setupEventListeners() {
//         // Toggle button click
//         this.toggleButton.addEventListener('click', () => {
//             this.toggleTheme();
//         });
        
//         // Listen for system theme changes
//         if (window.matchMedia) {
//             const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
//             mediaQuery.addEventListener('change', (e) => {
//                 // Only update if user hasn't set a manual preference
//                 if (!localStorage.getItem('thoughtful-reads-theme')) {
//                     this.theme = e.matches ? 'dark' : 'light';
//                     this.applyTheme(this.theme);
//                 }
//             });
//         }
        
//         // Add keyboard shortcut (Ctrl/Cmd + Shift + T)
//         document.addEventListener('keydown', (e) => {
//             if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
//                 e.preventDefault();
//                 this.toggleTheme();
//             }
//         });
//     }
    
//     /**
//      * Toggle between light and dark themes
//      */
//     toggleTheme() {
//         this.theme = this.theme === 'light' ? 'dark' : 'light';
//         this.applyTheme(this.theme);
//         this.saveTheme();
//         this.updateToggleIcon();
        
//         // Dispatch custom event for other components to listen to
//         window.dispatchEvent(new CustomEvent('themeChange', {
//             detail: { theme: this.theme }
//         }));
//     }
    
//     /**
//      * Apply theme to document
//      * @param {string} theme - Theme to apply ('light' or 'dark')
//      * @param {boolean} withTransition - Whether to apply transition
//      */
//     applyTheme(theme, withTransition = true) {
//         // Add transition class for smooth change
//         if (withTransition) {
//             document.documentElement.classList.add('theme-transition');
            
//             // Remove transition class after animation
//             setTimeout(() => {
//                 document.documentElement.classList.remove('theme-transition');
//             }, this.transitionDuration);
//         }
        
//         // Set data-theme attribute
//         document.documentElement.setAttribute('data-theme', theme);
        
//         // Update meta theme-color for mobile browsers
//         this.updateMetaThemeColor(theme);
//     }
    
//     /**
//      * Update mobile browser theme color
//      * @param {string} theme - Current theme
//      */
//     updateMetaThemeColor(theme) {
//         let metaThemeColor = document.querySelector('meta[name="theme-color"]');
//         const color = theme === 'dark' ? '#1a1a1a' : '#2c5530';
        
//         if (!metaThemeColor) {
//             metaThemeColor = document.createElement('meta');
//             metaThemeColor.name = 'theme-color';
//             document.head.appendChild(metaThemeColor);
//         }
        
//         metaThemeColor.content = color;
//     }
    
//     /**
//      * Update toggle button icon based on current theme
//      */
//     updateToggleIcon() {
//         const icon = this.theme === 'light' ? 'moon' : 'sun';
//         this.toggleButton.innerHTML = `<i class="fas fa-${icon}" aria-hidden="true"></i>`;
        
//         // Update aria-label
//         const nextTheme = this.theme === 'light' ? 'dark' : 'light';
//         this.toggleButton.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
//     }
    
//     /**
//      * Save theme preference to localStorage
//      */
//     saveTheme() {
//         localStorage.setItem('thoughtful-reads-theme', this.theme);
//     }
    
//     /**
//      * Get current theme
//      * @returns {string} Current theme
//      */
//     getCurrentTheme() {
//         return this.theme;
//     }
    
//     /**
//      * Set theme programmatically
//      * @param {string} theme - Theme to set ('light' or 'dark')
//      */
//     setTheme(theme) {
//         if (theme === 'light' || theme === 'dark') {
//             this.theme = theme;
//             this.applyTheme(this.theme);
//             this.saveTheme();
//             this.updateToggleIcon();
//         }
//     }
    
//     /**
//      * Reset to system preference
//      */
//     resetToSystem() {
//         localStorage.removeItem('thoughtful-reads-theme');
//         this.theme = this.getSystemTheme();
//         this.applyTheme(this.theme);
//         this.updateToggleIcon();
//     }
// }

// // Initialize theme toggle when DOM is loaded
// document.addEventListener('DOMContentLoaded', () => {
//     window.themeToggle = new ThemeToggle();
// });

// // Add CSS for smooth theme transitions
// const transitionStyles = `
//     .theme-transition * {
//         transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
//     }
// `;

// const styleSheet = document.createElement('style');
// styleSheet.textContent = transitionStyles;
// document.head.appendChild(styleSheet);

// // Export for module use
// if (typeof module !== 'undefined' && module.exports) {
//     module.exports = ThemeToggle;
// }