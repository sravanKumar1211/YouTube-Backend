import mongoose from "mongoose";

//  COMMENT SCHEMA //
// Defines structure for comments stored in MongoDB.
// Includes references to User and Video models.

const commentSchema = new mongoose.Schema(
  {
    // The video on which the comment is posted
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",       // Reference to Video model
      required: true
    },

    // User who created the comment
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",        // Reference to User model
      required: true
    },

    // Actual comment text/message
    message: {
      type: String,
      required: true      // Cannot be empty
    }
  },

  // Automatically adds createdAt & updatedAt fields
  { timestamps: true }
);

// Export Comment model
export default mongoose.model("Comment", commentSchema);
