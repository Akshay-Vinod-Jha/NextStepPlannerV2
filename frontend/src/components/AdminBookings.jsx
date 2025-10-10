import React, { useState, useEffect } from "react";
import {
  Search,
  ArrowLeft,
  Eye,
  X,
  Image as ImageIcon,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { getApiUrl } from "../config/config.js";
import {
  sendBookingConfirmedEmail,
  sendBookingCancelledEmail,
} from "../utils/emailService.js";
import { LoadingSpinner, ButtonLoader } from "./LoadingComponents";

const AdminBookings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const destination = location.state?.destination;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null); // Track which booking is being updated
  const [searchTerm, setSearchTerm] = useState("");
  const [bookingStatusFilter, setBookingStatusFilter] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  // Redirect if no destination
  useEffect(() => {
    if (!destination) {
      toast.error("No destination selected!");
      navigate("/admin");
    }
  }, [destination, navigate]);

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      if (!destination) return;

      console.log("Fetching bookings for destination:", destination._id);

      try {
        setLoading(true);
        const response = await axios.get(
          getApiUrl(`/booking/destination/${destination._id}`),
          { withCredentials: true }
        );

        console.log("Bookings response:", response.data);

        if (response.data?.data) {
          setBookings(response.data.data);
          console.log(`Loaded ${response.data.data.length} bookings`);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        console.error("Error response:", error.response?.data);
        console.error("Full error response:", error.response);
        toast.error(error.response?.data?.error || "Failed to fetch bookings!");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [destination]);

  // Filter bookings
  const filteredBookings = bookings.filter((booking) => {
    const userName = booking.userId?.name || "";
    const userEmail = booking.userId?.email || "";
    const bookingIdStr = booking.bookingId || "";
    const mobileStr = booking.mobileNumber?.toString() || "";

    const matchesSearch =
      userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mobileStr.includes(searchTerm) ||
      bookingIdStr.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBookingStatus =
      bookingStatusFilter === "All" ||
      booking.bookingStatus === bookingStatusFilter;

    return matchesSearch && matchesBookingStatus;
  });

  // Update booking status
  const handleUpdateStatus = async (bookingId, bookingStatus) => {
    try {
      setUpdating(bookingId); // Set loading state for this booking

      const response = await axios.patch(
        getApiUrl(`/booking/update/${bookingId}`),
        { bookingStatus },
        { withCredentials: true }
      );

      if (response.data?.data) {
        const updatedBooking = response.data.data;

        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === bookingId ? updatedBooking : booking
          )
        );
        setSelectedBooking(updatedBooking);

        // Send email notification based on status
        if (bookingStatus === "confirmed" || bookingStatus === "cancelled") {
          await sendStatusUpdateEmail(updatedBooking, bookingStatus);
        }

        toast.success(`Booking ${bookingStatus} successfully!`);
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
      toast.error("Failed to update booking status!");
    } finally {
      setUpdating(null); // Clear loading state
    }
  };

  // Send email when admin updates booking status
  const sendStatusUpdateEmail = async (booking, status) => {
    // Only send email for confirmed and cancelled status
    if (status !== "confirmed" && status !== "cancelled") {
      return;
    }

    // Check if user email exists
    if (!booking.userId?.email) {
      toast.warning(
        `Booking ${status} but no email address found for customer`
      );
      return;
    }

    try {
      const emailData = {
        userName: booking.userId?.name || "Dear Customer",
        userEmail: booking.userId?.email,
        trekName: destination?.name || "Trek",
        trekLocation: destination?.location || "Location",
        trekDateStart: formatDate(booking.dateSlot.startDate),
        trekDateEnd: formatDate(booking.dateSlot.endDate),
        numPersons: booking.numPersons,
        totalAmount: `₹${booking.amountPaid?.toLocaleString()}`,
        bookingId: booking.bookingId,
        whatsappGroupLink: destination?.whatsappGroupLink,
      };

      console.log(
        "Sending email for status:",
        status,
        "to:",
        emailData.userEmail
      );

      let emailResult;
      if (status === "confirmed") {
        emailResult = await sendBookingConfirmedEmail(emailData);
        if (emailResult.success) {
          toast.success("✅ Confirmation email sent to customer!");
        } else {
          console.error("Confirmation email failed:", emailResult.error);
          toast.warning("Booking confirmed but email notification failed");
        }
      } else if (status === "cancelled") {
        emailResult = await sendBookingCancelledEmail(emailData);
        if (emailResult.success) {
          toast.success("📧 Cancellation email sent to customer!");
        } else {
          console.error("Cancellation email failed:", emailResult.error);
          toast.warning("Booking cancelled but email notification failed");
        }
      }
    } catch (error) {
      console.error("Error sending status update email:", error);
      toast.warning(`Booking ${status} but failed to send email notification`);
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses =
      "px-3 py-1 rounded-full text-xs font-semibold uppercase";
    const statusColors = {
      confirmed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return `${baseClasses} ${
      statusColors[status] || "bg-gray-100 text-gray-800"
    }`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center text-orange-600 hover:text-orange-700 mb-4 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Admin Panel
          </button>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {destination?.name || "Trek Bookings"}
            </h1>
            <p className="text-lg text-gray-600">
              Total:{" "}
              <span className="font-semibold text-orange-600">
                {bookings.length}
              </span>
              {" | "}
              Confirmed:{" "}
              <span className="font-semibold text-green-600">
                {bookings.filter((b) => b.bookingStatus === "confirmed").length}
              </span>
              {" | "}
              Pending:{" "}
              <span className="font-semibold text-yellow-600">
                {bookings.filter((b) => b.bookingStatus === "pending").length}
              </span>
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, email, mobile, or booking ID..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                value={bookingStatusFilter}
                onChange={(e) => setBookingStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">
                    Booking ID
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">
                    User Details
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm hidden lg:table-cell">
                    Mobile
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm hidden md:table-cell">
                    Date Slot
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900 text-sm">
                    Persons
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">
                    Status
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900 text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <span className="font-medium text-orange-600 text-sm">
                        {booking.bookingId}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        {formatDateTime(booking.createdAt)}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900 text-sm">
                        {booking.userId?.name || "N/A"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {booking.userId?.email || "N/A"}
                      </div>
                      <div className="text-xs text-gray-500 lg:hidden mt-1">
                        {booking.mobileNumber}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600 text-sm hidden lg:table-cell">
                      {booking.mobileNumber}
                    </td>
                    <td className="py-4 px-4 text-xs text-gray-600 hidden md:table-cell">
                      <div>{formatDate(booking.dateSlot.startDate)}</div>
                      <div className="text-gray-400">to</div>
                      <div>{formatDate(booking.dateSlot.endDate)}</div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
                        {booking.numPersons}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={getStatusBadge(booking.bookingStatus)}>
                        {booking.bookingStatus}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => {
                          setSelectedBooking(booking);
                          setShowDetailsModal(true);
                        }}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredBookings.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center mt-6">
            <Search className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No bookings found
            </h3>
            <p className="text-gray-500">
              {searchTerm || bookingStatusFilter !== "All"
                ? "Try adjusting your filters."
                : "No bookings yet for this trek."}
            </p>
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {showDetailsModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-orange-600 to-red-600 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Booking Details</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-white hover:text-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Booking Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Booking ID</p>
                  <p className="font-semibold text-gray-900">
                    {selectedBooking.bookingId}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Booking Date</p>
                  <p className="font-semibold text-gray-900">
                    {formatDateTime(selectedBooking.createdAt)}
                  </p>
                </div>
              </div>

              {/* User Info */}
              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-900 mb-3">
                  User Information
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Name</p>
                    <p className="font-medium text-gray-900">
                      {selectedBooking.userId?.name || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="font-medium text-gray-900">
                      {selectedBooking.userId?.email || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Mobile</p>
                    <p className="font-medium text-gray-900">
                      {selectedBooking.mobileNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Persons</p>
                    <p className="font-medium text-gray-900">
                      {selectedBooking.numPersons}
                    </p>
                  </div>
                </div>
              </div>

              {/* Trek Info */}
              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Trek Information
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Start Date</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(selectedBooking.dateSlot.startDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">End Date</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(selectedBooking.dateSlot.endDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Amount Paid</p>
                    <p className="font-medium text-gray-900">
                      ₹{selectedBooking.amountPaid?.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Screenshot */}
              {selectedBooking.paymentScreenshot?.url && (
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Payment Screenshot
                  </h4>
                  <div className="relative">
                    <img
                      src={selectedBooking.paymentScreenshot.url}
                      alt="Payment Screenshot"
                      className="w-full h-64 object-contain bg-gray-100 rounded-lg cursor-pointer hover:opacity-90"
                      onClick={() => setShowImageModal(true)}
                    />
                    <button
                      onClick={() => setShowImageModal(true)}
                      className="absolute top-2 right-2 bg-white p-2 rounded-lg shadow-md hover:bg-gray-100"
                    >
                      <ImageIcon className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              )}

              {/* Status Update */}
              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Update Booking Status
                </h4>
                <div className="space-y-2">
                  {["pending", "confirmed", "cancelled"].map((status) => (
                    <button
                      key={status}
                      onClick={() =>
                        handleUpdateStatus(selectedBooking._id, status)
                      }
                      disabled={updating === selectedBooking._id}
                      className={`w-full px-4 py-3 rounded-lg font-medium text-sm transition-colors disabled:opacity-75 disabled:cursor-not-allowed ${
                        selectedBooking.bookingStatus === status
                          ? "bg-orange-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {updating === selectedBooking._id ? (
                        <ButtonLoader
                          text={`${
                            status.charAt(0).toUpperCase() + status.slice(1)
                          }ing...`}
                        />
                      ) : (
                        status.charAt(0).toUpperCase() + status.slice(1)
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Note: Confirming a booking means payment has been verified and
                  accepted.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && selectedBooking?.paymentScreenshot?.url && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[60] p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative max-w-5xl w-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedBooking.paymentScreenshot.url}
              alt="Payment Screenshot"
              className="w-full h-auto max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
