import React from 'react';
import { ArrowLeft, Mountain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import { AdminCard } from './AdminCard';
import { toast } from 'react-toastify';
import axios from 'axios';


const AdminPanel = () => {
  const navigate = useNavigate();
  const [destinations,setDestinations] = useState([]);
    

   useEffect(() => {
    const getAllDestHandler = async () => {
      try {
        const response = await axios.get('http://localhost:5001/destinations/all');
        setDestinations(response.data);
      } catch (error) {
        console.error('Error fetching recent destinations:', error);
      }
    };

    getAllDestHandler();
  }, []);


  return (
    <div className="min-h-screen bg-gray-50">      {/* Header with Back Button and Title */}      <div className='flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-10 py-4 border-b border-gray-200 bg-orange-50'>
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-white px-4 py-2 rounded-lg border bg-orange-600 transition-all duration-300 hover:shadow-md mb-4 sm:mb-0"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span className="font-medium">Back to Home</span>
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">Admin Dashboard</h1>
        <div className="hidden sm:block w-24"></div> {/* Spacer for center alignment on larger screens */}
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
          {/* Admin Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-20">
          {/* Add Destinations Button */}          
          <button
            onClick={() => navigate('/addtrek')}
            className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group transform hover:scale-105"
          >
            <Mountain className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-lg font-bold">Add New Trek</span>
          </button>
        </div>
      </div>      <section id="destinations" className="pb-12 sm:pb-20 bg-gray-50 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Manage <span className="text-orange-600">Treks</span>
          </h2>
          <p className="text-gray-600 text-lg">View, edit, and manage bookings for all your treks</p>
        </div>

        {destinations.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Mountain className="h-20 w-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Treks Yet</h3>
            <p className="text-gray-600 mb-6 text-lg">Get started by adding your first trek destination</p>
            <button
              onClick={() => navigate('/addtrek')}
              className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
            >
              <Mountain className="h-5 w-5 mr-2" />
              Add Your First Trek
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination) => (
              <AdminCard key={destination._id} destination={destination} />
            ))}
          </div>
        )}
      </div>
    </section>

    </div>

  );
};

export default AdminPanel;