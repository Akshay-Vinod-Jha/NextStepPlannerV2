import express from "express";
import { handleTreckBooking } from "../Controllers/bookHandler.js";
import { upload } from "../Utils/cloudConfig.js";


const bookingRouter = express.Router();

bookingRouter.post("/booktrek/:destinationId", upload.single('paymentScreenshot'), handleTreckBooking);


export default bookingRouter;