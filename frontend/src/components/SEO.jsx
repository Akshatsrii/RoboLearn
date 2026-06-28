import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "RoboLearn — Robotics & STEM Education for Indian Schools",
  description = "RoboLearn provides complete robotics lab setup, student & teacher training, STEM kits, and curriculum solutions for Indian schools. CBSE-aligned, NEP 2020 ready.",
  image = "https://robolearn.in/og-image.jpg",
  url = "https://robolearn.in",
  type = "website",
}) => (
  <Helmet>
    {/* Primary */}
    <title>{title}</title>
    <meta name="description" content={description} />

    {/* Open Graph */}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={url} />
    <meta property="og:type" content={type} />
    <meta property="og:site_name" content="RoboLearn" />

    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />

    {/* Schema.org JSON-LD */}
    <script type="application/ld+json">{`
      {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": "RoboLearn",
        "description": "${description}",
        "url": "https://robolearn.in",
        "logo": "https://robolearn.in/logo.png",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Bhilwara",
          "addressRegion": "Rajasthan",
          "addressCountry": "IN"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "telephone": "+91-99999-99999"
        }
      }
    `}</script>
  </Helmet>
);

export default SEO;