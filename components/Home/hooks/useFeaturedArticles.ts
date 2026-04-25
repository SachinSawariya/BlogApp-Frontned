import { useState, useEffect, useCallback } from "react";
import commonApi from "@/api";
import { Article } from "../../Articles/types/articlesTypes";
import { transformArticles } from "@/utils/articleTransformer";

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
    fetchFeaturedArticles();
  }, [fetchFeaturedArticles]);

  return {
    articles,
    isLoading,
    error,
    refresh: fetchFeaturedArticles,
  };
};
