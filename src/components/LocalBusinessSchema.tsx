const LocalBusinessSchema = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": "https://www.boldremo.com/#organization",
    "name": "BoldREMO LLC",
    "alternateName": "BoldREMO Luxury Bathroom Remodeling",
    "description": "BoldREMO LLC is a professional luxury bathroom remodeling and tile installation contractor serving Houston, The Heights, Bellaire, River Oaks & Kingwood TX. Specializing in luxury bathroom renovations, walk-in showers, custom tile work, and flooring installation.",
    "url": "https://www.boldremo.com",
    "telephone": "+1-832-513-5737",
    "email": "info@boldremo.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Houston",
      "addressRegion": "TX",
      "postalCode": "77007",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "29.7604",
      "longitude": "-95.3698"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Houston",
        "sameAs": "https://en.wikipedia.org/wiki/Houston"
      },
      {
        "@type": "Neighborhood",
        "name": "The Heights",
        "containedInPlace": {
          "@type": "City",
          "name": "Houston"
        }
      },
      {
        "@type": "Neighborhood",
        "name": "River Oaks",
        "containedInPlace": {
          "@type": "City",
          "name": "Houston"
        }
      },
      {
        "@type": "Neighborhood",
        "name": "Bellaire",
        "containedInPlace": {
          "@type": "City",
          "name": "Houston"
        }
      },
      {
        "@type": "Neighborhood",
        "name": "Kingwood",
        "containedInPlace": {
          "@type": "City",
          "name": "Houston"
        }
      }
    ],
    "serviceType": [
      "Luxury Bathroom Remodeling",
      "Bathroom Renovation",
      "Walk-in Shower Installation",
      "Tile Installation",
      "Flooring Installation",
      "Custom Vanity Installation",
      "Shower Remodel",
      "Bathtub to Shower Conversion",
      "Spa Bathroom Design"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Luxury Bathroom Remodeling Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Complete Bathroom Remodeling",
            "description": "Full luxury bathroom renovation including fixtures, tile, vanities, and more"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Tile & Flooring Installation",
            "description": "Professional tile and flooring installation for bathrooms, kitchens, and living spaces"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Walk-in Shower Installation",
            "description": "Custom walk-in shower design and installation with modern features"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Luxury Spa Bathroom",
            "description": "Premium spa-inspired bathroom design and build with high-end finishes"
          }
        }
      ]
    },
    "priceRange": "$$-$$$",
    "paymentAccepted": ["Cash", "Check", "Credit Card"],
    "currenciesAccepted": "USD",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "14:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/BoldREMOllc/",
      "https://www.instagram.com/boldremo_llc/",
      "https://www.linkedin.com/company/boldremo",
      "https://youtube.com/@boldremo"
    ],
    "image": "https://www.boldremo.com/og-image.jpg",
    "logo": "https://www.boldremo.com/favicon.png"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default LocalBusinessSchema;
