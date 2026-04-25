import { Article } from "../components/Articles/types/articlesTypes";

/**
 * Transforms article data from the API format to the frontend Article interface.
 * Handles differences in ID fields and ensures all required fields have defaults.
 * 
 * @param apiArticle - The article object returned from the API
 * @returns A formatted Article object for use in the frontend
 */
export const transformArticle = (apiArticle: any): Article => {
  if (!apiArticle) return {} as Article;

  return {
    _id: apiArticle.id || apiArticle._id || '',
    title: apiArticle.title || 'Untitled',
    content: apiArticle.content || apiArticle.excerpt || '',
    category: apiArticle.category || 'Uncategorized',
    slug: apiArticle.slug || '',
    readTime: apiArticle.readTime || '5 min read',
    coverImage: apiArticle.imageUrl || apiArticle.coverImage || '',
    likes: apiArticle.likes || 0,
    comments: apiArticle.comments || 0,
    views: apiArticle.views || 0,
    authorName: apiArticle.authorName || 'Anonymous',
    createdAt: apiArticle.createdAt || new Date().toISOString()
  };
};

/**
 * Transforms an array of API article objects.
 * 
 * @param apiArticles - Array of article objects from the API
 * @returns Array of transformed Article objects
 */
export const transformArticles = (apiArticles: any[]): Article[] => {
  if (!Array.isArray(apiArticles)) return [];
  return apiArticles.map(transformArticle);
};
