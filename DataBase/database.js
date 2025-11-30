
import mongoose from "mongoose";
// sravankumargaddamedhi_db_user
// lP1pCOMluO5no4Qo
// mongodb+srv://sravankumargaddamedhi_db_user:lP1pCOMluO5no4Qo@youtube.ug4aamg.mongodb.net/


const MONGO_URL = "mongodb+srv://sravankumargaddamedhi_db_user:lP1pCOMluO5no4Qo@youtube.ug4aamg.mongodb.net/?retryWrites=true&w=majority&appName=youtube";
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("DB Connected");
  } catch (error) {
    console.log("DB Connection Error:", error.message);
  }
};
