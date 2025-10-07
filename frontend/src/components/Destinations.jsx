import React, { useEffect, useState } from "react";
import { MapPin, Clock, Users, Star, IndianRupee } from "lucide-react";
import axios from "axios";
import { Card } from "./Card";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "../config/config.js";

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
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured <span className="text-orange-600">Destinations</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore India's most spectacular trekking routes, from the mighty
            Himalayas to serene valleys
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Card key={destination._id} destination={destination} />
          ))}
        </div>
        <div className="flex justify-center items-center mt-6">
          <button
            onClick={() => navigate("/destinations")}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-300"
          >
            View More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Destinations;
