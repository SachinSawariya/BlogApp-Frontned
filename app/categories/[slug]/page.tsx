import CategoryArticlesPageComponent from "@/components/Articles/CategoryArticlesPage";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

function formatSlug(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categoryName = formatSlug(slug);

  return {
    title: `${categoryName} Articles`,
    description: `Explore the latest articles and tutorials in ${categoryName}. Stay updated with expert insights on Gyanvora.`,
    openGraph: {
      title: `${categoryName} - AI & Development Insights`,
      description: `Browse our collection of articles about ${categoryName}.`,
      url: `https://gyanvora.vercel.app/categories/${slug}`,
    },
  };
}

export default async function CategoryArticlesPage({ params }: Props) {
  const { slug } = await params;
  const categoryName = formatSlug(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${categoryName} Articles`,
    description: `Browse our collection of articles about ${categoryName} on Gyanvora.`,
    url: `https://gyanvora.vercel.app/categories/${slug}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://gyanvora.vercel.app",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Categories",
          item: "https://gyanvora.vercel.app/categories",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: categoryName,
          item: `https://gyanvora.vercel.app/categories/${slug}`,
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CategoryArticlesPageComponent slug={slug} />
    </>
  );
}
