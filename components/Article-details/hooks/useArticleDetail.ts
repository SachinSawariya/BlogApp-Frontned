import { useState, useEffect, useCallback } from "react";
import commonApi from "@/api";
import { Article } from "@/components/Articles/types/articlesTypes";

export const useArticleDetail = (slug: string, initialData?: Article | null) => {
  const [article, setArticle] = useState<Article | null>(initialData || null);
  const [isLoading, setIsLoading] = useState(!initialData);
  const [error, setError] = useState<Error | null>(null);

  const fetchArticleBySlug = useCallback(async () => {
    if (!slug || initialData) return;
    
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
  }, [slug, initialData]);

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
