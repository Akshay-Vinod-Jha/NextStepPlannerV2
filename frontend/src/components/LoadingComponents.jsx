import React from "react";

const LoadingSpinner = ({ size = "medium", text = "Loading..." }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  const textSizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div
        className={`${sizeClasses[size]} border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin`}
      ></div>
      <p className={`mt-2 text-gray-600 ${textSizeClasses[size]}`}>{text}</p>
    </div>
  );
};

const FullPageLoader = ({ text = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-lg text-gray-700 font-medium">{text}</p>
        <p className="text-sm text-gray-500 mt-1">Please wait...</p>
      </div>
    </div>
  );
};

const ButtonLoader = ({ text = "Processing..." }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
      {text}
    </div>
  );
};

const CardLoader = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
};

const TrekCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="h-56 bg-gray-200"></div>

      {/* Content skeleton */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="h-6 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
          <div className="h-8 w-16 bg-gray-200 rounded-full ml-4"></div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5"></div>
        </div>

        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-200 rounded w-24"></div>
          <div className="h-10 w-32 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export {
  LoadingSpinner,
  FullPageLoader,
  ButtonLoader,
  CardLoader,
  TrekCardSkeleton,
};
export default LoadingSpinner;
