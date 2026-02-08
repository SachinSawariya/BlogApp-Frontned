"use client";
import { useRouter } from "next/navigation";
import { FiArrowRight, FiBookOpen, FiPlusCircle } from "react-icons/fi";

const Hero = () => {
  const router = useRouter();

  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Explore the World of <br className="hidden md:block" />
          <span className="text-yellow-300">AI & Development</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
          Stay updated with the latest tutorials, guides, and insights in AI, machine learning, and software development.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => router.push("/blog")}
            className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
          >
            <FiBookOpen className="text-xl" />
            Explore Articles
            <FiArrowRight className="ml-1" />
          </button>
          <button 
            onClick={() => router.push("/admin/create-blog")}
            className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
          >
            <FiPlusCircle className="text-xl" />
            Write Article
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>
  );
};

export default Hero;
