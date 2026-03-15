import { useState, useEffect, useCallback } from "react";
import commonApi from "@/api";
import { Article } from "@/components/Articles/types/articlesTypes";

export const useArticleDetail = (slug: string) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchArticleBySlug = useCallback(async () => {
    if (!slug) return;
    
    try {
      setIsLoading(true);
      const response = await commonApi({
        action: "getArticlBySlug",
        parameters: [slug],
      });

      setArticle(response.data);
    } catch (err) {
      console.error("Error fetching article by slug:", err);
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to fetch article")
      );
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchArticleBySlug();
  }, [fetchArticleBySlug]);

  return {
    article,
    isLoading,
    error,
    refresh: fetchArticleBySlug,
  };
};
