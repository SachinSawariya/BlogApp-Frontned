"use client";

import { useParams } from "next/navigation";
import CategoryArticlesPageComponent from "@/components/Articles/CategoryArticlesPage";

export default function CategoryArticlesPage() {
  const params = useParams();
  const slug = params.slug as string;

  return <CategoryArticlesPageComponent slug={slug} />;
}
