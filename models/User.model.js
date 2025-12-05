import mongoose from "mongoose";

//  USER SCHEMA  //
// Defines the structure for storing user data in MongoDB.
// Includes authentication fields, channel details, timestamps, etc.

const userSchema = new mongoose.Schema(
  {
    // Unique username used for login & channel identity
    userName: {
      type: String,
      required: true,
      unique: true,   // ensures no two users share same username
      trim: true,
      index: true     // improves search performance
    },

    // Unique user email (also used for login or notifications)
    email: {
      type: String,
      required: true,
      unique: true,   // no duplicate emails allowed
      trim: true
    },

    // Full name of the user
    fullName: {
      type: String,
      required: true,
      trim: true
    },

    // Profile picture URL
    profilePic: {
      type: String,
      default: "" // optional field
    },

    // Channel banner image URL
    channelBanner: {
      type: String,
      default: "" // optional field
    },

    // Hashed password (never store plain text passwords)
    password: {
      type: String,
      required: true
    },

    // "About" section for the user's channel
    about: {
      type: String,
      required: true
    },

    // Channel name displayed publicly
    channelName: {
      type: String,
      required: true,
      trim: true
    }
  },

  // Automatically adds createdAt & updatedAt fields
  { timestamps: true }
);

// Export User model
export default mongoose.model("User", userSchema);
