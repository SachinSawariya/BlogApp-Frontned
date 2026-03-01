"use client";
import { useRouter } from "next/navigation";
import { FiFolder, FiPlus } from "react-icons/fi";
import CategoryCard from "@/shared/Card/CategoryCard";
import CategoryCardSkeleton from "@/shared/Skeleton/CategoryCardSkeleton";

const Categories = ({ categories, isLoading }) => {
  const router = useRouter();

  // Show skeleton loaders while loading
  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Browse by Category
            </h2>
            <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {[...Array(5)].map((_, index) => (
              <CategoryCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Handle empty state
  if (!categories || categories.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Browse by Category
          </h2>

          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiFolder className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No categories available yet
            </h3>
            <p className="text-gray-500 mb-6">
              Categories will appear here once articles are published.
            </p>
            <button
              onClick={() => router.push("/blog")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
            >
              <FiPlus className="w-4 h-4" />
              View All Categories
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Browse by Category
          </h2>
          <button
            onClick={() => router.push("/blog")}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
          >
            View All Categories
            <FiPlus className="ml-1 w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.slug || index}
              name={category.name}
              count={category.count}
              icon={category.icon}
              href={`/categories/${category.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
