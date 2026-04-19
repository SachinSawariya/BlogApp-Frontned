import { useState, useEffect, useCallback } from "react";
import commonApi from "@/api";
import { transformCategories, Category } from "@/utils/categoryTransformer";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await commonApi({
        action: "getTopCategories",
      });

      console.log("Categories response:", response);

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
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    isLoading,
    error,
    refresh: fetchCategories,
  };
};
