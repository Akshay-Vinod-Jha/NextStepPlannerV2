import { Card } from "./Card";
import axios from "axios";
import { useState, useEffect } from "react";
import { getApiUrl } from "../config/config.js";

const AllDestinations = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const getAllDestHandler = async () => {
      try {
        const response = await axios.get(getApiUrl("/destinations/all"));
        setDestinations(response.data);
      } catch (error) {
        console.error("Error fetching recent destinations:", error);
      }
    };

    getAllDestHandler();
  }, []);

  return (
    <section id="destinations" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured <span className="text-orange-600">Destinations</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Card destination={destination} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllDestinations;
