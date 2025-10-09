import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Lonavala from "../assets/lonavala.jpg";

const Hero = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const trails = [
    { name: "Raigad", color: "text-amber-500" }, // Earthy fort stone color
    { name: "Kalsubai", color: "text-sky-400" }, // Mountain sky color
    { name: "Rajgad", color: "text-emerald-400" }, // Mountain forest color
    { name: "Harishchandra", color: "text-orange-400" }, // Sunrise/sunset color
    { name: "Andarban", color: "text-purple-400" }, // Purple mountain color
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % trails.length);
        setIsVisible(true);
      }, 500); // Wait for fade out before changing text
    }, 2000); // Change every 2 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${Lonavala})`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
          Explore India's{" "}
          <span
            className={`${
              trails[currentIndex].color
            } transition-opacity duration-500 text-3xl md:text-4xl lg:text-5xl ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {trails[currentIndex].name}
          </span>
          <span className="text-white"> Trails</span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
          My mission is simple to help people disconnect from screens, reconnect
          with nature, and experience the thrill of adventure safely and
          sustainably.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate("/destinations")}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-semibold flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span>Start Trekking</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
