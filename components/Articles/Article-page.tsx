"use client";
import { useArticles } from "@/components/Articles/hooks/useArticles";
import { ArticleSection } from "./ArticleSections";
import ArticlesSkeleton from "./ArticleSkeleton";
import { useState } from "react";
import { FiGrid, FiList, FiBookOpen, FiTrendingUp } from "react-icons/fi";

export default function ArticlesPageComponent() {
  const { sections, isLoading } = useArticles();
  const [globalViewMode, setGlobalViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative container mx-auto px-4 py-12">
          <div className="flex justify-between items-start">
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

      <div className="container mx-auto px-4 py-10">
        {isLoading ? (
          <ArticlesSkeleton />
        ) : (
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
        )}
      </div>

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
