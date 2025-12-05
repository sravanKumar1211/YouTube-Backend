// controllers/video.controller.js
import Video from "../models/Video.model.js"; // Import Video model

const VideoController = {

  //  UPLOAD VIDEO //
  // Handles video upload:
  // - Requires authentication (req.user)
  // - Validates required fields
  // - Supports flexible thumbnail inputs
  // - Normalizes tags, likes, dislikes
  // - Saves video data to database
  async uploadVideo(req, res) {
    try {
      // Ensure request is coming from an authenticated user
      if (!req.user || !req.user._id) {
        return res.status(401).json({ message: "Unauthorized: user not found" });
      }

      // Extract all fields that may come from frontend
      const {
        title,
        thumbnail,      // optional alternative field
        thumbnailUrl,   // preferred field
        videoUrl,
        description = "",
        tags = [],      // may come as string or array
        audience = "everyone",
        monetization = false,
        license = "standard",
        visibility = "public",
        category = "General",
        date,
        checks = "pending",
        more = "",
        likes,
        dislikes
      } = req.body;

      // Validate required fields
      if (!title || !(thumbnailUrl || thumbnail) || !videoUrl) {
        return res.status(400).json({
          message: "title, thumbnailUrl and videoUrl are required"
        });
      }

      //  NORMALIZE TAGS //
      // Allow tags as: ["js","react"] or "js, react , node"
      let normalizedTags = [];
      if (Array.isArray(tags)) {
        normalizedTags = tags;
      } else if (typeof tags === "string" && tags.trim() !== "") {
        normalizedTags = tags
          .split(",")
          .map(t => t.trim())
          .filter(Boolean);
      }

      //  NORMALIZE LIKES/DISLIKES  //
      // Only accept numeric arrays; ignore invalid formats
      let normalizedLikes = Array.isArray(likes)
        ? likes.map(Number).filter(n => !Number.isNaN(n))
        : undefined;

      let normalizedDislikes = Array.isArray(dislikes)
        ? dislikes.map(Number).filter(n => !Number.isNaN(n))
        : undefined;

      // CREATE VIDEO DOCUMENT  //
      const video = new Video({
        user: req.user._id, // authenticated user makes the upload
        title,
        thumbnailUrl: thumbnailUrl || thumbnail, // choose available field
        videoUrl,
        description,
        tags: normalizedTags,
        audience,
        monetization,
        license,
        visibility,
        category,
        date: date || Date.now(), // fallback to current date
        checks,
        more,

        // Only include likes/dislikes if valid arrays were provided
        ...(normalizedLikes ? { likes: normalizedLikes } : {}),
        ...(normalizedDislikes ? { dislikes: normalizedDislikes } : {})
      });

      await video.save(); // Save to MongoDB

      return res.status(201).json({ success: true, video });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "internal server error" });
    }
  },


  // GET ALL VIDEOS //
  // Returns all videos with populated user info.
  async getAllVideo(req, res) {
    try {
      const videos = await Video.find()
        .populate('user', 'channelName profilePic userName createdAt');

      return res.status(201).json({ success: true, videos });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "internal server error" });
    }
  },


  // GET VIDEO BY ID  //
  // Fetch single video using its ID.
  // Includes channel/user info via populate.
  async getVideoById(req, res) {
    try {
      let { id } = req.params;

      const video = await Video.findById(id)
        .populate('user', 'channelName profilePic userName createdAt');

      return res.status(201).json({ success: true, video });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "internal server error" });
    }
  },


};

export default VideoController;
