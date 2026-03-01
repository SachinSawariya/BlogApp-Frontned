import { useState, useEffect, useCallback } from "react";
import commonApi from "@/api";
import { Article } from "../../Articles/types/articlesTypes";

export const useFeaturedArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFeaturedArticles = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await commonApi({
        action: "getFeaturedArticles",
      });

      console.log("Featured articles response:", response);

      // Transform the response data to match our Article interface
      const featuredArticles: Article[] = response.data?.map((article: any) => ({
        id: article.id || article._id,
        title: article.title,
        content: article.content || article.excerpt || '',
        category: article.category,
        readTime: article.readTime || '5 min read',
        imageUrl: article.imageUrl || article.coverImage,
        slug: article.slug,
        likes: article.likes || 0,
        comments: 0 // Set default to 0 since comments field is not included in API response
      })) || [];

      setArticles(featuredArticles);
    } catch (err) {
      console.error("Error fetching featured articles:", err);
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to fetch featured articles")
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeaturedArticles();
  }, [fetchFeaturedArticles]);

  return {
    articles,
    isLoading,
    error,
    refresh: fetchFeaturedArticles,
  };
};
