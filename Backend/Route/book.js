import express from "express";
import { handleTreckBooking, getDestinationBookings, updateBookingStatus } from "../Controllers/bookHandler.js";
import { upload } from "../Utils/cloudConfig.js";


const bookingRouter = express.Router();

bookingRouter.post("/booktrek/:destinationId", upload.single('paymentScreenshot'), handleTreckBooking);
bookingRouter.get("/destination/:destinationId", getDestinationBookings);
bookingRouter.patch("/update/:bookingId", updateBookingStatus);


export default bookingRouter;