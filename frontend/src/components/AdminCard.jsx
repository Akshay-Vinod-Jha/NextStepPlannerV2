import React, { useState } from 'react';
import { MapPin, Clock, Users, Star, IndianRupee, Edit, Calendar, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getApiUrl } from '../config/config.js';

export const AdminCard = ({destination}) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const handleEditDestination = () => {
    console.log('Navigate to edit destination:', destination.id);
    navigate("/edittrek",{state : destination });
  };
  
  const handleViewBookings = () => {
    console.log('Navigate to view bookings for destination:', destination);
    console.log('Destination ID:', destination._id);
    navigate("/admin/bookings", { state: { destination } });
  };
  
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };
  
  const handleConfirmDelete =async () => {
    console.log('Deleting destination:', destination.id);
    try {
    const response = await fetch(getApiUrl(`/destinations/deletedestn/${destination._id}`), {
      method: "DELETE",
    });

    const result = await response.json();
    if (response.ok) {
      toast.success("Trek deleted successfully!"); 
    } else {
      toast.error("Error! ");
    }

  } catch (err) {
    console.error("Error submitting trek:", err);
    toast.error("An error occurred while submitting the trek.");
  }
    setShowDeleteModal(false);
  };
  
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  // Sample destination data for demo
  const sampleDestination = destination || {
    id: 1,
    name: "Kedarnath Trek",
    location: "Uttarakhand, India",
    price: 15000,
    rating: 4.8,
    duration: "5 days",
    altitude: "3,583m",
    description: "Experience the spiritual journey to one of the most sacred temples in India. This trek offers breathtaking views of the Himalayas and a chance to connect with nature.",
    images: [{ url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }]
  };

  return (
    <>
      <div 
        key={sampleDestination.id}
        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative"
      >
        {/* Delete Button - Top Left Corner - INCREASED SIZE */}
        <button 
          onClick={handleDeleteClick}
          className="absolute top-4 left-4 z-10 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-colors duration-300"
        >
          <Trash2 className="h-5 w-5" />
        </button>
        
        <div className="relative overflow-hidden">
          <img 
            src={sampleDestination.images[0].url} 
            alt={sampleDestination.name}
            className={`w-full h-64 object-cover transition-transform duration-300 hover:scale-110 ${sampleDestination.status === 'unavailable' ? 'grayscale-[30%]' : ''}`}
          />
          
          {/* Status Badge - Bottom Left */}
          <div className="absolute bottom-4 left-4">
            <div className={`px-3 py-1 rounded-full flex items-center space-x-1 font-semibold text-xs uppercase backdrop-blur-sm ${
              sampleDestination.status === 'available' 
                ? 'bg-green-500/90 text-white' 
                : 'bg-red-500/90 text-white'
            }`}>
              <span>{sampleDestination.status === 'available' ? 'Available' : 'Unavailable'}</span>
            </div>
          </div>
          
          {/* Price Badge - Top Right */}
          <div className="absolute top-4 right-4">
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
              <IndianRupee className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-bold text-gray-900">{sampleDestination.price.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900">{sampleDestination.name}</h3>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-600">{sampleDestination.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{sampleDestination.location}</span>
          </div>
          
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            {sampleDestination.description}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{sampleDestination.duration}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{sampleDestination.altitude}</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button 
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
              onClick={handleEditDestination}
            >
              <Edit className="h-4 w-4" />
              <span>Edit Destination</span>
            </button>
            <button 
              className="flex-1 border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
              onClick={handleViewBookings}
            >
              <Calendar className="h-4 w-4" />
              <span>View Bookings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="bg-red-100 rounded-full p-3 inline-flex items-center justify-center mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Destination</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{sampleDestination.name}"? This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button 
                  onClick={handleCancelDelete}
                  className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-2 rounded-lg font-semibold transition-colors duration-300"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleConfirmDelete}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition-colors duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};