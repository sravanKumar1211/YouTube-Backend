import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//  COOKIE OPTIONS  //

// httpOnly prevents JS access (protects against XSS)
// secure:false -> allow cookies over HTTP (set true in production with HTTPS)
// sameSite:Lax allows cookies for most cross-site requests (safer default)

const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "Lax",
};


const JWT_SECRET = "SECRET";

const UserController = {

  //  USER SIGN UP  //

  // Registers a new user by validating input,
  // hashing password, saving data, and returning user info.
  async signUp(req, res) {
    try {
      const {
        channelName,
        userName,
        about,
        profilePic,
        channelBanner,
        password,
        email,
        fullName,
      } = req.body;

      // Required fields check
      if (!userName || !email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Check if username already exists
      const isExist = await User.findOne({ userName });

      if (isExist) {
        return res.status(400).json({
          message: "User already exists with this userName",
        });
      }

      // Hash password for security
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user document
      const user = new User({
        channelName,
        userName,
        about,
        profilePic,
        email,
        fullName,
        channelBanner,
        password: hashedPassword,
      });

      await user.save(); // Save to database

      return res.status(201).json({
        message: "User Registered Successfully",
        data: user,
      });

    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },

  
  //  USER SIGN IN (LOGIN)  //
  // Validates credentials, generates JWT token, sets cookie, returns user data.
  async signIn(req, res) {
    try {
      const { userName, password, email } = req.body;

      // Find user by username
      const user = await User.findOne({ userName });

      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      // Compare entered password with hashed password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      // Create JWT token with user ID payload
      const token = jwt.sign(
        { userId: user._id }, 
        JWT_SECRET,
        { expiresIn: "10d" }
      );

      // Store token in cookies (session-like usage)
      res.cookie("token", token, cookieOptions);

      return res.status(200).json({
        message: "Logged in successfully",
        success: true,
        user: user,
        token,
      });

    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },

  
  //  LOGOUT USER //
  // Clears the JWT cookie to log out the user.
  logout(req, res) {
    res.clearCookie("token", cookieOptions);
    return res.json({ message: "Logged Out success" });
  },
};

export default UserController;
