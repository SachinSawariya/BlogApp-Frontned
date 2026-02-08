"use client";
import Hero from './Hero';
import FeaturedPosts from './FeaturedPosts';
import Categories from './Categories';
import CallToAction from './CallToAction';

export default function HomePage() {
  // Sample data - in a real app, this would come from an API
  const featuredPosts = [
    {
      id: 1,
      title: 'Getting Started with AI Development',
      excerpt: 'Learn the fundamentals of AI development and build your first model',
      category: 'AI Basics',
      readTime: '5 min read',
      image: '/images/ai-basics.jpg'
    },
    {
      id: 2,
      title: 'Advanced Machine Learning Techniques',
      excerpt: 'Explore cutting-edge ML algorithms and their applications',
      category: 'Machine Learning',
      readTime: '8 min read',
      image: '/images/ml-advanced.jpg'
    },
  ];

  const categories = [
    { name: 'AI & ML', count: 24 },
    { name: 'Web Development', count: 18 },
    { name: 'Data Science', count: 15 },
    { name: 'Cloud Computing', count: 12 },
    { name: 'DevOps', count: 9 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Hero />
      <FeaturedPosts posts={featuredPosts} />
      <Categories categories={categories} />
      <CallToAction />
    </div>
  );
}
