import ArticlesPageComponent from "@/components/Articles/Article-page";
import { Metadata } from "next";
import commonApi from "@/api";
import { Article } from "@/components/Articles/types/articlesTypes";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Browse our complete collection of articles on AI, Machine Learning, Web Development, and more. Stay ahead with Gyanvora.",
  alternates: {
    canonical: "https://gyanvora.vercel.app/articles",
  },
  openGraph: {
    title: "All Articles | Gyanvora",
    description: "Explore the latest insights and tutorials on Gyanvora.",
    url: "https://gyanvora.vercel.app/articles",
  },
};

export default async function ArticlesPage() {
  let sections: { category: string; articles: Article[] }[] = [];
  try {
    const response = await commonApi({ action: "getBlogList" });
    const articles: Article[] = response.data || [];
    
    // Group articles by category
    const grouped = articles.reduce((acc: Record<string, Article[]>, article) => {
      const catName = typeof article.category === 'string' ? article.category : article.category.name;
      if (!acc[catName]) acc[catName] = [];
      acc[catName].push(article);
      return acc;
    }, {});

    sections = Object.keys(grouped).map(cat => ({
      category: cat,
      articles: grouped[cat]
    }));
  } catch (error) {
    console.error("Error fetching articles for SSR:", error);
  }

  return <ArticlesPageComponent initialSections={sections} />;
}
