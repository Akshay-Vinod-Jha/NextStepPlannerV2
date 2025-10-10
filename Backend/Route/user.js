import express from "express";
import {
  handleUserSignUp,
  handlsUserSignIn,
  handleSignUpUserViaGoogleAuth,
  handleUserLogOut,
} from "../Controllers/userHandler.js";
import passport from "passport";
import configurePassport from "../Config/passport.js";
import { checkForAuthenticationCookie } from "../Middlewares/authentication.js";

// ✅ Call this first to initialize the Google Strategy
configurePassport(passport);

const userRouter = express.Router();

userRouter.post("/signup", handleUserSignUp);

userRouter.post("/signin", handlsUserSignIn);

userRouter.post(
  "/logout",
  checkForAuthenticationCookie("token"),
  handleUserLogOut
);

userRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

userRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  handleSignUpUserViaGoogleAuth
);

export default userRouter;
