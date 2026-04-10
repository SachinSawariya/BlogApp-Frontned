import SearchComponent from "@/components/Search/SearchComponent";
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: "Search Articles",
  description: "Search for specific articles, tutorials, and topics on Gyanvora.",
  robots: {
    index: false, // Usually search pages shouldn't be indexed to avoid thin content
    follow: true,
  },
};

function SearchPageContent() {
  return <SearchComponent />;
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
