import "@/styles/globals.css";
import Header from "@/shared/Header/header";
import Footer from "@/shared/Footer";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  metadataBase: new URL("https://gyanvora.vercel.app"),
  verification: {
    google: "VnRNtNm9KtmI3Xzr9EstRBn86A4w1PFzkgJ1mA7TdhY",
  },
  title: {
    default: "Gyanvora - AI for Developers",
    template: "%s | Gyanvora",
  },
  description:
    "A comprehensive blog about AI, machine learning, and modern web development for developers.",
  keywords: [
    "AI",
    "Machine Learning",
    "Web Development",
    "Programming",
    "Tutorials",
    "Tech Blog",
    "React",
    "Next.js",
    "JavaScript",
    "Python",
    "Software Engineering",
    "Gyanvora",
    "Blog by Gyanvora",
    "Gyanvora blog",
    "Gyanvora tech blog",
    "Gyanvora AI blog",
    "Gyanvora Machine Learning blog",
    "Gyanvora Web Development blog",
    "Gyanvora Programming blog",
    "Gyanvora Tutorials blog",
    "Gyanvora React blog",
    "Gyanvora Next.js blog",
    "Gyanvora JavaScript blog",
    "Gyanvora Python blog",
    "Gyanvora Software Engineering blog",
    "Gyanvora AI for Developers",
    "Gyanvora Machine Learning for Developers",
    "Gyanvora Web Development for Developers",
    "Gyanvora Programming for Developers",
    "Gyanvora Tutorials for Developers",
    "Gyanvora Tech Blog for Developers",
    "Gyanvora React for Developers",
    "Gyanvora Next.js for Developers",
    "Gyanvora JavaScript for Developers",
    "Gyanvora Python for Developers",
    "Gyanvora Software Engineering for Developers",
  ],
  authors: [{ name: "Gyanvora Team" }],
  creator: "Gyanvora",
  publisher: "Gyanvora",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gyanvora.vercel.app",
    siteName: "Gyanvora",
    title: "Gyanvora - AI for Developers",
    description:
      "A comprehensive blog about AI, machine learning, and modern web development for developers.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gyanvora - AI for Developers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gyanvora - AI for Developers",
    description:
      "A comprehensive blog about AI, machine learning, and modern web development for developers.",
    images: ["/og-image.png"],
    creator: "@gyanvora",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: "/logo.svg",
    shortcut: "/logo.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
