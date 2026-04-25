import { MetadataRoute } from "next";
import commonApi from "@/api";
import { Article } from "@/components/Articles/types/articlesTypes";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://gyanvora.vercel.app";

  // Fetch all articles
  let articles = [];
  try {
    const response = await commonApi({ action: "getBlogList" });
    articles = response.data || [];
  } catch (error) {
    console.error("Error fetching articles for sitemap:", error);
  }

  // Fetch all categories
  let categories = [];
  try {
    const response = await commonApi({ action: "getCategoriesList" });
    categories = response.data || [];
  } catch (error) {
    console.error("Error fetching categories for sitemap:", error);
  }

  const articleEntries: MetadataRoute.Sitemap = articles.map(
    (article: Article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: new Date(
        article.updatedAt || article.createdAt || new Date(),
      ),
      changeFrequency: "weekly",
      priority: 0.7,
    }),
  );

  const categoryEntries: MetadataRoute.Sitemap = categories.map(
    (category: Category) => ({
      url: `${baseUrl}/categories/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  return [...staticPages, ...articleEntries, ...categoryEntries];
}
