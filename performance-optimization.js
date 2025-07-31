/**
 * Automultiservice SAS - Performance Optimization Script
 * Comprehensive performance enhancements for production deployment
 */

class PerformanceOptimizer {
    constructor() {
        this.lazyLoadObserver = null;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeOptimizations());
        } else {
            this.initializeOptimizations();
        }
    }

    initializeOptimizations() {
        this.setupImageLazyLoading();
        this.optimizeWebFonts();
        this.preloadCriticalResources();
        this.setupServiceWorker();
        this.optimizeAnimations();
        this.measurePerformance();
    }

    // Image Lazy Loading with WebP Support
    setupImageLazyLoading() {
        // Check for Intersection Observer support
        if (!('IntersectionObserver' in window)) {
            // Fallback: load all images immediately
            document.querySelectorAll('img[data-src]').forEach(img => {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
            });
            return;
        }

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });

        // Observe all lazy images
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.classList.add('lazy');
            imageObserver.observe(img);
        });

        this.lazyLoadObserver = imageObserver;
    }

    loadImage(img) {
        const src = img.dataset.src;
        const webpSrc = img.dataset.webp;
        
        // Check WebP support and use appropriate format
        if (webpSrc && this.supportsWebP()) {
            img.src = webpSrc;
        } else {
            img.src = src;
        }

        img.classList.remove('lazy');
        img.classList.add('loaded');

        // Remove data attributes to clean up DOM
        delete img.dataset.src;
        delete img.dataset.webp;
    }

    supportsWebP() {
        if (this.webpSupport !== undefined) {
            return this.webpSupport;
        }

        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        this.webpSupport = canvas.toDataURL('image/webp').indexOf('webp') > -1;
        return this.webpSupport;
    }

    // Web Font Optimization
    optimizeWebFonts() {
        // Preload critical fonts
        const criticalFonts = [
            '/fonts/inter-var.woff2',
            '/fonts/poppins-600.woff2'
        ];

        criticalFonts.forEach(font => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = font;
            link.as = 'font';
            link.type = 'font/woff2';
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });

        // Font display optimization
        if ('fonts' in document) {
            const fontPromises = [
                new FontFace('Inter', 'url(/fonts/inter-var.woff2)', {
                    display: 'swap',
                    weight: '100 900'
                }),
                new FontFace('Poppins', 'url(/fonts/poppins-600.woff2)', {
                    display: 'swap',
                    weight: '600'
                })
            ];

            fontPromises.forEach(font => {
                font.load().then(loadedFont => {
                    document.fonts.add(loadedFont);
                }).catch(error => {
                    console.warn('Font loading failed:', error);
                });
            });
        }
    }

    // Critical Resource Preloading
    preloadCriticalResources() {
        const criticalResources = [
            { href: '/css/critical.css', as: 'style' },
            { href: '/js/critical.js', as: 'script' },
            { href: '/images/hero-bg.webp', as: 'image' }
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            if (resource.as === 'image') {
                link.type = 'image/webp';
            }
            document.head.appendChild(link);
        });
    }

    // Service Worker Registration
    async setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('ServiceWorker registered:', registration);
            } catch (error) {
                console.warn('ServiceWorker registration failed:', error);
            }
        }
    }

    // Animation Performance
    optimizeAnimations() {
        // Reduce motion for users who prefer it
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--animation-duration', '0.01ms');
            document.documentElement.style.setProperty('--transition-duration', '0.01ms');
        }

        // Use requestAnimationFrame for smooth animations
        this.setupSmoothScrolling();
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Performance Monitoring
    measurePerformance() {
        if ('PerformanceObserver' in window) {
            // Measure Core Web Vitals
            this.measureLCP();
            this.measureFID();
            this.measureCLS();
        }

        // Measure custom metrics
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Performance Metrics:', {
                    'DOM Content Loaded': perfData.domContentLoadedEventEnd - perfData.navigationStart,
                    'Load Complete': perfData.loadEventEnd - perfData.navigationStart,
                    'First Paint': this.getFirstPaint(),
                    'First Contentful Paint': this.getFirstContentfulPaint()
                });
            }, 0);
        });
    }

    measureLCP() {
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
    }

    measureFID() {
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                console.log('FID:', entry.processingStart - entry.startTime);
            });
        }).observe({ entryTypes: ['first-input'] });
    }

    measureCLS() {
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            }
            console.log('CLS:', clsValue);
        }).observe({ entryTypes: ['layout-shift'] });
    }

    getFirstPaint() {
        const perfEntries = performance.getEntriesByType('paint');
        const fpEntry = perfEntries.find(entry => entry.name === 'first-paint');
        return fpEntry ? fpEntry.startTime : null;
    }

    getFirstContentfulPaint() {
        const perfEntries = performance.getEntriesByType('paint');
        const fcpEntry = perfEntries.find(entry => entry.name === 'first-contentful-paint');
        return fcpEntry ? fcpEntry.startTime : null;
    }
}

// Initialize performance optimizer
new PerformanceOptimizer();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceOptimizer;
}