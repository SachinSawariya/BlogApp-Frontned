import { useState, useEffect, useCallback } from "react";
import commonApi from "@/api";
import { Article } from "../../Articles/types/articlesTypes";
import { transformArticles } from "@/utils/articleTransformer";

export const useFeaturedArticles = (initialData?: Article[]) => {
  const [articles, setArticles] = useState<Article[]>(initialData || []);
  const [isLoading, setIsLoading] = useState(!(initialData && initialData.length > 0));
  const [error, setError] = useState<Error | null>(null);

  const fetchFeaturedArticles = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await commonApi({
        action: "getFeaturedArticles",
      });

      const featuredArticles = transformArticles(response.data);
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
    if (initialData && initialData.length > 0) {
      setArticles(initialData);
      setIsLoading(false);
    }
  }, [initialData]);

  useEffect(() => {
    if (articles.length === 0 && isLoading) {
      fetchFeaturedArticles();
    }
  }, [fetchFeaturedArticles, articles.length, isLoading]);

  return {
    articles,
    isLoading,
    error,
    refresh: fetchFeaturedArticles,
  };
};
