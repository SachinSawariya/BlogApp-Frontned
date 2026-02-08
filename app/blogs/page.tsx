"use client";

import { useState } from 'react';
import Sidebar from "@/shared/Sidebar";
import { articles } from '@/data/articles';

export default function Blogs() {
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  
  const handleArticleSelect = (articleId: string) => {
    setActiveArticleId(articleId);
  };

  const activeArticle = activeArticleId ? articles[activeArticleId as keyof typeof articles] : null;

  return (
    <>
      <Sidebar 
        activeArticle={activeArticleId || ''} 
        onArticleSelect={handleArticleSelect} 
      />
      <div className="flex-1 overflow-y-auto p-6">
        {activeArticle ? (
          <article className="prose max-w-4xl mx-auto">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {activeArticle.title}
              </h1>
              <div className="flex items-center text-sm text-gray-500">
                <span>Last updated: {activeArticle.lastUpdated}</span>
                <span className="mx-2">•</span>
                <span>{activeArticle.readTime}</span>
              </div>
            </header>
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: activeArticle.content }} 
            />
          </article>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center py-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to the Blog</h1>
            <p className="text-gray-600 max-w-md">
              Select an article from the sidebar to start reading. Our blog covers various topics 
              about AI, machine learning, and software development.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
