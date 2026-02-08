"use client";

import { useRouter } from "next/navigation";
import { FiClock, FiHeart, FiMessageSquare, FiShare2, FiArrowLeft } from "react-icons/fi";
import { useState } from 'react';
import type { MouseEvent, ReactNode } from 'react';

interface ArticleCardProps {
  id: string | number;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  imageUrl?: string;
  likes?: number;
  comments?: number;
  className?: string;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  children?: ReactNode;
  viewMode?: "grid" | "list";
}

const ArticleCard = ({ 
  id, 
  title, 
  category, 
  excerpt, 
  readTime, 
  imageUrl, 
  likes: initialLikes = 0,
  comments = 0,
  className = "",
  onClick,
  children,
  viewMode = "grid"
}: ArticleCardProps) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(initialLikes);
  
  // Force list view on mobile devices
  const actualViewMode = typeof window !== 'undefined' && window.innerWidth < 768 ? "list" : viewMode;
  
  const handleLike = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isLiked) {
      setCurrentLikes(prev => prev - 1);
    } else {
      setCurrentLikes(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };
  
  const handleShare = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: title,
        text: excerpt,
        url: window.location.href,
      }).catch(console.error);
    }
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    if (onClick) {
      onClick(e);
    } else {
      router.push(`/blog/${id}`);
    }
  };

  return (
    <div 
      className={`${
        actualViewMode === "grid"
          ? "bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
          : "bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
      } ${className}`}
      onClick={handleClick}
      role="article"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick(e as any)}
    >
      {actualViewMode === "grid" ? (
        <>
          <div className="relative h-48 bg-gray-100 overflow-hidden group">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div 
                className="w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold p-4 text-center"
                aria-label={`Category: ${category}`}
              >
                {category}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <div className="flex space-x-3 text-white">
                <button 
                  onClick={handleLike}
                  className="flex items-center space-x-1 hover:text-red-400 transition-colors"
                  aria-label={isLiked ? 'Unlike this article' : 'Like this article'}
                >
                  <FiHeart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  <span className="text-sm font-medium">{currentLikes}</span>
                </button>
                <div className="flex items-center space-x-1">
                  <FiMessageSquare className="w-5 h-5" />
                  <span className="text-sm font-medium">{comments}</span>
                </div>
                <button 
                  onClick={handleShare}
                  className="ml-auto hover:text-blue-300 transition-colors"
                  aria-label="Share this article"
                >
                  <FiShare2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">
                {category}
              </span>
              <div className="flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                <FiClock className="mr-1 w-3.5 h-3.5" />
                <span>{readTime} min read</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mt-3 mb-2 line-clamp-2 leading-tight">
              {title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{excerpt}</p>
            {children}
          </div>
        </>
      ) : (
        <div className="flex flex-col md:flex-row h-full">
          {/* Left Side - Image */}
          <div className="md:w-1/3 lg:w-2/5 h-48 md:h-auto relative overflow-hidden group">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold p-4 text-center">
                {category}
              </div>
            )}
          </div>
          
          {/* Right Side - Content */}
          <div className="md:w-2/3 lg:w-3/5 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">
                  {category}
                </span>
                <div className="flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                  <FiClock className="mr-1 w-3.5 h-3.5" />
                  <span>{readTime} min read</span>
                </div>
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                {title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                {excerpt}
              </p>
            </div>
            
            {/* Footer with interactions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <button 
                  onClick={handleLike}
                  className="flex items-center space-x-1 hover:text-red-500 transition-colors"
                  aria-label={isLiked ? 'Unlike this article' : 'Like this article'}
                >
                  <FiHeart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  <span>{currentLikes}</span>
                </button>
                <div className="flex items-center space-x-1">
                  <FiMessageSquare className="w-4 h-4" />
                  <span>{comments}</span>
                </div>
                <button 
                  onClick={handleShare}
                  className="hover:text-blue-500 transition-colors"
                  aria-label="Share this article"
                >
                  <FiShare2 className="w-4 h-4" />
                </button>
              </div>
              
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center group">
                Read More
                <FiArrowLeft className="ml-2 w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleCard;
