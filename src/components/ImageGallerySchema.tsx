const ImageGallerySchema = () => {
  const galleryImages = [
    {
      name: "Luxury bathroom remodel with custom tile work in Houston Heights TX",
      description: "Professional bathroom remodeling featuring custom tile installation and modern fixtures by BoldREMO in Houston Heights, Texas",
      contentUrl: "https://boldremo.com/assets/gallery-1.jpg"
    },
    {
      name: "Modern bathroom renovation in Bellaire Houston",
      description: "Contemporary bathroom renovation with premium fixtures and finishes in Bellaire, Houston TX",
      contentUrl: "https://boldremo.com/assets/gallery-2.jpg"
    },
    {
      name: "Master bathroom transformation in River Oaks TX",
      description: "Elegant master bathroom remodel with walk-in shower and luxury finishes in River Oaks, Houston",
      contentUrl: "https://boldremo.com/assets/gallery-3.jpg"
    },
    {
      name: "Custom shower remodel with dual shower heads in Kingwood Houston",
      description: "Professional shower installation featuring dual shower heads in Kingwood, Texas",
      contentUrl: "https://boldremo.com/assets/showcase-1.jpg"
    },
    {
      name: "Professional bathroom tile installation in Houston Heights",
      description: "Expert tile installation by licensed bathroom remodeling contractor in Houston Heights TX",
      contentUrl: "https://boldremo.com/assets/showcase-2.jpg"
    },
    {
      name: "Contemporary bathroom renovation in Bellaire TX",
      description: "Modern bathroom design with custom vanity and tile work in Bellaire, Houston",
      contentUrl: "https://boldremo.com/assets/showcase-3.jpg"
    },
    {
      name: "Expert tile and flooring installation in River Oaks Houston",
      description: "Premium tile and flooring services for luxury homes in River Oaks, Texas",
      contentUrl: "https://boldremo.com/assets/showcase-4.jpg"
    },
    {
      name: "Luxury bathroom remodeling services in Kingwood Texas",
      description: "Complete bathroom renovation by BoldREMO serving Kingwood and greater Houston area",
      contentUrl: "https://boldremo.com/assets/showcase-5.jpg"
    }
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "BoldREMO Bathroom Remodeling Portfolio - Houston TX",
    "description": "Browse our gallery of bathroom remodeling and tile installation projects in Houston, Heights, Bellaire, River Oaks, and Kingwood Texas. See examples of our professional craftsmanship.",
    "url": "https://boldremo.com/gallery",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": galleryImages.map((img, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "ImageObject",
          "name": img.name,
          "description": img.description,
          "contentUrl": img.contentUrl,
          "license": "https://boldremo.com/about",
          "acquireLicensePage": "https://boldremo.com/contact",
          "creditText": "BoldREMO",
          "copyrightNotice": "© 2025 BoldREMO. All rights reserved.",
          "creator": {
            "@type": "Organization",
            "name": "BoldREMO"
          },
          "copyrightHolder": {
            "@type": "Organization",
            "name": "BoldREMO"
          }
        }
      }))
    },
    "author": {
      "@type": "Organization",
      "name": "BoldREMO",
      "url": "https://boldremo.com"
    },
    "about": [
      "Bathroom Remodeling",
      "Tile Installation",
      "Flooring Installation",
      "Shower Remodel",
      "Houston TX Contractor"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default ImageGallerySchema;
