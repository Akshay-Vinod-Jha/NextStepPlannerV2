import React, { useState } from "react";
import {
  Plus,
  X,
  Upload,
  Calendar,
  MapPin,
  Mountain,
  Truck,
  IndianRupee,
  Clock,
  FileText,
  Image,
  MessageCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getApiUrl } from "../config/config.js";

const AdminTrekForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    whatsappGroupLink: "",
    images: [],
    dates: [{ id: "1", startDate: "", endDate: "" }],
    duration: "",
    price: "",
    transportMode: "",
    status: "available",
  });

  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (files) => {
    if (files) {
      const newImages = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      );
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const addTripDate = () => {
    const newId = Date.now().toString();
    setFormData((prev) => ({
      ...prev,
      dates: [...prev.dates, { id: newId, startDate: "", endDate: "" }],
    }));
  };

  const removeTripDate = (id) => {
    setFormData((prev) => ({
      ...prev,
      dates: prev.dates.filter((date) => date.id !== id),
    }));
  };

  const updateTripDate = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      dates: prev.dates.map((date) =>
        date.id === id ? { ...date, [field]: value } : date
      ),
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleImageUpload(e.dataTransfer.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    // Append basic fields
    data.append("name", formData.name);
    data.append("location", formData.location);
    data.append("description", formData.description);
    data.append("whatsappGroupLink", formData.whatsappGroupLink);
    data.append("duration", formData.duration);
    data.append("price", formData.price);
    data.append("transportMode", formData.transportMode);
    data.append("status", formData.status);

    // Append all images
    formData.images.forEach((image) => {
      data.append("images", image); // multiple files can be appended under same key
    });

    // Convert and append dates array as JSON string
    data.append(
      "dates",
      JSON.stringify(
        formData.dates.map(({ startDate, endDate }) => ({ startDate, endDate }))
      )
    );

    // Make API request
    try {
      const response = await fetch(getApiUrl("/destinations/adddestn"), {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Trek added successfully!");
        navigate("/destinations");
        // Optional: resetFormData()
      } else {
        toast.error("Error");
      }
    } catch (err) {
      console.error("Error submitting trek:", err);
      toast.error("An error occurred while submitting the trek.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-600 to-red-600 px-8 py-6">
            <div className="flex items-center space-x-3">
              <Mountain className="h-8 w-8 text-white" />
              <div>
                <h1 className="text-3xl font-bold text-white">Add New Trek</h1>
                <p className="text-orange-100">
                  Upload trekking details for TREKORA
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Trek Name */}
            <div>
              <label className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                <Mountain className="h-5 w-5 text-orange-600 mr-2" />
                Trek Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                placeholder="Enter trek name (e.g., Roopkund Trek)"
              />
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                <MapPin className="h-5 w-5 text-orange-600 mr-2" />
                Location *
              </label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                placeholder="Enter location (e.g., Uttarakhand, Himachal Pradesh)"
              />
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                <FileText className="h-5 w-5 text-orange-600 mr-2" />
                Description *
              </label>
              <textarea
                name="description"
                required
                rows={6}
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 transition-all duration-300 resize-none"
                placeholder="Describe the trek experience, highlights, and what makes it special..."
              />

              {/* Formatting Guide */}
              <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="text-sm font-semibold text-blue-800 mb-2">
                  📝 Text Formatting Guide:
                </h4>
                <div className="text-xs text-blue-700 space-y-1">
                  <div className="flex items-center space-x-4">
                    <span className="font-mono bg-blue-100 px-2 py-1 rounded">
                      **Bold Text**
                    </span>
                    <span>
                      → <strong>Bold Text</strong>
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-mono bg-blue-100 px-2 py-1 rounded">
                      *Italic Text*
                    </span>
                    <span>
                      → <em>Italic Text</em>
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-mono bg-blue-100 px-2 py-1 rounded">
                      `Code Text`
                    </span>
                    <span>
                      →{" "}
                      <code className="bg-gray-100 text-orange-600 px-1 rounded">
                        Code Text
                      </code>
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-mono bg-blue-100 px-2 py-1 rounded">
                      __Underlined__
                    </span>
                    <span>
                      → <u>Underlined</u>
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-mono bg-blue-100 px-2 py-1 rounded">
                      ~~Strikethrough~~
                    </span>
                    <span>
                      → <s>Strikethrough</s>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Group Link */}
            <div>
              <label className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                <MessageCircle className="h-5 w-5 text-green-600 mr-2" />
                WhatsApp Group Link
              </label>
              <input
                type="url"
                name="whatsappGroupLink"
                value={formData.whatsappGroupLink}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-600 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                placeholder="https://chat.whatsapp.com/xxxxxxxxxxxxxxx"
              />
              <p className="mt-2 text-sm text-gray-600">
                <span className="flex items-center">
                  <MessageCircle className="h-4 w-4 text-green-500 mr-1" />
                  Optional: Add WhatsApp group invite link for trek participants
                  to connect and coordinate
                </span>
              </p>
            </div>

            {/* Image Upload */}
            <div>
              <label className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                <Image className="h-5 w-5 text-orange-600 mr-2" />
                Trek Images
              </label>

              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                  dragActive
                    ? "border-orange-600 bg-orange-50"
                    : "border-gray-300 hover:border-orange-400 hover:bg-gray-50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">
                  Drag and drop images here, or
                </p>
                <label className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg cursor-pointer transition-colors duration-300">
                  Browse Files
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e.target.files)}
                  />
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  PNG, JPG, JPEG up to 10MB each
                </p>
              </div>

              {/* Image Preview */}
              {formData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Trip Dates */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="flex items-center text-lg font-semibold text-gray-900">
                  <Calendar className="h-5 w-5 text-orange-600 mr-2" />
                  Trip Dates *
                </label>
                <button
                  type="button"
                  onClick={addTripDate}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-300"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Date</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.dates.map((tripDate, index) => (
                  <div key={tripDate.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">
                        Trip {index + 1}
                      </h4>
                      {formData.dates.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTripDate(tripDate.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Start Date
                        </label>
                        <input
                          type="date"
                          required
                          value={tripDate.startDate}
                          onChange={(e) =>
                            updateTripDate(
                              tripDate.id,
                              "startDate",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-1 focus:ring-orange-200 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          End Date
                        </label>
                        <input
                          type="date"
                          required
                          value={tripDate.endDate}
                          onChange={(e) =>
                            updateTripDate(
                              tripDate.id,
                              "endDate",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-1 focus:ring-orange-200 transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Duration, Price, Transport - Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Duration */}
              <div>
                <label className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                  <Clock className="h-5 w-5 text-orange-600 mr-2" />
                  Duration *
                </label>
                <input
                  type="text"
                  name="duration"
                  required
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                  placeholder="e.g., 8 Days, 5 Days 4 Nights"
                />
              </div>

              {/* Price */}
              <div>
                <label className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                  <IndianRupee className="h-5 w-5 text-orange-600 mr-2" />
                  Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                  placeholder="Enter price in rupees"
                />
              </div>

              {/* Transport Mode */}
              <div>
                <label className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                  <Truck className="h-5 w-5 text-orange-600 mr-2" />
                  Transport Mode *
                </label>
                <select
                  name="transportMode"
                  required
                  value={formData.transportMode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                >
                  <option value="">Select transport mode</option>
                  <option value="ac-bus">AC Bus</option>
                  <option value="non-ac-bus">Non-AC Bus</option>
                  <option value="train">Train</option>
                  <option value="flight">Flight</option>
                  <option value="private-vehicle">Private Vehicle</option>
                </select>
              </div>

              {/* Trek Status */}
              <div>
                <label className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                  <Mountain className="h-5 w-5 text-orange-600 mr-2" />
                  Trek Status *
                </label>
                <select
                  name="status"
                  required
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                >
                  <option value="available">Available for Booking</option>
                  <option value="unavailable">Unavailable</option>
                </select>
                <p className="mt-2 text-sm text-gray-500">
                  Set to "Unavailable" to prevent bookings while keeping the
                  trek visible
                </p>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                onClick={() => handleSubmit()}
                type="submit"
                className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Upload className="h-5 w-5" />
                <span>Publish Trek</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminTrekForm;
