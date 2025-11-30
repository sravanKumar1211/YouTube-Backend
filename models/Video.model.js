import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    // Logged-in user who uploads the video
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

    // Cloudinary Thumbnail URL
    thumbnailUrl: {
      type: String,
      required: true
    },

    // Cloudinary Video URL
    videoUrl: {
      type: String,
      required: true
    },

    // Description box
    description: {
      type: String,
      default: ""
    },

    // Tags (comma separated or array)
    tags: {
      type: [String],
      default: []
    },

    // Audience settings: "kids", "everyone"
    audience: {
      type: String,
      enum: ["everyone", "kids"],
      default: "everyone"
    },

    // Monetization switch
    monetization: {
      type: Boolean,
      default: false
    },

    // License: "standard" or "creativeCommons"
    license: {
      type: String,
      enum: ["standard", "creativeCommons"],
      default: "standard"
    },

    // Visibility: "public", "private", "unlisted"
    visibility: {
      type: String,
      enum: ["public", "private", "unlisted"],
      default: "public"
    },

    // Category
    category: {
      type: String,
      default: "General"
    },

    // Extra YouTube Studio fields you mentioned
    date: {
      type: Date,
      default: Date.now
    },

    checks: {
      type: String,
      default: "pending"
    },

    more: {
      type: String,
      default: ""
    },
    likesCount: { 
      type: Number,
       default: 0 
      },
    dislikesCount: {
       type: Number,
        default: 0 
      },
  },
  { timestamps: true }
);

export default mongoose.model("Video", videoSchema);
