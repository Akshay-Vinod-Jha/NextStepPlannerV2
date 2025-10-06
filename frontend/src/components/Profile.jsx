import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Calendar, MapPin, Users, IndianRupee, FileText, ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const Profile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch user details
      const userResponse = await axios.post(
        'http://localhost:5001/gettokendetails',
        {},
        { withCredentials: true }
      );

      if (userResponse.status === 200) {
        setUserDetails(userResponse.data);
        
        // Fetch user's bookings
        const bookingsResponse = await axios.get(
          `http://localhost:5001/booking/user/${userResponse.data.userId}`,
          { withCredentials: true }
        );

        if (bookingsResponse.status === 200) {
          setBookings(bookingsResponse.data.data || []);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to load profile data');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status, type = 'booking') => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold uppercase";
    
    if (type === 'booking') {
      const statusColors = {
        confirmed: 'bg-green-100 text-green-800',
        pending: 'bg-yellow-100 text-yellow-800',
        cancelled: 'bg-red-100 text-red-800'
      };
      return `${baseClasses} ${statusColors[status] || 'bg-gray-100 text-gray-800'}`;
    } else {
      const statusColors = {
        paid: 'bg-green-100 text-green-800',
        pending: 'bg-yellow-100 text-yellow-800',
        cancelled: 'bg-red-100 text-red-800'
      };
      return `${baseClasses} ${statusColors[status] || 'bg-gray-100 text-gray-800'}`;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-orange-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-orange-600 hover:text-orange-700 mb-4 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account and view booking history</p>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-orange-100 p-4 rounded-full">
              <User className="h-12 w-12 text-orange-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{userDetails?.name || 'User'}</h2>
              <div className="flex items-center text-gray-600 mt-1">
                <Mail className="h-4 w-4 mr-2" />
                <span>{userDetails?.email}</span>
              </div>
              <div className="mt-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  userDetails?.role === 'ADMIN' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {userDetails?.role || 'USER'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>

          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-4">No bookings yet</p>
              <button
                onClick={() => navigate('/destinations')}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Explore Treks
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {booking.destinationId?.name || 'Trek'}
                          </h3>
                          <div className="flex items-center text-gray-600 mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">{booking.destinationId?.location || 'Location'}</span>
                          </div>
                        </div>
                        <div className="text-right lg:hidden">
                          <span className={getStatusBadge(booking.bookingStatus, 'booking')}>
                            {booking.bookingStatus}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2 text-orange-600" />
                          <span>
                            {formatDate(booking.dateSlot?.startDate)} - {formatDate(booking.dateSlot?.endDate)}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Users className="h-4 w-4 mr-2 text-orange-600" />
                          <span>{booking.numPersons} {booking.numPersons === 1 ? 'Person' : 'People'}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <IndianRupee className="h-4 w-4 mr-2 text-orange-600" />
                          <span className="font-semibold">₹{booking.amountPaid?.toLocaleString()}</span>
                        </div>
                      </div>

                      {booking.bookingId && (
                        <div className="mt-3 text-xs text-gray-500">
                          Booking ID: <span className="font-mono font-semibold">{booking.bookingId}</span>
                        </div>
                      )}
                    </div>

                    <div className="hidden lg:flex lg:flex-col lg:items-end lg:space-y-2 lg:ml-6">
                      <span className={getStatusBadge(booking.bookingStatus, 'booking')}>
                        {booking.bookingStatus}
                      </span>
                      <span className={getStatusBadge(booking.paymentStatus, 'payment')}>
                        {booking.paymentStatus}
                      </span>
                    </div>

                    <div className="flex lg:hidden mt-3 space-x-2">
                      <span className={getStatusBadge(booking.paymentStatus, 'payment')}>
                        Payment: {booking.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
