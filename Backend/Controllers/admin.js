import Booking from "../Models/booking.js";


export async function handleGetBookingDetails(req, res) {
    const {destinationId} = req.params;

    if(!destinationId){
        return res.status(400).json({ error: "Destination ID is required" });
    }

    try {
        const bookings = await Booking.find({destinationId : destinationId}).populate("userId");

        const bookingDetails = bookings.map((booking) => ({
            bookingId: booking.bookingId,
            name: booking.userId?.name,
            email: booking.userId?.email,
            mobile: booking.mobileNumber,
            dateSlot: `${booking.dateSlot.startDate} to ${booking.dateSlot.endDate}`,
            bookingTime: booking.createdAt,
            persons: booking.numPersons,
            trekStatus: booking.status, 
        }));

        return res.status(200).json({msg : "Booking details fetched successfully!" , bookings : bookingDetails});
    }
    catch(error)
    {
        return res.status(500).json({error  : "Server side error while fetching booking details!!"});
    }
}