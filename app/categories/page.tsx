import CategoriesPageComponents from "@/components/Categories/category-page";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Categories",
  description: "Explore articles by topic. From AI and ML to Web Development and Programming Languages, find exactly what you need.",
  openGraph: {
    title: "Explore Categories | Gyanvora",
    description: "Find articles organized by topic on Gyanvora.",
    url: "https://gyanvora.com/categories",
  },
};

export default function CategoriesPage() {
  return <CategoriesPageComponents />;
}
