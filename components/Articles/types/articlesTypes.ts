export interface Article {
  _id: string;
  title: string;
  content: string;
  category: string | { name: string; slug: string };
  readTime?: string;
  slug: string;
  likes?: number;
  comments?: number;
  createdAt?: string;
  updatedAt?: string;
  authorName?: string;
  authorAvatar?: string;
  status?: string;
  coverImage?: string;
  tags?: string[];
  views?: number;
}
