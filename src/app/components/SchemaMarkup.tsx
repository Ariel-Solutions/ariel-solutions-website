export default function SchemaMarkup() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Ariel Solutions",
    "image": "https://arielsolutions.arian.my/logo.webp",
    "@id": "https://arielsolutions.arian.my/",
    "url": "https://arielsolutions.arian.my/",

    "telephone": "+855-969-030-402", // replace with real number

    "address": {
      "@type": "PostalAddress",
      "streetAddress": "St. 1932, Phnom Penh",
      "addressLocality": "Phnom Penh",
      "addressRegion": "Phnom Penh",
      "postalCode": "12000",
      "addressCountry": "KH"
    },

    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],

    "sameAs": [
      // add socials here later
      "https://web.facebook.com/profile.php?id=61587138651324",
      "https://linkedin.com/company/arielsolutions"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
