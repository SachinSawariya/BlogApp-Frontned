import { FiLoader } from "react-icons/fi";

interface LoadingProps {
  size?: "small" | "medium" | "large";
  message?: string;
  className?: string;
}

const Loading = ({ 
  size = "medium", 
  message = "Loading...", 
  className = "" 
}: LoadingProps) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-12 h-12", 
    large: "w-16 h-16"
  };

  const messageSizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg"
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative">
        <FiLoader 
          className={`${sizeClasses[size]} animate-spin text-blue-600 mb-4`} 
        />
        <div 
          className={`absolute inset-0 animate-ping bg-blue-400 rounded-full opacity-20 ${
            size === "small" ? "w-6 h-6" : size === "large" ? "w-16 h-16" : "w-12 h-12"
          }`}
        ></div>
      </div>
      {message && (
        <p className={`${messageSizeClasses[size]} text-gray-600 font-medium`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Loading;
