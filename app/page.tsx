import Overview from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gyanvora | Home",
  description:
    "Explore the latest in AI, Machine Learning, and Web Development. Expert tutorials and insights for modern developers.",
  openGraph: {
    title: "Gyanvora - AI for Developers",
    description:
      "Explore the latest in AI, Machine Learning, and Web Development.",
    url: "https://gyanvora.vercel.app",
    images: ["/home-og.png"],
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Gyanvora",
    url: "https://gyanvora.vercel.app",
    description:
      "Explore the latest in AI, Machine Learning, and Web Development. Expert tutorials and insights for modern developers.",
    publisher: {
      "@type": "Organization",
      name: "Gyanvora",
      logo: {
        "@type": "ImageObject",
        url: "https://gyanvora.vercel.app/logo.png",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Overview />
    </>
  );
}
