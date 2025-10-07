import User from "../Models/user.js";
import { createTokenForUser } from "../Services/authentication.js";

export const handleUserSignUp = async (req, res) => {
  const { name, password, email } = req.body;

  console.log({ name, password, email });
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Invalid fields Entered!!!" });
  }

  await User.create({
    //if same names as that of schema are there it can assign them directly.........
    name,
    password,
    email,
  });

  console.log("sign up success");
  return res.status(200).json({ msg: "signup successful!!" });
};

export const handlsUserSignIn = async (req, res) => {
  const { email, password } = req.body;
  console.log({ email, password });
  if (!email || !password) {
    return res.status(400).json({ error: "Missing input fields!!" });
  }

  const user = await User.matchedUserAndGenerateToken(email, password);
  if (!user) {
    return res.status(400).json({ error: "Error while matching user" });
  }

  console.log(user);
  if (user.error) {
    return res.status(404).json({ error: user.error });
  }

  const token = user.token;
  console.log("Token of user: ", token);
  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 72 * 60 * 60 * 1000,
    })
    .json({ msg: "Sign In succedded", role: user.role });
};

export const handleSignUpUserViaGoogleAuth = async (req, res) => {
  try {
    const user = req.user; // Comes from Passport Google OAuth strategy
    const frontendUrl =
      process.env.FRONTEND_URL ||
      "https://next-step-planner-v2-sze3.vercel.app/";

    if (!user) {
      return res.redirect(`${frontendUrl}/signin?error=oauth_failed`);
    }

    const token = createTokenForUser(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true in production with HTTPS
      sameSite: "Lax",
      maxAge: 72 * 60 * 60 * 1000, // 3 days
    });

    // Redirect to frontend dashboard or callback page
    return res.redirect(`${frontendUrl}/`);
  } catch (err) {
    console.error("OAuth signup error:", err);
    return res.redirect(`${frontendUrl}/signin?error=oauth_failed`);
  }
};

export const handleUserLogOut = (req, res) => {
  res.clearCookie("token");

  return res.status(200).json({ msg: "User logged out successfully" });
};
