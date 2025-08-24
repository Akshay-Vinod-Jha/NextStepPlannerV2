import express from "express";
import { handleTreckBooking } from "../Controllers/bookHandler.js";


const bookingRouter = express.Router();

bookingRouter.post("/booktrek/:destinationId",handleTreckBooking);


export default bookingRouter;