import mongoose from "mongoose";

// VIDEO SCHEMA  //
// Defines all fields related to a video uploaded by a user.
// Includes video metadata, visibility settings, monetization, tags, etc.

const videoSchema = new mongoose.Schema(
  {
    // User who uploaded the video (reference to User model)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Video Title
    title: {
      type: String,
      required: true,
      trim: true
    },

    // Thumbnail URL (stored in Cloudinary or CDN)
    thumbnailUrl: {
      type: String,
      required: true
    },

    // Video file URL (uploaded to Cloudinary or CDN)
    videoUrl: {
      type: String,
      required: true
    },

    // Video description
    description: {
      type: String,
      default: ""
    },

    // Tags for search / categorization
    tags: {
      type: [String],
      default: []
    },

    // Audience type (COPPA compliance)
    audience: {
      type: String,
      enum: ["everyone", "kids"],
      default: "everyone"
    },

    // Monetization ON/OFF
    monetization: {
      type: Boolean,
      default: false
    },

    // Content license
    license: {
      type: String,
      enum: ["standard", "creativeCommons"],
      default: "standard"
    },

    // Video visibility settings
    visibility: {
      type: String,
      enum: ["public", "private", "unlisted"],
      default: "public"
    },

    // Category (e.g., Music, Sports, Gaming, etc.)
    category: {
      type: String,
      default: "General"
    },

    // Date video was uploaded or scheduled
    date: {
      type: Date,
      default: Date.now
    },

    // YouTube Studio "Checks" (Copyright, suitability, etc.)
    checks: {
      type: String,
      default: "pending"
    },

    // Additional optional field
    more: {
      type: String,
      default: ""
    },

    // Total number of likes on the video
    likesCount: {
      type: Number,
      default: 0
    },

    // Total number of dislikes on the video
    dislikesCount: {
      type: Number,
      default: 0
    }
  },

  // Adds createdAt & updatedAt timestamps
  { timestamps: true }
);

// Export Video model
export default mongoose.model("Video", videoSchema);
