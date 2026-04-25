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
