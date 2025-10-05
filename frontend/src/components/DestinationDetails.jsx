import React, { useState, useEffect } from 'react';
import { 
  MapPin, Clock, Users, Star, IndianRupee, X, Calendar, 
  Mountain, Thermometer, Compass, ChevronLeft, ChevronRight, HelpCircle,
  Bus, Train, Plane, Car, Navigation
} from 'lucide-react';
import axios from 'axios';
import { useLocation , useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
const DestinationDetails = () => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const destination = location.state;
  const isAvailable = destination.status === 'available';

  console.log(destination);

  useEffect(() => {
    let interval;
    if (isAutoScrolling) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % destination.images.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoScrolling, destination.images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % destination.images.length);
    setIsAutoScrolling(false);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + destination.images.length) % destination.images.length);
    setIsAutoScrolling(false);
  };

  const getTransportIcon = (mode) => {
    switch(mode?.toLowerCase()) {
      case 'bus': return <Bus className="h-5 w-5" />;
      case 'train': return <Train className="h-5 w-5" />;
      case 'flight': return <Plane className="h-5 w-5" />;
      default: return <Car className="h-5 w-5" />;
    }
  };

  const handleNavigate = () => {
    const searchQuery = encodeURIComponent(`${destination.name}`, `${destination.location}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${searchQuery}, '_blank'`);
  };
 

const handleNavigateBookingForm = async () => {
  // Check if trek is available
  if (!isAvailable) {
    toast.error("This trek is currently unavailable for booking!");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:5001/gettokendetails",
      {}, {
        withCredentials: true 
      }
    );

    console.log("User details from token:", response.data);

    if (response.status === 200) {
      navigate("/booking",{state : destination});
    } else {
      toast.error("Sign In Required!")
      navigate("/signin");
    }
    
  } catch (err) {
    if(err.response.status == 401){
      toast.error("Sign In Required!")
      navigate("/signin")
    }else{
      toast.error("Error occured!");
    }
    
    console.error("Error fetching token details:", err);
    
  }
};


  return (
    <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
      {/* Close button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <X className="h-5 w-5 text-gray-900" />
      </button>

      {/* Hero Image Section - 60% height */}
      <div className="relative h-[60vh] w-full">
        <img 
          src={destination.images[currentImageIndex].url} 
          alt={`${destination.name} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Navigation Buttons */}
        <button 
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-gray-900" />
        </button>
        <button 
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
        >
          <ChevronRight className="h-5 w-5 text-gray-900" />
        </button>

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {destination.images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentImageIndex(index);
                setIsAutoScrolling(false);
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">{destination.name}</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{destination.location}</span>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
              <span className="text-sm">{destination.rating}</span>
            </div>
            {/* Status Badge */}
            <div className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
              isAvailable 
                ? 'bg-green-500/90 text-white' 
                : 'bg-red-500/90 text-white'
            }`}>
              {isAvailable ? 'Available' : 'Unavailable'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Quick Info and Pricing Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Quick Info Cards */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center text-gray-600 mb-2">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="font-medium text-base">Duration</span>
                </div>
                <p className="text-gray-900 font-semibold text-lg">{destination.duration}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center text-gray-600 mb-2">
                  <Mountain className="h-5 w-5 mr-2" />
                  <span className="font-medium text-base">Altitude</span>
                </div>
                <p className="text-gray-900 font-semibold text-lg">{destination.altitude}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center text-gray-600 mb-2">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span className="font-medium text-base">Best Season</span>
                </div>
                <p className="text-gray-900 font-semibold text-lg">May - October</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center text-gray-600 mb-2">
                  <Thermometer className="h-5 w-5 mr-2" />
                  <span className="font-medium text-base">Temperature</span>
                </div>
                <p className="text-gray-900 font-semibold text-lg">-5°C to 15°C</p>
              </div>
            </div>

            {/* Pricing Section */}
            <div className={`rounded-2xl p-6 text-white ${
              isAvailable 
                ? 'bg-gradient-to-r from-orange-600 to-red-600' 
                : 'bg-gradient-to-r from-gray-400 to-gray-500'
            }`}>
              <div className="mb-4">
                <p className="text-sm opacity-90 mb-1">Starting from</p>
                <div className="flex items-center">
                  <IndianRupee className="h-6 w-6" />
                  <span className="text-4xl font-bold">{destination.price.toLocaleString()}</span>
                </div>
              </div>
              
              {isAvailable ? (
                <button 
                  className="w-full bg-white text-orange-600 hover:bg-gray-100 py-3 rounded-xl font-semibold text-base transition-colors duration-300"
                  onClick={handleNavigateBookingForm}
                >
                  Book Now
                </button>
              ) : (
                <button 
                  className="w-full bg-white/50 text-gray-700 py-3 rounded-xl font-semibold text-base cursor-not-allowed"
                  disabled
                >
                  Currently Unavailable
                </button>
              )}
              
              <p className="text-xs opacity-90 mt-3">
                {isAvailable 
                  ? '* Price includes accommodation, meals, permits, and guide services'
                  : '* This trek is temporarily unavailable. Please check back later.'
                }
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Trek</h2>
            <p className="text-gray-600 leading-relaxed text-base">
              {destination.description}
            </p>
          </div>
          
          {/* Navigation Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
            <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-600 p-2 rounded-lg">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{destination.name}</h3>
                  <p className="text-sm text-gray-600">{destination.location}</p>
                </div>
              </div>
              <button 
                onClick={handleNavigate}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center space-x-2 transition-colors duration-300"
              >
                <Navigation className="h-4 w-4" />
                <span>Get Directions</span>
              </button>
            </div>
          </div>

          {/* Available Dates */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Dates</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {destination.dates.map((dateRange, index) => (
                <div key={index} className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-xl border border-orange-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-orange-600 font-medium mb-1">Start Date</p>
                      <p className="text-base font-bold text-gray-900">{new Date(dateRange.startDate).toLocaleDateString('en-US', { 
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}</p>
                    </div>
                    <div className="text-orange-600 font-bold">→</div>
                    <div>
                      <p className="text-xs text-orange-600 font-medium mb-1">End Date</p>
                      <p className="text-base font-bold text-gray-900">{new Date(dateRange.endDate).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transport Mode */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Transportation</h2>
            <div className="bg-gray-50 p-4 rounded-xl flex items-center space-x-4">
              <div className="bg-orange-600 p-3 rounded-lg text-white">
                {getTransportIcon(destination.transportMode || 'car')}
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  {destination.transportMode ? destination.transportMode.charAt(0).toUpperCase() + destination.transportMode.slice(1) : 'Car'} Transport
                </h3>
                <p className="text-sm text-gray-600">Comfortable and reliable transportation included in the package</p>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-600 p-2 rounded-lg">
                    <Compass className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">Scenic Beauty</h3>
                    <p className="text-sm text-gray-600">Breathtaking views of snow-capped peaks and alpine meadows</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-600 p-2 rounded-lg">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">Cultural Experience</h3>
                    <p className="text-sm text-gray-600">Interact with local communities and learn about their traditions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
{/* onClose */}
          {/* Need Help Section */}
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-1">Need Help?</h2>
                <p className="text-sm opacity-90">Our travel experts are here to help you plan your perfect trek</p>
              </div>
              <button className="bg-white text-orange-600 hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold text-sm transition-colors duration-300 flex items-center space-x-2">
                <HelpCircle className="h-5 w-5" />
                <span>Contact Support</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;