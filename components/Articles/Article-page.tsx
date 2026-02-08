import { useArticles } from "@/components/Articles/hooks/useArticles";
import { ArticleSection } from "./ArticleSections";
import ArticlesSkeleton from "./ArticleSkeleton";
import { useState } from "react";
import { FiGrid, FiList, FiBookOpen, FiTrendingUp } from "react-icons/fi";

export default function ArticlesPageComponent() {
  const { sections, isLoading, error } = useArticles();
  const [globalViewMode, setGlobalViewMode] = useState<"grid" | "list">("grid");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 py-12">
          <ArticlesSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="relative inline-block mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">!</span>
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-white font-bold text-sm">✕</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              We encountered an error while loading the articles. Please try
              again later.
            </p>
            <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg text-left">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 font-medium">
                    Error Details
                  </p>
                  <p className="text-sm text-red-600 mt-1">{error.message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative container mx-auto px-4 py-12">
          <div className="flex justify-between items-start">
            {/* Left Side - Title and Description */}
            <div className="text-left flex-1">
              <div className="flex items-center space-x-3 mb-6">
                <FiBookOpen className="w-8 h-8" />
                <FiTrendingUp className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                All Articles
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
                Discover our latest articles, tutorials, and insights. Explore
                different categories and find content that matters to you.
              </p>
            </div>

            {/* Right Side - View Mode Toggle - Desktop Only */}
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1">
                <button
                  onClick={() => setGlobalViewMode("grid")}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-300 ${
                    globalViewMode === "grid"
                      ? "bg-white text-blue-600 shadow-lg"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <FiGrid className="w-5 h-5" />
                  <span className="font-medium">Grid View</span>
                </button>
                <button
                  onClick={() => setGlobalViewMode("list")}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-300 ${
                    globalViewMode === "list"
                      ? "bg-white text-blue-600 shadow-lg"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <FiList className="w-5 h-5" />
                  <span className="font-medium">List View</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="space-y-20">
          {sections.map((section, index) => (
            <div
              key={index}
              style={{
                animationDelay: `${index * 200}ms`,
                animation: "fadeInUp 0.8s ease-out forwards",
                opacity: 0,
              }}
            >
              <ArticleSection
                category={section.category}
                articles={section.articles}
                viewMode={globalViewMode}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
