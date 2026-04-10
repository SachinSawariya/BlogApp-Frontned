import ArticlesPageComponent from "@/components/Articles/Article-page";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Articles",
  description: "Browse our complete collection of articles on AI, Machine Learning, Web Development, and more. Stay ahead with Gyanvora.",
  openGraph: {
    title: "All Articles | Gyanvora",
    description: "Explore the latest insights and tutorials on Gyanvora.",
    url: "https://gyanvora.com/articles",
  },
};

export default function ArticlesPage() {
  return <ArticlesPageComponent />;
}
