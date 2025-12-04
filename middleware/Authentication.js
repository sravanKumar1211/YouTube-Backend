
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const auth = async (req, res, next) => {

  // 1️⃣ First check cookie
  let token = req.cookies.token;

  // 2️⃣ If no cookie, check Authorization header
  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(" ");
    if (parts[0] === "Bearer" && parts[1]) {
      token = parts[1];
    }
  }

  // 3️⃣ If still no token → unauthorized
  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, "SECRET");

    req.user = await User.findById(decoded.userId).select("-password");

    next();
  } catch (err) {
    return res.status(401).json({ error: "Token is not valid" });
  }
};

export default auth;
