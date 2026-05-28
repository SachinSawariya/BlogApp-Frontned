import { useState, useEffect, useCallback } from "react";
import commonApi from "@/api";
import { transformCategories, Category } from "@/utils/categoryTransformer";

export const useCategories = (initialData?: Category[]) => {
  const [categories, setCategories] = useState<Category[]>(initialData || []);
  const [isLoading, setIsLoading] = useState(!(initialData && initialData.length > 0));
  const [error, setError] = useState<Error | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await commonApi({
        action: "getTopCategories",
      });

      const categoriesData = transformCategories(response.data);
      setCategories(categoriesData);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to fetch categories")
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      setCategories(initialData);
      setIsLoading(false);
    }
  }, [initialData]);

  useEffect(() => {
    if (categories.length === 0 && isLoading) {
      fetchCategories();
    }
  }, [fetchCategories, categories.length, isLoading]);

  return {
    categories,
    isLoading,
    error,
    refresh: fetchCategories,
  };
};
