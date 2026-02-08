import AboutUs from '@/components/Abouts/about-us';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - My Blog App',
  description: 'Learn more about our team, mission, and values.',
  openGraph: {
    title: 'About Us - My Blog App',
    description: 'Discover the people and values behind our blog platform.',
    url: 'https://yourblog.com/about-us',
    siteName: 'My Blog App',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - My Blog App',
    description: 'Discover the people and values behind our blog platform.',
  },
};

export default function AboutPage() {
  return <AboutUs />;
}