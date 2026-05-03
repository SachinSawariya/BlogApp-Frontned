import { useState, useEffect, useCallback } from "react";
import commonApi from "@/api";
import { Article } from "../types/articlesTypes";
import { transformArticles } from "@/utils/articleTransformer";

interface ArticleSection {
  category: string;
  articles: Article[];
}

export const useArticles = (initialData?: any[]) => {
  const [sections, setSections] = useState<
    Array<{
      category: string;
      articles: Article[];
    }>
  >(initialData || []);
  const [isLoading, setIsLoading] = useState(!initialData);
  const [error, setError] = useState<Error | null>(null);

  const fetchArticleSections = useCallback(async () => {
    if (initialData && initialData.length > 0) return;
    
    try {
      setIsLoading(true);
      const response = await commonApi({
        action: "getArticleSections",
      });
      const transformedSections = (response.data || []).map((section: ArticleSection) => ({
        ...section,
        articles: transformArticles(section.articles)
      }));

      setSections(transformedSections);
    } catch (err) {
      console.error("Error fetching article sections:", err);
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to fetch article sections")
      );
    } finally {
      setIsLoading(false);
    }
  }, [initialData]);

  useEffect(() => {
    fetchArticleSections();
  }, [fetchArticleSections]);

  return {
    sections,
    isLoading,
    error,
    refresh: fetchArticleSections,
  };
};
