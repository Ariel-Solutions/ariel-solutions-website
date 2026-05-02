export default function SchemaMarkup() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TechSolve Cambodia",
    "image": "https://techsolvecambodia.vercel.app/logo.webp",
    "@id": "https://techsolvecambodia.vercel.app/",
    "url": "https://techsolvecambodia.vercel.app/",

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
      // "https://facebook.com/techsolvecambodia",
      // "https://linkedin.com/company/techsolvecambodia"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
