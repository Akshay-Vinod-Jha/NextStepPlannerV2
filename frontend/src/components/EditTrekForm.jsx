import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { toast } from "react-toastify";
import { getApiUrl } from "../config/config.js";

const EditTrekForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const destination = location.state; // Direct access since you're passing destination as state
  const [destinationImages, setDestinationImages] = useState(
    destination.images
  );
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
    oldImages: "",
  });

  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    console.log("Destination data:", destination); // Debug log
    console.log("already : ", destination.images);
    if (destination) {
      setFormData({
        name: destination.name || "",
        location: destination.location || "",
        description: destination.description || "",
        whatsappGroupLink: destination.whatsappGroupLink || "",
        images: [], // Include existing images
        dates:
          destination.dates?.length > 0
            ? destination.dates.map((date, i) => ({
                id: `${i + 1}`,
                startDate: date.startDate ? date.startDate.slice(0, 10) : "",
                endDate: date.endDate ? date.endDate.slice(0, 10) : "",
              }))
            : [{ id: "1", startDate: "", endDate: "" }],
        duration: destination.duration || "",
        price: destination.price?.toString() || "", // Convert to string for input
        transportMode: destination.transportMode || "",
        status: destination.status || "available",
        oldImages: destinationImages,
      });
    }
  }, [destination, destinationImages]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
  const removeOldImage = (id) => {
    console.log(destinationImages);
    console.log("id : ", id);
    const temp = destinationImages.filter((image) => id != image._id);
    setDestinationImages(temp);
    console.log(destinationImages);
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

    // Check if destination exists and has _id
    if (!destination || !destination._id) {
      alert("Error: No destination ID found");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("location", formData.location);
    data.append("description", formData.description);
    data.append("whatsappGroupLink", formData.whatsappGroupLink);
    data.append("duration", formData.duration);
    data.append("price", formData.price);
    data.append("transportMode", formData.transportMode);
    data.append("status", formData.status);
    formData.images.forEach((image) => {
      data.append("images", image);
    });
    data.append(
      "dates",
      JSON.stringify(
        formData.dates.map(({ startDate, endDate }) => ({ startDate, endDate }))
      )
    );
    data.append("oldImages", JSON.stringify(formData.oldImages));
    console.log("This is Data : ", data);

    try {
      // Fixed: Use destination._id instead of trek._id
      const response = await fetch(
        getApiUrl(`/destinations/updatedestn/${destination._id}`),
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast.success("Trek updated successfully!");
        navigate("/destinations");
      } else {
        toast.error("Error");
      }
    } catch (err) {
      console.error("Error updating trek:", err);
      toast.error("An error occurred while updating the trek.");
    }
  };

  // Show loading or error state if no destination
  if (!destination) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No Trek Data Found
            </h2>
            <p className="text-gray-600 mb-4">
              Unable to load trek data for editing.
            </p>
            <button
              onClick={() => navigate("/destinations")}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg"
            >
              Back to Destinations
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-600 to-red-600 px-8 py-6">
            <div className="flex items-center space-x-3">
              <Mountain className="h-8 w-8 text-white" />
              <div>
                <h1 className="text-3xl font-bold text-white">Edit Trek</h1>
                <p className="text-orange-100">
                  Modify existing trekking details
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
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 transition-all duration-300 resize-none"
                placeholder="Describe the trek experience, highlights, and what makes it special..."
              />
            </div>

            {/* WhatsApp Group Link */}
            <div>
              <label className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                <MessageCircle className="h-5 w-5 text-orange-600 mr-2" />
                WhatsApp Group Link
              </label>
              <input
                type="url"
                name="whatsappGroupLink"
                value={formData.whatsappGroupLink}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                placeholder="https://chat.whatsapp.com/..."
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                <Image className="h-5 w-5 text-orange-600 mr-2" />
                Trek Images
              </label>

              {/* Display existing images */}
              {/* {destination.images.map((image, index) => (
                                <div key={index} className="relative group">
                                    <img
                                    src={typeof image === 'string' ? image : image.url || image.src}
                                    alt={`Existing ${index + 1}`}
                                    className="w-full h-24 object-cover rounded-lg border"
                                    />
                                    <button
                                    type="button"
                                    onClick={() => removeOldImage(image._id)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    >
                                    <X className="h-4 w-4" />
                                    </button>
                                    <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-1 rounded">
                                    current
                                    </div>
                                </div>
                            ))} */}
              {destinationImages?.length > 0 && (
                <div className="mt-4 mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Current Images:
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {destinationImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={
                            typeof image === "string"
                              ? image
                              : image.url || image.src
                          }
                          alt={`Existing ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeOldImage(image._id)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-1 rounded">
                          Current
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
                  Drag and drop new images here, or
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

              {/* New Image Preview */}
              {formData.images.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    New Images to Upload:
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        {" "}
                        <img
                          src={
                            image instanceof File
                              ? URL.createObjectURL(image)
                              : image
                          }
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
                        <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-1 rounded">
                          New
                        </div>
                      </div>
                    ))}
                  </div>
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
                type="submit"
                className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Upload className="h-5 w-5" />
                <span>Update Trek</span>
              </button>

              <button
                type="button"
                onClick={() => navigate("/destinations")}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300"
              >
                <X className="h-5 w-5" />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTrekForm;
