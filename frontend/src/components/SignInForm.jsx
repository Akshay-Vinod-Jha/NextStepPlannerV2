import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Mountain } from 'lucide-react'; // Changed Phone to Mail
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsAdmin, setIsAuthenticated } from '../Features/roleSlice.js';
import { toast } from 'react-toastify';

const SignInForm = () => {
  // State updated for email instead of contactNumber
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const fromObj = location.state?.from;
  const dispatch = useDispatch();

  // Simplified handleInputChange with email validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // On-the-fly validation for email
    if (name === 'email') {
      if (value.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setEmailError('Please enter a valid email address.');
      } else {
        setEmailError('');
      }
    }

    // On-the-fly validation for password
    if (name === 'password') {
      if (value.length > 0 && value.length < 6) {
        setPasswordError('Password must be at least 6 characters long.');
      } else {
        setPasswordError('');
      }
    }
  };

  // Updated validateForm to check for a valid email
  const validateForm = () => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate email
    if (!emailRegex.test(formData.email)) {
      setEmailError('Please enter a valid email address.');
      toast.error("Invalid email address.");
      isValid = false;
    } else {
      setEmailError('');
    }

    // Validate password
    if (formData.password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      toast.error("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleGoogleSignIn = () => {

     window.location.href = "http://localhost:5001/user/google";

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    try {
      console.log('Sign in data:', formData);

      const response = await axios.post("http://localhost:5001/user/signin", formData, {
        withCredentials: true
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      console.log(response.data);
      if (response.status === 200) {
        toast.success("Sign in successful!");
        dispatch(setIsAuthenticated(true));
        console.log("role outside:", response.data.role);
        if (response.data.role === 'ADMIN') {
          console.log("role inside:", response.data.role);
          await Promise.all([
            dispatch(setIsAdmin(true)),
            new Promise(resolve => setTimeout(resolve, 100))
          ]);
        }
        console.log(fromObj);
        if (fromObj && fromObj.pathname && fromObj.pathname === "/signup") {
          navigate("/");
        } else {
          navigate(-1);
        }
      } else {
        toast.error("Something went wrong. Please try again.");
      }

    } catch (error) {
      toast.error(`Sign In failed! ${error.response?.data?.error || 'Server error'}`);
      if (error.response && error.response.data && error.response.data.error) {
        console.log(`Error: ${error.response.data.error}`);
      } else {
        console.log("Network error or server not responding.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-600 to-red-600 px-8 py-5 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Mountain className="h-8 w-8 text-white" />
              <span className="text-2xl font-bold text-white">NisargPath</span>
            </div>
            <h2 className="text-xl font-semibold text-orange-100">Welcome Back</h2>
            <p className="text-orange-200 text-sm mt-1">Continue your trekking journey</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
            
            {/* Email Field (Replaced Contact Number) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg border-2 ${emailError ? 'border-red-500' : 'border-gray-200'} focus:border-orange-600 focus:ring-2 focus:ring-orange-200 transition-all duration-300`}
                  placeholder="Enter your email address"
                />
              </div>
              {emailError && (
                <p className="mt-1 text-xs text-red-600">{emailError}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-2.5 rounded-lg border-2 ${passwordError ? 'border-red-500' : 'border-gray-200'} focus:border-orange-600 focus:ring-2 focus:ring-orange-200 transition-all duration-300`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {passwordError && (
                <p className="mt-1 text-xs text-red-600">{passwordError}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                className="text-orange-600 hover:text-orange-700 text-sm font-medium transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-2.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Sign In
            </button>
            
            {/* Divider */}
            <div className="relative flex items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-xs">OR</span>
                <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Google Sign In Button */}
            <button

                onClick={handleGoogleSignIn}

                type="button"
                className="w-full flex items-center justify-center bg-white border-2 border-gray-200 hover:bg-gray-50 text-gray-700 py-2 rounded-lg font-medium transition-all duration-300"
            >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
                    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
                    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path>
                    <path fill="#1976D2" d="M43.611 20.083H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 36.494 44 30.836 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
                </svg>
                Continue with Google
            </button>

            {/* Sign Up Link */}
            <div className="text-center pt-1">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={() => navigate("/signup")}
                  type="button"
                  className="text-orange-600 hover:text-orange-700 font-semibold transition-colors"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </form>
        </div>

        {/* Additional Options */}
        <div className="bg-white rounded-2xl shadow-lg p-5 text-center">
          <p className="text-gray-600 text-sm mb-3">Quick Access</p>
          <div className="space-y-2.5">
            <button
              onClick={() => { navigate("/destinations") }}
              className="w-full border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white py-2 rounded-lg font-medium transition-all duration-300">
              Browse Treks as Guest
            </button>
            <button
              onClick={() => { navigate("/contact") }}
              className="w-full border-2 border-gray-300 text-gray-600 hover:bg-gray-50 py-2 rounded-lg font-medium transition-all duration-300">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;