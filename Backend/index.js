import express from "express"
import dotenv from 'dotenv';
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
import adminRouter from "./Route/admin.js"

dotenv.config();

// Connect to MongoDB before starting the server
const startServer = async () => {
  try {
    await connectMongoDB(process.env.MONGO_URL);
    
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(
  cors({
    origin: ["http://localhost:5173","http:/localhost:5174"],
    credentials: true,
  })
);


//user Routes
app.use("/user",userRouter)

//destination Routes
app.use("/destinations",destinationRouter)

//Booking Routes
app.use("/booking",checkForAuthenticationCookie("token"),bookingRouter);

app.use("/admin",checkForAuthenticationCookie("token"),adminRouter);
//
app.use("/gettokendetails",tokenRouter);

    app.listen(5001, () => {
      console.log("Server started successfully on port 5001");
    });
    
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Start the server
startServer();