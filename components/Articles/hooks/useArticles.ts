import { useState, useEffect, useCallback } from "react";
import commonApi from "@/api";
import { Article } from "../types/articlesTypes";

export const useArticles = () => {
  const [sections, setSections] = useState<
    Array<{
      category: string;
      articles: Article[];
    }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchArticleSections = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await commonApi({
        action: "getArticleSections",
      });

      console.log("response", response);

      setSections(response.data);
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
  }, []);

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
