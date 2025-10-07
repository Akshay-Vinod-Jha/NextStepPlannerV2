import React, { useEffect, useState } from 'react';
import { MapPin, Clock, Users, Star, IndianRupee, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Card = ({destination})=>{
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const needsReadMore = destination.description.length > 150;

  const navigateViewDetailsHandler = ()=>{
    navigate("/destinationdetails" , {state : destination})
  }
    console.log(destination);
    const isAvailable = destination.status === 'available';
    
    return (
        <div 
              key={destination.id}
              className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${!isAvailable ? 'opacity-90' : ''}`}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={destination.images[0].url} 
                  alt={destination.name}
                  className={`w-full h-64 object-cover transition-transform duration-300 hover:scale-110 ${!isAvailable ? 'grayscale-[30%]' : ''}`}
                />
                {/* Status Badge - Top Left */}
                <div className="absolute top-4 left-4">
                  <div className={`px-3 py-1 rounded-full flex items-center space-x-1 font-semibold text-xs uppercase backdrop-blur-sm ${
                    isAvailable 
                      ? 'bg-green-500/90 text-white' 
                      : 'bg-red-500/90 text-white'
                  }`}>
                    <span>{isAvailable ? 'Available' : 'Unavailable'}</span>
                  </div>
                </div>
                
                {/* Price Badge - Top Right */}
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                    <IndianRupee className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-bold text-gray-900">{destination.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{destination.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-600">{destination.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{destination.location}</span>
                </div>
                  <div className={`${!isExpanded && 'line-clamp-4'} relative`}>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {destination.description}
                  </p>
                  {needsReadMore && !isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent"></div>
                  )}
                </div>
                
                {needsReadMore && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-orange-600 hover:text-orange-700 text-sm font-medium flex items-center gap-1 mb-4 transition-colors duration-300"
                  >
                    {isExpanded ? (
                      <>
                        Show Less <ChevronUp className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Read More <ChevronDown className="h-4 w-4" />
                      </>
                    )}
                  </button>
                )}
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{destination.altitude}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    className={`flex-1 py-3 rounded-lg font-semibold transition-colors duration-300 ${
                      isAvailable 
                        ? 'bg-orange-600 hover:bg-orange-700 text-white cursor-pointer' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={isAvailable ? navigateViewDetailsHandler : null}
                    disabled={!isAvailable}
                  >
                    {isAvailable ? 'Book Now' : 'Currently Unavailable'}
                  </button>
                  {/* <button className="flex-1 border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white py-3 rounded-lg font-semibold transition-colors duration-300"
                
                  >
                    View Details
                  </button> */}
                </div>
              </div>
            </div>
    )
}