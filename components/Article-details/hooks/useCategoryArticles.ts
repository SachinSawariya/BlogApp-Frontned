import { useState, useEffect, useCallback } from "react";
import commonApi from "@/api";
import { Article } from "@/components/Articles/types/articlesTypes";

export const useCategoryArticles = (categorySlug: string) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCategoryArticles = useCallback(async () => {
    if (!categorySlug) return;
    
    try {
      setIsLoading(true);
      const response = await commonApi({
        action: "getCategoryArticlesTitles",
        parameters: [categorySlug],
      });
      
      // Handle different response structures
      let articlesData = [];
      if (Array.isArray(response.data)) {
        articlesData = response.data;
      } else if (response.data && Array.isArray(response.data.articles)) {
        articlesData = response.data.articles;
      } else if (response.data && Array.isArray(response.data.data)) {
        articlesData = response.data.data;
      }
      
      setArticles(articlesData);
    } catch (err) {
      console.error("Error fetching category articles titles:", err);
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to fetch category articles titles")
      );
    } finally {
      setIsLoading(false);
    }
  }, [categorySlug]);

  useEffect(() => {
    fetchCategoryArticles();
  }, [fetchCategoryArticles]);

  return {
    articles,
    isLoading,
    error,
    refresh: fetchCategoryArticles,
  };
};
