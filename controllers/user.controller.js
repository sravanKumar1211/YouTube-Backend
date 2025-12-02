import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const cookieOptions = {
  httpOnly: true,
  secure: false,   
  sameSite: "Lax",
};



const JWT_SECRET = "SECRET"; // 

const UserController = {
 
  // SIGN UP

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

      if (!userName || !email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const isExist = await User.findOne({ userName });

      if (isExist) {
        return res.status(400).json({
          message: "User already exists with this userName",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

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

      await user.save();

      return res.status(201).json({
        message: "User Registered Successfully",
        data: user,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },

  
  // SIGN IN (LOGIN)
  
  async signIn(req, res) {
    try {
      const { userName, password,email } = req.body;

      const user = await User.findOne({ userName });

      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      // Generate JWT
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "10d",
      });

      // Set cookie
      res.cookie("token", token, cookieOptions);

      return res.status(200).json({
        message: "Logged in successfully",
        success: true,
        user:user,
        token,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },

  
  // LOGOUT
  
  logout(req, res) {
    res.clearCookie("token", cookieOptions);
    return res.json({ message: "Logged Out success" });
  },
};

export default UserController;
