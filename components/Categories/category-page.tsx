import { FiSearch, FiAlertCircle } from "react-icons/fi";
import CategoryCard from "@/shared/Card/CategoryCard";
import { useCategory } from "./hooks/useCategory";
// import { Skeleton } from "@/components/ui/skeleton";

export default function CategoriesPageComponents() {
  const { 
    categories, 
    isLoading, 
    error, 
    searchQuery, 
    setSearchQuery 
  } = useCategory();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            All Categories
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Browse articles by category to find exactly what you&apos;re looking for
          </p>

          <div className="mt-8 max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiAlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  {error.message || 'Failed to load categories. Using fallback data.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              // <Skeleton key={i} className="h-48 rounded-lg" />
              <div key={i} className="h-48 rounded-lg bg-gray-200 animate-pulse"></div> 
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  name={category.name}
                  count={category.postCount}
                  href={`/categories/${category.slug}`}
                  className="h-full"
                  icon={category.icon}
                />
              ))}
            </div>

            {categories.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">
                  No categories found
                </h3>
                <p className="mt-2 text-gray-500">
                  {searchQuery ? (
                    'No categories match your search. Try a different term.'
                  ) : (
                    'No categories available at the moment. Please check back later.'
                  )}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
