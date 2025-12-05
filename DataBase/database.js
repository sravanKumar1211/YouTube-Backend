import mongoose from "mongoose";



// MongoDB connection string (using MongoDB Atlas cluster)
const MONGO_URL =
  "mongodb+srv://sravankumargaddamedhi_db_user:lP1pCOMluO5no4Qo@youtube.ug4aamg.mongodb.net/?retryWrites=true&w=majority&appName=youtube";

// ---------------- DATABASE CONNECTION FUNCTION ---------------- //
// connectDB() connects the server to the MongoDB database using mongoose.
// - mongoose.connect() returns a promise
// - If connection is successful → log "DB Connected"
// - If failed → log error message
export const connectDB = async () => {
  try {
    // Attempt connection to MongoDB cluster
    await mongoose.connect(MONGO_URL);

    console.log("DB Connected");

  } catch (error) {
    // Log useful error message if connection fails
    console.log("DB Connection Error:", error.message);
  }
};
