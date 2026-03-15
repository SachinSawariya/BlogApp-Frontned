import '@/styles/globals.css';
import Header from "@/shared/Header/header";
import Footer from "@/shared/Footer";
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: "AI for Developers",
  description: "A blog about AI and development",
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
          <main>
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
