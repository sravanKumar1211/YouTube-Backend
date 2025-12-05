import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const auth = async (req, res, next) => {

  // STEP 1: CHECK COOKIE TOKEN //
  // Try to get token from cookies (most secure/common method)
  let token = req.cookies.token;

  //  STEP 2: CHECK AUTHORIZATION HEADER //
  // If cookie is not available, look for token in:
  // Authorization: Bearer <token>
  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(" ");

    // Validate "Bearer" structure: ["Bearer", "<token>"]
    if (parts[0] === "Bearer" && parts[1]) {
      token = parts[1]; // extract the actual token
    }
  }

  // STEP 3: IF TOKEN STILL MISSING → DENY ACCESS //
  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    // STEP 4: VERIFY TOKEN  //
    // Decode and verify JWT using secret key
    const decoded = jwt.verify(token, "SECRET"); // 

    // STEP 5: FETCH LOGGED-IN USER  //
    // Load user (excluding password field)
    req.user = await User.findById(decoded.userId).select("-password");

    // Allow request to continue to the protected route
    next();

  } catch (err) {
    // If token verification failed (expired, wrong, modified)
    return res.status(401).json({ error: "Token is not valid" });
  }
};

export default auth;
