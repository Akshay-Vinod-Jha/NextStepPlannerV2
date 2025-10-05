import Booking from "../Models/booking.js";
import Destination from "../Models/destination.js";
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
      dateSlot,
      orderId,
      paymentId,
      mobileNumber,
      amountPaid
    } = req.body;

    if (!userId || !destinationId || !numPersons || !dateSlot || !dateSlot.startDate || !dateSlot.endDate || !amountPaid || !mobileNumber) {
      return res.status(400).json({ error: "Invalid or missing input fields!" });
    }

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
      paymentStatus : 'paid',
      bookingStatus : 'upcoming',
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
