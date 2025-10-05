import Booking from "../Models/booking.js";
import Destination from "../Models/destination.js";
import User from "../Models/user.js";
import { v4 as uuidv4 } from 'uuid';

// Generate 10-digit numeric booking ID like "NP-1234567890"
function generateNumericBookingId() {
  const uuid = uuidv4().replace(/\D/g, ''); 
  const tenDigits = uuid.slice(0, 10).padEnd(10, '0'); 
  return `NP-${tenDigits}`;
}


export async function handleTreckBooking(req, res) {


  console.log("Request to book trek  recieved : ",req.user.userId);
  if(!req.user || !req.user.userId)
  {
    return res.status(401).json({error : "User is not Authenticated!!"});
  }

  if(!req.params || !req.params.destinationId || !req.body)
  {
    return res.status(400).json({error : "Sufficient information not recieved!"});
  }

  

  try {

    const userId = req.user.userId;
    const destinationId = req.params.destinationId;

    // Check if destination exists and is available
    const destination = await Destination.findById(destinationId);
    
    if (!destination) {
      return res.status(404).json({ error: "Destination not found!" });
    }

    if (destination.status === 'unavailable') {
      return res.status(403).json({ error: "This trek is currently unavailable for booking!" });
    }

    const {
      numPersons,
      startDate,
      endDate,
      orderId,
      paymentId,
      mobileNumber,
      amountPaid
    } = req.body;

    // Handle payment screenshot from file upload
    let paymentScreenshot = null;
    if (req.file) {
      paymentScreenshot = {
        url: req.file.path,
        filename: req.file.filename
      };
    }

    if (!userId || !destinationId || !numPersons || !startDate || !endDate || !amountPaid || !mobileNumber) {
      return res.status(400).json({ error: "Invalid or missing input fields!" });
    }

    if (!paymentScreenshot) {
      return res.status(400).json({ error: "Payment screenshot is required!" });
    }

    const dateSlot = {
      startDate: new Date(startDate),
      endDate: new Date(endDate)
    };

    const bookingId = generateNumericBookingId();

    console.log("Attempting to create booking with data:", {
      userId,
      destinationId,
      bookingId,
      numPersons,
      dateSlot,
      mobileNumber,
      amountPaid
    });

    const newBooking = await Booking.create({
      userId,
      destinationId,
      bookingId,
      numPersons,
      dateSlot,
      orderId,
      paymentId,
      amountPaid,
      mobileNumber,
      paymentScreenshot,
      paymentStatus : 'pending',
      bookingStatus : 'pending',
    });

    console.log("New booking created:", newBooking);

    return res.status(200).json({
      msg: "Trip booked successfully!",
      data: newBooking
    });

  } catch (err) {
    console.error("Booking error:", err);
    return res.status(500).json({ error: "Server error while booking trip." });
  }
}

// Get all bookings for a specific destination (Admin only)
export async function getDestinationBookings(req, res) {
  console.log("Request to get destination bookings received");
  
  try {
    const { destinationId } = req.params;

    if (!destinationId) {
      return res.status(400).json({ error: "Destination ID is required!" });
    }

    // Fetch all bookings for this destination and populate user details
    const bookings = await Booking.find({ destinationId })
      .populate('userId', 'name email')
      .populate('destinationId', 'name location')
      .sort({ createdAt: -1 });

    console.log(`Found ${bookings.length} bookings for destination ${destinationId}`);

    return res.status(200).json({
      msg: "Bookings fetched successfully!",
      data: bookings
    });

  } catch (err) {
    console.error("Error fetching bookings:", err);
    return res.status(500).json({ error: "Server error while fetching bookings." });
  }
}

// Update booking status (Admin only)
export async function updateBookingStatus(req, res) {
  console.log("Request to update booking status received");
  
  try {
    const { bookingId } = req.params;
    const { bookingStatus, paymentStatus } = req.body;

    if (!bookingId) {
      return res.status(400).json({ error: "Booking ID is required!" });
    }

    if (!bookingStatus && !paymentStatus) {
      return res.status(400).json({ error: "At least one status field is required!" });
    }

    // Build update object
    const updateData = {};
    if (bookingStatus) updateData.bookingStatus = bookingStatus;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      updateData,
      { new: true, runValidators: true }
    ).populate('userId', 'name email')
     .populate('destinationId', 'name location');

    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found!" });
    }

    console.log("Booking updated:", updatedBooking);

    return res.status(200).json({
      msg: "Booking status updated successfully!",
      data: updatedBooking
    });

  } catch (err) {
    console.error("Error updating booking status:", err);
    return res.status(500).json({ error: "Server error while updating booking status." });
  }
}
