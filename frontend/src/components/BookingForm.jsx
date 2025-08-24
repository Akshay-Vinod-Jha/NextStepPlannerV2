import axios from "axios";
import React, { useState } from 'react';
import { 
  MapPin, ArrowLeft,
  AlertCircle, Phone
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BookingForm = () => {
    const location = useLocation();
  const destination = location.state;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    selectedDate: '',
    numPersons: 1,
    mobileNumber: '',
    acceptTerms: false,
    destinationId : destination._id,
    orderId: null,
    paymentId: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPrice = destination.price * formData.numPersons;

  // Mobile number validation for Indian numbers
  const validateMobileNumber = (mobile) => {
    // Remove any spaces, dashes, or other non-digit characters except +
    const cleanMobile = mobile.replace(/[^\d+]/g, '');
    
    // Indian mobile number patterns:
    // 10 digits starting with 6, 7, 8, or 9
    // Or with +91 prefix
    const indianMobileRegex = /^(?:\+91)?[6-9]\d{9}$/;
    
    return indianMobileRegex.test(cleanMobile);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.selectedDate) newErrors.selectedDate = 'Please select a date';
    
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!validateMobileNumber(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid Indian mobile number';
    }
    
    if (!formData.acceptTerms) newErrors.acceptTerms = 'Please accept terms and conditions';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  setIsSubmitting(true);

  try {
    const [startDateStr, endDateStr] = formData.selectedDate.split("-");
    
    // Clean mobile number for backend (remove spaces, keep only digits and +)
    const cleanMobileNumber = formData.mobileNumber.replace(/[^\d+]/g, '');
    
    const bookingData = {
      destinationId: formData.destinationId,
      numPersons: formData.numPersons,
      mobileNumber: cleanMobileNumber,
      dateSlot: {
        startDate: new Date(startDateStr),
        endDate: new Date(endDateStr)
      },
      amountPaid: destination.price * formData.numPersons,
      orderId: formData.orderId, // These will be set after Razorpay
      paymentId: formData.paymentId
    };

    const response = await axios.post(`http://localhost:5001/booking/booktrek/${formData.destinationId}`, bookingData,
        {
            withCredentials: true,
        } ,{
      headers: {
        "Content-Type": "application/json"
      }
    });

    if(response.status === 200)
    {
      console.log("Booking success:", response.data);
      toast.success("Booking successful!");
      navigate(-1);
    }
    
  } catch (error) {
    console.error("Booking failed:", error.response?.data || error.message);
    toast.error("Booking failed. Try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    let processedValue = value;
    
    // Format mobile number as user types (add spaces for readability)
    if (name === 'mobileNumber') {
      // Remove all non-digit characters except +
      let cleaned = value.replace(/[^\d+]/g, '');
      
      // Format for display (add spaces)
      if (cleaned.startsWith('+91')) {
        cleaned = cleaned.substring(3);
        if (cleaned.length > 0) {
          processedValue = '+91 ' + cleaned.replace(/(\d{5})(\d{0,5})/, '$1 $2').trim();
        } else {
          processedValue = '+91 ';
        }
      } else if (cleaned.length > 0) {
        processedValue = cleaned.replace(/(\d{5})(\d{0,5})/, '$1 $2').trim();
      } else {
        processedValue = '';
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : processedValue
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen bg-white mt-20">
        <div className='flex justify-start ml-10'>
            <button onClick={() => navigate(-1)}
            className="flex items-center bg-gradient-to-r from-orange-50 to-red-50 text-orange-600 hover:text-orange-700 px-4 py-2 rounded-lg border border-orange-200 transition-all duration-300 hover:shadow-md flex-shrink-0 mt-2"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="font-medium">Back to Details</span>
          </button>
        </div>
      <div className="max-w-2xl mx-auto px-4 pb-8">
    
        <div className="flex items-start space-x-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-orange-200 flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Your Trek</h2>
            
            {/* Trek Details */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 mb-6 border border-orange-100">
              <h3 className="font-semibold text-gray-900 mb-2">{destination.name}</h3>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-1 text-orange-600" />
                <span className="text-sm">{destination.location}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date Range
                </label>
                <select
                  name="selectedDate"
                  value={formData.selectedDate}
                  onChange={handleInputChange}
                  className={`w-full p-3 rounded-lg border ${
                    errors.selectedDate ? 'border-red-500' : 'border-orange-200'
                  } focus:ring-2 focus:ring-orange-600 focus:border-transparent bg-white shadow-sm`}
                >
                  <option value="">Select a date range</option>
                  {destination.dates.map((dateRange, index) => (
                    <option key={index} value={`${dateRange.startDate}-${dateRange.endDate}`}>
                      {new Date(dateRange.startDate).toLocaleDateString()} - {new Date(dateRange.endDate).toLocaleDateString()}
                    </option>
                  ))}
                </select>
                {errors.selectedDate && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.selectedDate}
                  </p>
                )}
              </div>

              {/* Number of People */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of People
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      numPersons: Math.max(1, prev.numPersons - 1)
                    }))}
                    className="p-2 rounded-lg border border-orange-200 hover:bg-orange-50 text-orange-600 transition-colors duration-300"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold text-gray-900">{formData.numPersons}</span>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      numPersons: prev.numPersons + 1
                    }))}
                    className="p-2 rounded-lg border border-orange-200 hover:bg-orange-50 text-orange-600 transition-colors duration-300"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Mobile Number */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-orange-600" />
                  </div>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your mobile number"
                    className={`w-full pl-10 pr-3 py-3 rounded-lg border ${
                      errors.mobileNumber ? 'border-red-500' : 'border-orange-200'
                    } focus:ring-2 focus:ring-orange-600 focus:border-transparent bg-white shadow-sm`}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Enter 10-digit Indian mobile number (with or without +91)
                </p>
                {errors.mobileNumber && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.mobileNumber}
                  </p>
                )}
              </div>

              {/* Price Summary */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 mb-6 border border-orange-100">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600">Price per person</span>
                  <span className="font-semibold text-gray-900">₹{destination.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600">Number of people</span>
                  <span className="font-semibold text-gray-900">{formData.numPersons}</span>
                </div>
                <div className="border-t border-orange-200 my-3"></div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total Price</span>
                  <span className="text-2xl font-bold text-orange-600">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="mb-6">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className={`mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-orange-300 rounded ${
                      errors.acceptTerms ? 'border-red-500' : ''
                    }`}
                  />
                  <label htmlFor="acceptTerms" className="text-sm text-gray-700">
                    I agree to the{' '}
                    <a href="#" className="text-orange-600 hover:text-orange-700 underline">
                      Terms and Conditions
                    </a>
                    {' '}and{' '}
                    <a href="#" className="text-orange-600 hover:text-orange-700 underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>
                {errors.acceptTerms && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.acceptTerms}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !formData.acceptTerms}
                className={`w-full py-3 rounded-xl font-semibold text-base transition-all duration-300 shadow-lg ${
                  isSubmitting || !formData.acceptTerms
                    ? 'bg-gradient-to-r from-red-300 to-orange-300 text-red-800 cursor-not-allowed opacity-75 border border-red-200'
                    : 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:shadow-xl hover:from-orange-700 hover:to-red-700'
                }`}
              >
                {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;