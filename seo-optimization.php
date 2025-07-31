<?php
/**
 * Automultiservice SAS - SEO Optimization Class
 * Comprehensive SEO enhancements and structured data implementation
 */

class SEOOptimizer {
    private $siteUrl;
    private $siteName;
    private $defaultImage;
    private $businessInfo;

    public function __construct() {
        $this->siteUrl = 'https://automultiservice.it';
        $this->siteName = 'Automultiservice SAS';
        $this->defaultImage = '/images/automultiservice-og-image.jpg';
        $this->businessInfo = [
            'name' => 'Automultiservice SAS',
            'address' => [
                'streetAddress' => 'Via Example 123',
                'addressLocality' => 'Milano',
                'postalCode' => '20100',
                'addressCountry' => 'IT'
            ],
            'telephone' => '+39 02 1234567',
            'email' => 'info@automultiservice.it',
            'url' => 'https://automultiservice.it',
            'logo' => 'https://automultiservice.it/images/logo.png',
            'priceRange' => '€€',
            'paymentAccepted' => ['Cash', 'Credit Card', 'Bank Transfer'],
            'currenciesAccepted' => 'EUR',
            'openingHours' => [
                'Mo-Fr 08:00-18:00',
                'Sa 09:00-13:00'
            ]
        ];
    }

    /**
     * Generate complete HTML head section with SEO optimization
     */
    public function generateHead($pageData = []) {
        $title = $this->generateTitle($pageData);
        $description = $this->generateDescription($pageData);
        $keywords = $this->generateKeywords($pageData);
        $canonicalUrl = $this->generateCanonicalUrl($pageData);
        $ogImage = $pageData['image'] ?? $this->defaultImage;

        ob_start();
        ?>
        <!-- Primary Meta Tags -->
        <title><?php echo htmlspecialchars($title); ?></title>
        <meta name="title" content="<?php echo htmlspecialchars($title); ?>">
        <meta name="description" content="<?php echo htmlspecialchars($description); ?>">
        <meta name="keywords" content="<?php echo htmlspecialchars($keywords); ?>">
        <meta name="author" content="<?php echo htmlspecialchars($this->siteName); ?>">
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
        <meta name="language" content="Italian">
        <meta name="revisit-after" content="7 days">
        
        <!-- Canonical URL -->
        <link rel="canonical" href="<?php echo htmlspecialchars($canonicalUrl); ?>">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="<?php echo $pageData['type'] ?? 'website'; ?>">
        <meta property="og:url" content="<?php echo htmlspecialchars($canonicalUrl); ?>">
        <meta property="og:title" content="<?php echo htmlspecialchars($title); ?>">
        <meta property="og:description" content="<?php echo htmlspecialchars($description); ?>">
        <meta property="og:image" content="<?php echo htmlspecialchars($this->siteUrl . $ogImage); ?>">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:site_name" content="<?php echo htmlspecialchars($this->siteName); ?>">
        <meta property="og:locale" content="it_IT">
        
        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="<?php echo htmlspecialchars($canonicalUrl); ?>">
        <meta property="twitter:title" content="<?php echo htmlspecialchars($title); ?>">
        <meta property="twitter:description" content="<?php echo htmlspecialchars($description); ?>">
        <meta property="twitter:image" content="<?php echo htmlspecialchars($this->siteUrl . $ogImage); ?>">
        
        <!-- Mobile & Viewport -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
        <meta name="theme-color" content="#1e40af">
        <meta name="msapplication-TileColor" content="#1e40af">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="default">
        <meta name="apple-mobile-web-app-title" content="<?php echo htmlspecialchars($this->siteName); ?>">
        
        <!-- Favicons -->
        <link rel="icon" type="image/x-icon" href="/favicon.ico">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1e40af">
        
        <!-- Web App Manifest -->
        <link rel="manifest" href="/manifest.json">
        
        <!-- Preconnect to external domains -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="preconnect" href="https://www.google-analytics.com">
        
        <!-- DNS Prefetch -->
        <link rel="dns-prefetch" href="//fonts.googleapis.com">
        <link rel="dns-prefetch" href="//fonts.gstatic.com">
        <link rel="dns-prefetch" href="//www.google-analytics.com">
        
        <!-- Structured Data -->
        <?php echo $this->generateStructuredData($pageData); ?>
        
        <?php
        return ob_get_clean();
    }

    /**
     * Generate page title with SEO optimization
     */
    private function generateTitle($pageData) {
        if (isset($pageData['title'])) {
            return $pageData['title'] . ' | ' . $this->siteName;
        }
        
        $titles = [
            'home' => $this->siteName . ' - Servizi Automobilistici Professionali a Milano',
            'services' => 'Servizi - ' . $this->siteName,
            'about' => 'Chi Siamo - ' . $this->siteName,
            'contact' => 'Contatti - ' . $this->siteName,
            'service-detail' => ($pageData['service_name'] ?? 'Servizio') . ' - ' . $this->siteName
        ];
        
        return $titles[$pageData['page'] ?? 'home'] ?? $this->siteName;
    }

    /**
     * Generate meta description
     */
    private function generateDescription($pageData) {
        if (isset($pageData['description'])) {
            return $pageData['description'];
        }
        
        $descriptions = [
            'home' => 'Automultiservice SAS offre servizi automobilistici professionali a Milano: manutenzione, riparazioni, assistenza stradale 24/7. Esperienza decennale, personale qualificato.',
            'services' => 'Scopri tutti i servizi automobilistici di Automultiservice: manutenzione, riparazioni, tagliandi, assistenza stradale. Qualità e professionalità garantite.',
            'about' => 'Automultiservice SAS: la tua officina di fiducia a Milano. Esperienza decennale nel settore automobilistico, personale qualificato e attrezzature all\'avanguardia.',
            'contact' => 'Contatta Automultiservice per i tuoi servizi automobilistici. Siamo a Milano, disponibili per assistenza e preventivi gratuiti. Chiamaci o scrivici.',
        ];
        
        return $descriptions[$pageData['page'] ?? 'home'] ?? 'Automultiservice SAS - Servizi automobilistici professionali a Milano';
    }

    /**
     * Generate keywords
     */
    private function generateKeywords($pageData) {
        $baseKeywords = [
            'automultiservice',
            'officina milano',
            'servizi automobilistici',
            'riparazione auto',
            'manutenzione veicoli',
            'assistenza stradale',
            'meccanico milano',
            'tagliando auto',
            'gommista milano',
            'carrozzeria'
        ];
        
        if (isset($pageData['keywords'])) {
            $baseKeywords = array_merge($baseKeywords, $pageData['keywords']);
        }
        
        return implode(', ', array_unique($baseKeywords));
    }

    /**
     * Generate canonical URL
     */
    private function generateCanonicalUrl($pageData) {
        $path = $pageData['path'] ?? '/';
        return rtrim($this->siteUrl, '/') . '/' . ltrim($path, '/');
    }

    /**
     * Generate structured data (JSON-LD)
     */
    public function generateStructuredData($pageData = []) {
        $structuredData = [];
        
        // Organization Schema
        $structuredData[] = [
            '@context' => 'https://schema.org',
            '@type' => 'AutoRepair',
            'name' => $this->businessInfo['name'],
            'address' => [
                '@type' => 'PostalAddress',
                'streetAddress' => $this->businessInfo['address']['streetAddress'],
                'addressLocality' => $this->businessInfo['address']['addressLocality'],
                'postalCode' => $this->businessInfo['address']['postalCode'],
                'addressCountry' => $this->businessInfo['address']['addressCountry']
            ],
            'telephone' => $this->businessInfo['telephone'],
            'email' => $this->businessInfo['email'],
            'url' => $this->businessInfo['url'],
            'logo' => $this->businessInfo['logo'],
            'priceRange' => $this->businessInfo['priceRange'],
            'paymentAccepted' => $this->businessInfo['paymentAccepted'],
            'currenciesAccepted' => $this->businessInfo['currenciesAccepted'],
            'openingHours' => $this->businessInfo['openingHours'],
            'areaServed' => [
                '@type' => 'City',
                'name' => 'Milano'
            ],
            'serviceType' => [
                'Manutenzione Auto',
                'Riparazione Veicoli',
                'Assistenza Stradale',
                'Tagliandi',
                'Gommista',
                'Carrozzeria'
            ]
        ];

        // Website Schema
        $structuredData[] = [
            '@context' => 'https://schema.org',
            '@type' => 'WebSite',
            'name' => $this->siteName,
            'url' => $this->siteUrl,
            'potentialAction' => [
                '@type' => 'SearchAction',
                'target' => $this->siteUrl . '/search?q={search_term_string}',
                'query-input' => 'required name=search_term_string'
            ]
        ];

        // Breadcrumb Schema (if provided)
        if (isset($pageData['breadcrumbs'])) {
            $breadcrumbList = [
                '@context' => 'https://schema.org',
                '@type' => 'BreadcrumbList',
                'itemListElement' => []
            ];
            
            foreach ($pageData['breadcrumbs'] as $index => $breadcrumb) {
                $breadcrumbList['itemListElement'][] = [
                    '@type' => 'ListItem',
                    'position' => $index + 1,
                    'name' => $breadcrumb['name'],
                    'item' => $breadcrumb['url']
                ];
            }
            
            $structuredData[] = $breadcrumbList;
        }

        // Service Schema (for service pages)
        if ($pageData['page'] === 'service-detail' && isset($pageData['service'])) {
            $service = $pageData['service'];
            $structuredData[] = [
                '@context' => 'https://schema.org',
                '@type' => 'Service',
                'name' => $service['name'],
                'description' => $service['description'],
                'provider' => [
                    '@type' => 'AutoRepair',
                    'name' => $this->businessInfo['name']
                ],
                'areaServed' => [
                    '@type' => 'City',
                    'name' => 'Milano'
                ],
                'hasOfferCatalog' => [
                    '@type' => 'OfferCatalog',
                    'name' => 'Servizi Automobilistici',
                    'itemListElement' => [
                        [
                            '@type' => 'Offer',
                            'itemOffered' => [
                                '@type' => 'Service',
                                'name' => $service['name']
                            ]
                        ]
                    ]
                ]
            ];
        }

        // Generate JSON-LD output
        $output = '';
        foreach ($structuredData as $data) {
            $output .= '<script type="application/ld+json">' . json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
        }
        
        return $output;
    }

    /**
     * Generate XML Sitemap
     */
    public function generateSitemap($pages = []) {
        $defaultPages = [
            [
                'url' => '/',
                'lastmod' => date('Y-m-d'),
                'changefreq' => 'weekly',
                'priority' => '1.0'
            ],
            [
                'url' => '/servizi',
                'lastmod' => date('Y-m-d'),
                'changefreq' => 'monthly',
                'priority' => '0.8'
            ],
            [
                'url' => '/chi-siamo',
                'lastmod' => date('Y-m-d'),
                'changefreq' => 'monthly',
                'priority' => '0.6'
            ],
            [
                'url' => '/contatti',
                'lastmod' => date('Y-m-d'),
                'changefreq' => 'monthly',
                'priority' => '0.7'
            ]
        ];

        $allPages = array_merge($defaultPages, $pages);

        header('Content-Type: application/xml; charset=utf-8');
        
        echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
        
        foreach ($allPages as $page) {
            echo '  <url>' . "\n";
            echo '    <loc>' . htmlspecialchars($this->siteUrl . $page['url']) . '</loc>' . "\n";
            echo '    <lastmod>' . $page['lastmod'] . '</lastmod>' . "\n";
            echo '    <changefreq>' . $page['changefreq'] . '</changefreq>' . "\n";
            echo '    <priority>' . $page['priority'] . '</priority>' . "\n";
            echo '  </url>' . "\n";
        }
        
        echo '</urlset>';
    }

    /**
     * Generate robots.txt
     */
    public function generateRobotsTxt() {
        header('Content-Type: text/plain; charset=utf-8');
        
        echo "User-agent: *\n";
        echo "Allow: /\n";
        echo "Disallow: /admin/\n";
        echo "Disallow: /tmp/\n";
        echo "Disallow: /cache/\n";
        echo "Disallow: /includes/\n";
        echo "Disallow: *.log\n";
        echo "\n";
        echo "Sitemap: " . $this->siteUrl . "/sitemap.xml\n";
    }

    /**
     * Generate meta tags for social media sharing
     */
    public function generateSocialMeta($data) {
        $title = $data['title'] ?? $this->siteName;
        $description = $data['description'] ?? '';
        $image = $data['image'] ?? $this->defaultImage;
        $url = $data['url'] ?? $this->siteUrl;

        return [
            'og:title' => $title,
            'og:description' => $description,
            'og:image' => $this->siteUrl . $image,
            'og:url' => $url,
            'og:type' => $data['type'] ?? 'website',
            'twitter:card' => 'summary_large_image',
            'twitter:title' => $title,
            'twitter:description' => $description,
            'twitter:image' => $this->siteUrl . $image
        ];
    }
}

// Usage examples:
/*
$seo = new SEOOptimizer();

// In your page header:
echo $seo->generateHead([
    'page' => 'home',
    'title' => 'Custom Page Title',
    'description' => 'Custom description',
    'image' => '/images/custom-image.jpg',
    'path' => '/',
    'breadcrumbs' => [
        ['name' => 'Home', 'url' => '/']
    ]
]);

// For sitemap.xml:
$seo->generateSitemap();

// For robots.txt:
$seo->generateRobotsTxt();
*/
?>