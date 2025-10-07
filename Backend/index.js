import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import passport from "passport";
import { connectMongoDB } from "./Controllers/connection.js";
import destinationRouter from "./Route/destination.js";
import userRouter from "./Route/user.js";
import { checkForAuthenticationCookie } from "./Middlewares/authentication.js";
import bookingRouter from "./Route/book.js";
import tokenRouter from "./Route/tokenRoute.js";
import adminRouter from "./Route/admin.js";

dotenv.config();

// Connect to MongoDB before starting the server
const startServer = async () => {
  try {
    await connectMongoDB(process.env.MONGO_URL);

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(passport.initialize());
    
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://next-step-planner-v2-sze3.vercel.app",
      process.env.FRONTEND_URL,
    ].filter(Boolean);

    app.use(
      cors({
        origin: function (origin, callback) {
          // Allow requests with no origin (like mobile apps or curl requests)
          if (!origin) return callback(null, true);
          
          if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
          } else {
            console.log('Blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
          }
        },
        credentials: true,
      })
    );

    //user Routes
    app.use("/user", userRouter);

    //destination Routes
    app.use("/destinations", destinationRouter);

    //Booking Routes
    app.use("/booking", checkForAuthenticationCookie("token"), bookingRouter);

    app.use("/admin", checkForAuthenticationCookie("token"), adminRouter);
    //
    app.use("/gettokendetails", tokenRouter);

    app.listen(5001, () => {
      console.log("Server started successfully on port 5001");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Start the server
//started the server
startServer();
