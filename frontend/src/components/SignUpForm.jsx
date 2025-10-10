import React, { useState, useEffect } from "react";
import { User, Mail, Lock, Eye, EyeOff, Mountain } from "lucide-react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { getApiUrl } from "../config/config.js";

const SignUpForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      tempErrors.name = "Name is required";
      isValid = false;
    }

    // Email validation (required)
    if (!formData.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    try {
      console.log("Sign up data:", formData);
      const response = await axios.post(getApiUrl("/user/signup"), formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201 || response.status === 200) {
        toast.success("Sign up successful!");
        navigate("/signin", { state: { from: location } });
      } else {
        toast.error("Something went wrong. Please try again.");
        navigate("/");
      }
    } catch (error) {
      toast.error(
        `Signup failed! ${error.response?.data?.message || "Server error"}`
      );
      if (error.response?.data?.message) {
        console.log(`Error: ${error.response.data.message}`);
      } else {
        console.log("Network error or server not responding.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 px-8 py-5 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Mountain className="h-8 w-8 text-white" />
              <span className="text-2xl font-bold text-white">TREKORA</span>
            </div>
            <h2 className="text-xl font-semibold text-orange-100">
              Join Our Community
            </h2>
            <p className="text-orange-200 text-sm mt-1">
              Start your adventure today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg border-2 ${
                    errors.name ? "border-red-500" : "border-gray-200"
                  } focus:border-orange-600 focus:ring-2 focus:ring-orange-200 transition-all duration-300`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <p className="text-red-600 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address *
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
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg border-2 ${
                    errors.email ? "border-red-500" : "border-gray-200"
                  } focus:border-orange-600 focus:ring-2 focus:ring-orange-200 transition-all duration-300`}
                  placeholder="Enter your email address"
                />
              </div>
              {errors.email && (
                <p className="text-red-600 text-xs mt-1">{errors.email}</p>
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
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-2.5 rounded-lg border-2 ${
                    errors.password ? "border-red-500" : "border-gray-200"
                  } focus:border-orange-600 focus:ring-2 focus:ring-orange-200 transition-all duration-300`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-2.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Create Account
            </button>

            {/* Sign In Link */}
            <div className="text-center pt-1">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() =>
                    navigate("/signin", { state: { from: location } })
                  }
                  type="button"
                  className="text-orange-600 hover:text-orange-700 font-semibold transition-colors"
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
