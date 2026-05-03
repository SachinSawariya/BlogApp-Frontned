import ArticleDetailComponent from "@/components/Article-details/ArticleDetailsPage";
import commonApi from "@/api";
import { Metadata, ResolvingMetadata } from "next";
import { Article } from "@/components/Articles/types/articlesTypes";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;

  try {
    const response = await commonApi({
      action: "getArticlBySlug",
      parameters: [slug],
    });
    const article: Article = response.data;

    if (!article) return { title: "Article Not Found" };

    const previousImages = (await parent).openGraph?.images || [];

    return {
      title: article.title,
      description: article.content
        ? article.content
            .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1") // Remove links but keep text
            .replace(/[#*`_~]/g, "") // Remove common markdown
            .substring(0, 160)
            .trim()
        : "Read this interesting article on Gyanvora.",

      alternates: {
        canonical: `https://gyanvora.vercel.app/articles/${slug}`,
      },
      openGraph: {
        title: article.title,
      description: article.content
        ? article.content
            .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1") // Remove links but keep text
            .replace(/[#*`_~]/g, "") // Remove common markdown
            .substring(0, 160)
            .trim()
        : "Read this interesting article on Gyanvora.",

        url: `https://gyanvora.vercel.app/articles/${slug}`,
        images: article.coverImage
          ? [article.coverImage, ...previousImages]
          : previousImages,
        type: "article",
        publishedTime: article.createdAt,
        authors: [article.authorName || "Gyanvora Team"],
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
      description: article.content
        ? article.content
            .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1") // Remove links but keep text
            .replace(/[#*`_~]/g, "") // Remove common markdown
            .substring(0, 160)
            .trim()
        : "Read this interesting article on Gyanvora.",

        images: article.coverImage ? [article.coverImage] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata for article:", error);
    return { title: "Article | Gyanvora" };
  }
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  let article: Article | undefined = undefined;
  let jsonLd = null;

  try {
    const response = await commonApi({
      action: "getArticlBySlug",
      parameters: [slug],
    });
    article = response.data;


    if (article) {
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: article.title,
      description: article.content
        ? article.content
            .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1") // Remove links but keep text
            .replace(/[#*`_~]/g, "") // Remove common markdown
            .substring(0, 160)
            .trim()
        : "Read this interesting article on Gyanvora.",

        image: article.coverImage,
        datePublished: article.createdAt,
        author: {
          "@type": "Person",
          name: article.authorName || "Gyanvora Team",
        },
        publisher: {
          "@type": "Organization",
          name: "Gyanvora",
          logo: {
            "@type": "ImageObject",
            url: "https://gyanvora.vercel.app/logo.png",
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://gyanvora.vercel.app/articles/${slug}`,
        },
      };
    }
  } catch (error) {
    console.error("Error fetching article for JSON-LD:", error);
  }

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ArticleDetailComponent initialArticle={article || undefined} />
    </>
  );
}
