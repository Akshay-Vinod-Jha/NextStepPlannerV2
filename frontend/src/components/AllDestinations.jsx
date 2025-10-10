import { Card } from "./Card";
import axios from "axios";
import { useState, useEffect } from "react";
import { getApiUrl } from "../config/config.js";
import RevealAnimation from "./RevealAnimation";
import { TrekCardSkeleton, LoadingSpinner } from "./LoadingComponents";

const AllDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllDestHandler = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(getApiUrl("/destinations/all"));
        setDestinations(response.data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
        setError("Failed to load destinations. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getAllDestHandler();
  }, []);

  return (
    <section id="destinations" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealAnimation animationType="fadeInUp">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured <span className="text-orange-600">Destinations</span>
            </h2>
          </div>
        </RevealAnimation>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <TrekCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-600 text-lg mb-4">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : destinations.length === 0 ? (
          <div className="text-center py-12">
            <LoadingSpinner text="No destinations available at the moment" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <RevealAnimation
                key={destination._id}
                animationType="fadeInUp"
                delay={index * 100}
              >
                <Card destination={destination} />
              </RevealAnimation>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllDestinations;
