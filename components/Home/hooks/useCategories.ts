import { useState, useEffect, useCallback } from "react";
import commonApi from "@/api";

export interface Category {
  name: string;
  count: number;
  slug: string;
  icon?: string;
}

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

      // Transform response data to match our Category interface
      const categoriesData: Category[] = response.data?.map((category: any) => ({
        name: category.name || category.title || 'Unknown',
        count: category.articleCount || category.count || 0,
        slug: category.slug || category.name?.toLowerCase().replace(/\s+/g, '-') || 'unknown',
        icon: category.icon || getCategoryIcon(category.name || category.title || 'Unknown')
      })) || [];

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

// Helper function to assign icons based on category names
const getCategoryIcon = (categoryName: string): string => {
  const name = categoryName.toLowerCase();
  
  if (name.includes('ai') || name.includes('machine learning') || name.includes('ml')) {
    return '🤖';
  } else if (name.includes('web') || name.includes('javascript') || name.includes('react')) {
    return '🌐';
  } else if (name.includes('data') || name.includes('analytics')) {
    return '📊';
  } else if (name.includes('cloud') || name.includes('aws') || name.includes('azure')) {
    return '☁️';
  } else if (name.includes('devops') || name.includes('docker') || name.includes('kubernetes')) {
    return '🔧';
  } else if (name.includes('mobile') || name.includes('ios') || name.includes('android')) {
    return '📱';
  } else if (name.includes('security') || name.includes('cyber')) {
    return '🔒';
  } else if (name.includes('database') || name.includes('sql')) {
    return '🗄️';
  } else if (name.includes('python') || name.includes('programming')) {
    return '🐍';
  } else if (name.includes('design') || name.includes('ui') || name.includes('ux')) {
    return '🎨';
  } else {
    return '📚'; // Default icon
  }
};
