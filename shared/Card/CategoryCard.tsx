'use client';

import { useRouter } from 'next/navigation';
import { FiTag } from 'react-icons/fi';
import type { ReactNode, MouseEvent, ComponentType } from 'react';

interface CategoryCardProps {
  name: string;
  count: number;
  icon?: ComponentType<{ className?: string }> | string;
  className?: string;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  href?: string;
  children?: ReactNode;
}

export const CategoryCard = ({
  name,
  count,
  icon: Icon = FiTag,
  className = '',
  onClick,
  href,
  children,
}: CategoryCardProps) => {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    if (onClick) {
      onClick(e);
    } else if (href) {
      router.push(href);
    }
  };

  const renderIcon = () => {
    if (!Icon) return null;
    
    if (typeof Icon === 'string') {
      return (
        <span className="text-2xl" role="img" aria-label={name}>
          {Icon}
        </span>
      );
    }
    
    return <Icon className="text-2xl text-blue-600" />;
  };

  return (
    <div 
      className={`bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow cursor-pointer ${className}`}
      onClick={handleClick}
      role={href ? 'link' : 'button'}
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick(e as any)}
    >
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        {renderIcon()}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
      <p className="text-sm text-gray-500">
        {count} {count === 1 ? 'article' : 'articles'}
      </p>
      {children}
    </div>
  );
};

export default CategoryCard;
