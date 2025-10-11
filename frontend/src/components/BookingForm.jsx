import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  MapPin,
  ArrowLeft,
  AlertCircle,
  Phone,
  Upload,
  Image,
  CheckCircle,
  X,
  Instagram,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import qrCode from "../assets/qr.jpg";
import { sendBookingConfirmation } from "../utils/emailService";
import { useSelector } from "react-redux";
import { getApiUrl } from "../config/config.js";
import { ButtonLoader, FullPageLoader } from "./LoadingComponents";

const BookingForm = () => {
  const location = useLocation();
  const destination = location.state;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    selectedDate: "",
    numPersons: 1,
    mobileNumber: "",
    acceptTerms: false,
    destinationId: destination._id,
    orderId: null,
    paymentId: null,
    paymentScreenshot: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

  const totalPrice = destination.price * formData.numPersons;

  // Fetch user details from token
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.post(
          getApiUrl("/gettokendetails"),
          {},
          { withCredentials: true }
        );
        if (response.status === 200 && response.data) {
          setUserEmail(response.data.email || "");
          setUserName(response.data.name || "");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, []);

  // Mobile number validation for Indian numbers
  const validateMobileNumber = (mobile) => {
    // Remove any spaces, dashes, or other non-digit characters except +
    const cleanMobile = mobile.replace(/[^\d+]/g, "");

    // Indian mobile number patterns:
    // 10 digits starting with 6, 7, 8, or 9
    // Or with +91 prefix
    const indianMobileRegex = /^(?:\+91)?[6-9]\d{9}$/;

    return indianMobileRegex.test(cleanMobile);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.selectedDate) newErrors.selectedDate = "Please select a date";

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!validateMobileNumber(formData.mobileNumber)) {
      newErrors.mobileNumber = "Please enter a valid Indian mobile number";
    }

    if (!formData.paymentScreenshot)
      newErrors.paymentScreenshot = "Please upload payment screenshot";

    if (!formData.acceptTerms)
      newErrors.acceptTerms = "Please accept terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Common function to process file (for both click and drag/drop)
  const processFile = (file) => {
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setErrors((prev) => ({
          ...prev,
          paymentScreenshot: "File size should be less than 5MB",
        }));
        return;
      }

      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          paymentScreenshot: "Please upload an image file",
        }));
        return;
      }

      setFormData((prev) => ({ ...prev, paymentScreenshot: file }));
      setPreviewImage(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, paymentScreenshot: "" }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  // Drag and Drop Event Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, paymentScreenshot: null }));
    setPreviewImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const [startDateStr, endDateStr] = formData.selectedDate.split("-");

      // Clean mobile number for backend (remove spaces, keep only digits and +)
      const cleanMobileNumber = formData.mobileNumber.replace(/[^\d+]/g, "");

      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append("destinationId", formData.destinationId);
      formDataToSend.append("numPersons", formData.numPersons);
      formDataToSend.append("mobileNumber", cleanMobileNumber);
      formDataToSend.append("startDate", new Date(startDateStr).toISOString());
      formDataToSend.append("endDate", new Date(endDateStr).toISOString());
      formDataToSend.append(
        "amountPaid",
        destination.price * formData.numPersons
      );
      formDataToSend.append("paymentScreenshot", formData.paymentScreenshot);

      const response = await axios.post(
        getApiUrl(`/booking/booktrek/${formData.destinationId}`),
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Booking success:", response.data);

        // Send confirmation email to user
        if (userEmail && userName) {
          // Format dates properly for email
          const formatDate = (dateStr) => {
            const date = new Date(dateStr);
            const day = date.getDate().toString().padStart(2, "0");
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
          };

          const bookingData = {
            userName: userName,
            userEmail: userEmail,
            trekName: destination.name,
            trekLocation: destination.location,
            trekDate: `${formatDate(startDateStr)} - ${formatDate(endDateStr)}`,
            numPersons: formData.numPersons,
            totalAmount: (
              destination.price * formData.numPersons
            ).toLocaleString(),
            whatsappGroupLink: destination.whatsappGroupLink || null,
          };

          const emailResult = await sendBookingConfirmation(bookingData);
          if (emailResult.success) {
            console.log("Confirmation email sent to user");
          } else {
            console.log(
              "Failed to send confirmation email, but booking was successful"
            );
          }
        }

        setShowThankYou(true);
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
    if (name === "mobileNumber") {
      // Remove all non-digit characters except +
      let cleaned = value.replace(/[^\d+]/g, "");

      // Format for display (add spaces)
      if (cleaned.startsWith("+91")) {
        cleaned = cleaned.substring(3);
        if (cleaned.length > 0) {
          processedValue =
            "+91 " + cleaned.replace(/(\d{5})(\d{0,5})/, "$1 $2").trim();
        } else {
          processedValue = "+91 ";
        }
      } else if (cleaned.length > 0) {
        processedValue = cleaned.replace(/(\d{5})(\d{0,5})/, "$1 $2").trim();
      } else {
        processedValue = "";
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : processedValue,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <>
      {isSubmitting && <FullPageLoader text="Processing your booking..." />}
      <div className="min-h-screen bg-white mt-20">
        <div className="flex justify-start ml-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center bg-gradient-to-r from-orange-50 to-red-50 text-orange-600 hover:text-orange-700 px-4 py-2 rounded-lg border border-orange-200 transition-all duration-300 hover:shadow-md flex-shrink-0 mt-2"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="font-medium">Back to Details</span>
          </button>
        </div>
        <div className="max-w-2xl mx-auto px-4 pb-8">
          <div className="flex items-start space-x-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-orange-200 flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Book Your Trek
              </h2>

              {/* Trek Details */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 mb-6 border border-orange-100">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {destination.name}
                </h3>
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
                      errors.selectedDate
                        ? "border-red-500"
                        : "border-orange-200"
                    } focus:ring-2 focus:ring-orange-600 focus:border-transparent bg-white shadow-sm`}
                  >
                    <option value="">Select a date range</option>
                    {destination.dates.map((dateRange, index) => (
                      <option
                        key={index}
                        value={`${dateRange.startDate}-${dateRange.endDate}`}
                      >
                        {new Date(dateRange.startDate).toLocaleDateString()} -{" "}
                        {new Date(dateRange.endDate).toLocaleDateString()}
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
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          numPersons: Math.max(1, prev.numPersons - 1),
                        }))
                      }
                      className="p-2 rounded-lg border border-orange-200 hover:bg-orange-50 text-orange-600 transition-colors duration-300"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold text-gray-900">
                      {formData.numPersons}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          numPersons: prev.numPersons + 1,
                        }))
                      }
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
                        errors.mobileNumber
                          ? "border-red-500"
                          : "border-orange-200"
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
                    <span className="font-semibold text-gray-900">
                      ₹{destination.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-600">Number of people</span>
                    <span className="font-semibold text-gray-900">
                      {formData.numPersons}
                    </span>
                  </div>
                  <div className="border-t border-orange-200 my-3"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">
                      Total Amount to Pay
                    </span>
                    <span className="text-2xl font-bold text-orange-600">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Payment QR Code */}
                <div className="mb-6 bg-white border-2 border-orange-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">
                    Scan QR Code to Pay
                  </h3>
                  <div className="flex justify-center mb-4">
                    <img
                      src={qrCode}
                      alt="Payment QR Code"
                      className="w-64 h-64 object-contain border-2 border-orange-100 rounded-lg shadow-md"
                    />
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700 text-center">
                      <span className="font-semibold text-orange-600">
                        Total Amount: ₹{totalPrice.toLocaleString()}
                      </span>
                    </p>
                    <p className="text-xs text-gray-600 text-center mt-2">
                      Please scan the QR code above using any UPI app and
                      complete the payment
                    </p>
                  </div>
                </div>

                {/* Payment Screenshot Upload */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Payment Screenshot *
                  </label>
                  <p className="text-xs text-gray-500 mb-3">
                    Please make payment of ₹{totalPrice.toLocaleString()} and
                    upload the screenshot below
                  </p>

                  {!previewImage ? (
                    <label
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onDragEnter={handleDragEnter}
                      className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
                        errors.paymentScreenshot
                          ? "border-red-500 bg-red-50 hover:bg-red-100"
                          : isDragOver
                          ? "border-orange-500 bg-orange-100 scale-105"
                          : "border-orange-300 bg-orange-50 hover:bg-orange-100"
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload
                          className={`h-10 w-10 mb-3 transition-all duration-300 ${
                            errors.paymentScreenshot
                              ? "text-red-500"
                              : isDragOver
                              ? "text-orange-600 animate-bounce"
                              : "text-orange-600"
                          }`}
                        />
                        <p className="mb-2 text-sm text-gray-600">
                          <span className="font-semibold">
                            {isDragOver ? "Drop file here" : "Click to upload"}
                          </span>{" "}
                          {!isDragOver && "or drag and drop"}
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG or JPEG (MAX. 5MB)
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  ) : (
                    <div className="relative">
                      <img
                        src={previewImage}
                        alt="Payment Screenshot"
                        className="w-full h-48 object-contain rounded-xl border-2 border-orange-200 bg-gray-50"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-300"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <div className="mt-2 flex items-center text-green-600 text-sm">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        <span>Screenshot uploaded successfully</span>
                      </div>
                    </div>
                  )}

                  {errors.paymentScreenshot && (
                    <p className="mt-2 text-sm text-red-500 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.paymentScreenshot}
                    </p>
                  )}
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
                        errors.acceptTerms ? "border-red-500" : ""
                      }`}
                    />
                    <label
                      htmlFor="acceptTerms"
                      className="text-sm text-gray-700"
                    >
                      I agree to the{" "}
                      <a
                        href="/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:text-orange-700 underline"
                      >
                        Terms and Conditions
                      </a>{" "}
                      and{" "}
                      <a
                        href="/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:text-orange-700 underline"
                      >
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
                      ? "bg-gradient-to-r from-red-300 to-orange-300 text-red-800 cursor-not-allowed opacity-75 border border-red-200"
                      : "bg-gradient-to-r from-orange-600 to-red-600 text-white hover:shadow-xl hover:from-orange-700 hover:to-red-700"
                  }`}
                >
                  {isSubmitting ? (
                    <ButtonLoader text="Processing Booking..." />
                  ) : (
                    "Submit Booking"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Thank You Modal */}
        {showThankYou && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all duration-300 animate-in relative">
              {/* Close Button */}
              <button
                onClick={() => setShowThankYou(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Success Icon */}
              <div className="flex justify-center mb-6">
                <div className="bg-green-100 rounded-full p-4">
                  <CheckCircle className="h-16 w-16 text-green-600" />
                </div>
              </div>

              {/* Thank You Message */}
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Thank You for Booking!
                </h2>
                <p className="text-gray-600 mb-4">
                  Your booking has been submitted successfully. We'll verify
                  your payment and confirm shortly.
                </p>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-orange-800 mb-2">
                    📱{" "}
                    {destination.whatsappGroupLink
                      ? "Join the Trek WhatsApp Group for updates and coordination with fellow trekkers!"
                      : "WhatsApp group link will be shared once available"}
                  </p>
                </div>
              </div>

              {/* WhatsApp Group Button */}
              {destination.whatsappGroupLink ? (
                <a
                  href={destination.whatsappGroupLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold text-center transition-colors duration-300 mb-3"
                >
                  Join Trek WhatsApp Group
                </a>
              ) : (
                <div className="w-full bg-gray-300 text-gray-600 py-3 rounded-lg font-semibold text-center mb-3">
                  WhatsApp Group Not Available
                </div>
              )}

              {/* Instagram Connect Button */}
              <a
                href="https://www.instagram.com/trekora_org/?utm_source=qr&igsh=MW4wb3I5bTU4NW91MA%3D%3D#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 rounded-lg font-semibold text-center transition-all duration-300 mb-3 space-x-2"
              >
                <Instagram className="h-5 w-5" />
                <span>Follow us on Instagram</span>
              </a>

              {/* Continue Button */}
              <button
                onClick={() => {
                  setShowThankYou(false);
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                  navigate("/destinations");
                }}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Browse More Treks
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookingForm;
