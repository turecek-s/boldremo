const LocalBusinessSchema = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": "https://boldremo.com/#organization",
    "name": "BoldREMO",
    "alternateName": "BoldREMO Bathroom Remodeling",
    "description": "Professional bathroom remodeling and tile installation contractor serving Houston, Heights, Bellaire, River Oaks & Kingwood TX. Specializing in luxury bathroom renovations, walk-in showers, custom tile work, and flooring installation.",
    "url": "https://boldremo.com",
    "telephone": "+1-713-396-7116",
    "email": "boldremo@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Houston",
      "addressRegion": "TX",
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
        "name": "Heights"
      },
      {
        "@type": "Neighborhood",
        "name": "Bellaire"
      },
      {
        "@type": "Neighborhood",
        "name": "River Oaks"
      },
      {
        "@type": "Neighborhood",
        "name": "Kingwood"
      }
    ],
    "serviceType": [
      "Bathroom Remodeling",
      "Bathroom Renovation",
      "Walk-in Shower Installation",
      "Tile Installation",
      "Flooring Installation",
      "Custom Vanity Installation",
      "Shower Remodel",
      "Bathtub to Shower Conversion"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Bathroom Remodeling Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Complete Bathroom Remodeling",
            "description": "Full bathroom renovation including fixtures, tile, vanities, and more"
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
        }
      ]
    },
    "priceRange": "$$",
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
      "https://www.google.com/maps/place/BoldREMO"
    ],
    "image": "https://boldremo.com/og-image.jpg",
    "logo": "https://boldremo.com/favicon.ico"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default LocalBusinessSchema;
