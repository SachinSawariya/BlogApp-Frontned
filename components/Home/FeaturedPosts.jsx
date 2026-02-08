"use client";
import { useRouter } from "next/navigation";
import { FiArrowRight, FiTrendingUp } from "react-icons/fi";
import ArticleCard from "@/shared/Card/ArticleCard";

const FeaturedPosts = ({ posts }) => {
  const router = useRouter();

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
        
        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <ArticleCard
              key={post.id}
              id={post.id}
              title={post.title}
              category={post.category}
              excerpt={post.excerpt}
              readTime={post.readTime}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
