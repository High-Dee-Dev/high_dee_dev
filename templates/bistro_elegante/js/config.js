/**
 * Bistro Elegante - Configuration File
 * TODO: Update these values for your restaurant
 * This file contains all brand-specific configuration and copy
 */

window.siteConfig = {
    // Brand Identity
    brand: {
        name: 'Bistro Elegante',
        tagline: 'Modern Dining Experience',
        logo: {
            light: 'assets/logo.svg',
            dark: 'assets/logo-light.svg',
            alt: 'Bistro Elegante Restaurant Logo'
        },
        colors: {
            primary: '#c17c54',    // Warm brown
            secondary: '#8b4513',  // Darker brown
            accent: '#d89c7c'      // Light brown
        },
        // Alternative color palette (modern)
        // colors: {
        //     primary: '#2c5530',    // Forest green
        //     secondary: '#1e3a24',  // Dark green
        //     accent: '#d4af37'      // Gold
        // }
    },

    // Contact Information
    contact: {
        phone: '+15551234567',
        formattedPhone: '(555) 123-4567',
        email: 'hello@bistroelegante.com',
        address: {
            street: '123 Gourmet Avenue',
            city: 'Food City',
            state: 'FC',
            zip: '12345',
            full: '123 Gourmet Avenue, Food City, FC 12345'
        },
        coordinates: {
            lat: 40.7128,
            lng: -74.0060
        }
    },

    // Business Hours
    hours: {
        monday: { open: '17:00', close: '22:00' },
        tuesday: { open: '17:00', close: '22:00' },
        wednesday: { open: '17:00', close: '22:00' },
        thursday: { open: '17:00', close: '22:00' },
        friday: { open: '17:00', close: '23:00' },
        saturday: { open: '17:00', close: '23:00' },
        sunday: { open: '10:00', close: '15:00' }
    },

    // Social Media Links
    social: {
        facebook: 'https://facebook.com/bistroelegante',
        instagram: 'https://instagram.com/bistroelegante',
        twitter: 'https://twitter.com/bistroelegante',
        tripadvisor: 'https://tripadvisor.com/Restaurant_Review-bistroelegante'
    },

    // Site Copy - Update these for your restaurant's voice
    copy: {
        // Hero Section
        hero: {
            title: 'Reserve a table. Taste the difference.',
            subtitle: 'From our kitchen to your table — simple, seasonal, delicious.',
            cta: {
                primary: 'Reserve Table',
                secondary: 'View Menu'
            }
        },

        // CTAs throughout the site
        ctas: {
            reserve: 'Reserve Table',
            order: 'Order Online',
            menu: 'View Menu',
            events: 'View Events',
            contact: 'Contact Us'
        },

        // Reservation microcopy
        reservation: {
            title: 'Reserve Your Table',
            description: 'Book your table for an unforgettable dining experience',
            policy: `We'll only use your email to confirm your booking — no spam. Please allow 15 minutes for seating during peak hours.`,
            success: 'Reservation request submitted! We will confirm via email shortly.'
        },

        // Ordering microcopy
        ordering: {
            pickup: 'Pickup',
            delivery: 'Delivery',
            addToCart: 'Add to Order',
            cartEmpty: 'Your cart is empty',
            orderNote: 'Pre-order for pickup or delivery'
        },

        // Newsletter
        newsletter: {
            title: 'Join Our Newsletter',
            description: 'Get 10% off your first reservation and be the first to know about special events and seasonal menus.',
            incentive: 'Subscribe & Get 10% Off'
        },

        // Testimonials
        testimonials: [
            {
                text: "The most memorable dining experience we've had this year. Every dish was a masterpiece, and the service was impeccable.",
                author: "Sarah Johnson",
                role: "Local Food Critic"
            },
            {
                text: "Perfect for our anniversary dinner. The ambiance, food, and attention to detail made it a night we'll never forget.",
                author: "Michael Chen",
                role: "Regular Guest"
            }
        ],

        // Menu Categories
        menuCategories: {
            starters: {
                title: 'Starters',
                description: 'Light beginnings to awaken your palate'
            },
            mains: {
                title: 'Main Courses',
                description: 'Hearty dishes that tell a story'
            },
            desserts: {
                title: 'Desserts',
                description: 'Sweet endings to remember'
            },
            drinks: {
                title: 'Drinks',
                description: 'Curated wines and signature cocktails'
            }
        }
    },

    // Features Toggle
    features: {
        enableOrdering: true,
        enableReservations: true,
        enableEvents: true,
        enableNewsletter: true,
        enableTestimonials: true,
        enableGallery: true
    },

    // Analytics & Tracking
    analytics: {
        // TODO: Add your analytics IDs
        googleAnalytics: 'GA_TRACKING_ID', // GA4 Measurement ID
        googleTagManager: 'GTM_CONTAINER_ID',
        facebookPixel: 'FB_PIXEL_ID'
    },

    // Integration Placeholders
    integrations: {
        reservation: {
            openTable: '#', // OpenTable widget URL
            resy: '#'       // Resy integration URL
        },
        ordering: {
            // Placeholder for ordering system integration
            apiEndpoint: '/api/orders',
            paymentProcessor: 'stripe' // or 'square', 'paypal', etc.
        },
        maps: {
            googleMaps: 'https://maps.google.com/?q=123+Gourmet+Avenue+Food+City+FC+12345'
        }
    },

    // SEO Defaults
    seo: {
        defaultTitle: 'Bistro Elegante | Modern Dining Experience',
        defaultDescription: 'Experience fine dining at Bistro Elegante. Reserve your table for an unforgettable culinary journey with seasonal ingredients and expert craftsmanship.',
        defaultImage: 'assets/og-image.jpg',
        siteUrl: 'https://highdeedev.space/templates/bistro_elegante/',
        twitterHandle: '@bistroelegante'
    }
};

// Utility function to get formatted hours for display
function getFormattedHours() {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayNames = {
        monday: 'Mon-Thu',
        tuesday: 'Mon-Thu',
        wednesday: 'Mon-Thu',
        thursday: 'Mon-Thu',
        friday: 'Fri-Sat',
        saturday: 'Fri-Sat',
        sunday: 'Sunday'
    };
    
    const formatted = {};
    days.forEach(day => {
        const hours = window.siteConfig.hours[day];
        if (hours) {
            const openTime = formatTime(hours.open);
            const closeTime = formatTime(hours.close);
            formatted[dayNames[day]] = `${openTime} - ${closeTime}`;
        }
    });
    
    // Remove duplicates
    return Object.entries(formatted).reduce((acc, [day, hours]) => {
        if (!Object.values(acc).includes(hours)) {
            acc[day] = hours;
        }
        return acc;
    }, {});
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'pm' : 'am';
    const displayHour = hour % 12 || 12;
    return `${displayHour}${ampm}`;
}

// Make formatted hours available globally
window.siteConfig.formattedHours = getFormattedHours();