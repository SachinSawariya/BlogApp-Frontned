"use client";
import { useRouter } from "next/navigation";
import { FiArrowRight, FiTrendingUp } from "react-icons/fi";
import ArticleCard from "@/shared/Card/ArticleCard";
import ArticleCardSkeleton from "@/shared/Skeleton/ArticleCardSkeleton";

const FeaturedPosts = ({ posts, isLoading }) => {
  const router = useRouter();

  // Show skeleton loaders while loading
  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <FiTrendingUp className="text-blue-600" />
              Featured Articles
            </h2>
            <div className="h-8 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {[...Array(4)].map((_, index) => (
              <ArticleCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Handle empty state
  if (!posts || posts.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <FiTrendingUp className="text-blue-600" />
              Featured Articles
            </h2>
            <button 
              onClick={() => router.push("/blog")}
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
            >
              View All
              <FiArrowRight className="ml-1" />
            </button>
          </div>
          
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiTrendingUp className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No featured articles yet
            </h3>
            <p className="text-gray-500 mb-6">
              Check back soon for our latest featured content!
            </p>
            <button 
              onClick={() => router.push("/blog")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse All Articles
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <FiTrendingUp className="text-blue-600" />
            Featured Articles
          </h2>
          <button 
            onClick={() => router.push("/blog")}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
          >
            View All
            <FiArrowRight className="ml-1" />
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {posts.map((post) => (
            <ArticleCard
              key={post.id}
              id={post.id}
              title={post.title}
              category={post.category}
              excerpt={post.content}
              readTime={post.readTime}
              imageUrl={post.imageUrl}
              likes={post.likes}
              comments={post.comments}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
