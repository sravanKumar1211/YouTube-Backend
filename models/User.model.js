import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
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
      default: null   // user may not have channel yet
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);