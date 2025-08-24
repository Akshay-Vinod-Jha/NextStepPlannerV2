import express from "express";
const adminRouter = express.Router();
import { checkForAuthenticationCookieForAdmin } from "../Middlewares/adminAuthenticationCookie.js";
import { handleGetBookingDetails } from "../Controllers/admin.js";


adminRouter.get("/getbookingdetails/:destinationId", checkForAuthenticationCookieForAdmin("token"), handleGetBookingDetails);

export default adminRouter;
