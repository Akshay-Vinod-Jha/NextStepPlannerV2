import React, { useEffect, useState } from "react";
import { MapPin, Clock, Users, Star, IndianRupee } from "lucide-react";
import axios from "axios";
import { Card } from "./Card";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "../config/config.js";
import RevealAnimation from "./RevealAnimation";

const Destinations = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const getRecentDestHandler = async () => {
      try {
        const response = await axios.get(getApiUrl("/destinations/recent"));
        setDestinations(response.data);
      } catch (error) {
        console.error("Error fetching recent destinations:", error);
      }
    };

    getRecentDestHandler();
  }, []);

  return (
    <section id="destinations" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealAnimation animationType="fadeInUp">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured <span className="text-orange-600">Destinations</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore India's most spectacular trekking routes, from the mighty
              Himalayas to serene valleys
            </p>
          </div>
        </RevealAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <RevealAnimation
              key={destination._id}
              animationType="fadeInUp"
              delay={index * 150}
            >
              <Card destination={destination} />
            </RevealAnimation>
          ))}
        </div>
        <RevealAnimation animationType="fadeInUp" delay={300}>
          <div className="flex justify-center items-center mt-6">
            <button
              onClick={() => navigate("/destinations")}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-300"
            >
              View More
            </button>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default Destinations;
