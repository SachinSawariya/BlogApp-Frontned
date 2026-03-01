"use client";
import Hero from './Hero';
import FeaturedPosts from './FeaturedPosts';
import Categories from './Categories';
import CallToAction from './CallToAction';
import { useFeaturedArticles } from './hooks/useFeaturedArticles';
import { useCategories } from './hooks/useCategories';

export default function HomePage() {
  const { articles: featuredPosts, isLoading: isLoadingFeatured, error: featuredError } = useFeaturedArticles();
  const { categories, isLoading: isLoadingCategories, error: categoriesError } = useCategories();

  // Show error state if there's an error
  if (featuredError || categoriesError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Hero />
        <div className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 mb-8">
              We're having trouble loading our content. Please try again later.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Hero />
      <FeaturedPosts posts={featuredPosts} isLoading={isLoadingFeatured} />
      <Categories categories={categories} isLoading={isLoadingCategories} />
      <CallToAction />
    </div>
  );
}
