import { useState, useEffect, useCallback } from "react";
import commonApi from "@/api";
import { Article } from "../types/articlesTypes";
import { transformArticles } from "@/utils/articleTransformer";

interface UseCategoryArticlesProps {
  slug: string;
  page?: number;
  limit?: number;
}

export const useCategoryArticles = ({
  slug,
  page = 1,
  limit = 12,
}: UseCategoryArticlesProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalArticles: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCategoryArticles = useCallback(async () => {
    if (!slug) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await commonApi({
        action: "getCategoryArticles",
        parameters: [slug, page, limit],
      });

      if (response.data && response.data.articles && response.data.pagination) {
        setArticles(transformArticles(response.data.articles));
        setPagination(response.data.pagination);
      } else {
        setArticles([]);
        setPagination({
          currentPage: 1,
          totalPages: 1,
          totalArticles: 0,
          hasNextPage: false,
          hasPrevPage: false,
        });
      }
    } catch (err) {
      console.error("Error fetching category articles:", err);
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to fetch category articles"),
      );
    } finally {
      setIsLoading(false);
    }
  }, [slug, page, limit]);

  useEffect(() => {
    fetchCategoryArticles();
  }, [fetchCategoryArticles]);

  return {
    articles,
    pagination,
    isLoading,
    error,
    refresh: fetchCategoryArticles,
  };
};
