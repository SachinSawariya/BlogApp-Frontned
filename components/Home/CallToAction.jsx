"use client";
import { useRouter } from "next/navigation";

const CallToAction = () => {
  const router = useRouter();

  return (
    <section className="py-20 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to dive in?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Join our community of developers and stay updated with the latest in technology.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => router.push("/blog")}
            className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
          >
            Browse All Articles
          </button>
          <button 
            onClick={() => router.push("/subscribe")}
            className="border-2 border-white text-white hover:bg-white hover:bg-opacity-10 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
          >
            Subscribe to Newsletter
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
