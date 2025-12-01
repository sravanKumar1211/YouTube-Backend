import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    profilePic: {
      type: String,
      default: "" // optional
    },
     channelBanner: {
      type: String,
      default: "" // optional
    },
    password: {
      type: String,
      required: true
    },
    about:{
        type:String,
        required:true
    },
    
    channelName: { 
      type: String, 
      required: true,
       trim: true 
      },

  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);