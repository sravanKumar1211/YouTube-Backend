// controllers/video.controller.js
import Video from "../models/Video.model.js"; // correct import
// import jwt from "jsonwebtoken"; // remove if unused

const VideoController = {
  async uploadVideo(req, res) {
    try {
      // if you expect auth, ensure req.user exists
      if (!req.user || !req.user._id) {
        return res.status(401).json({ message: "Unauthorized: user not found" });
      }

      // accept either thumbnailUrl in body or thumbnail (from client)
      const {
        title,
        thumbnail,      // optional client key
        thumbnailUrl,   // optional client key
        videoUrl,
        description = "",
        tags = [],      // can be string or array
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

      // required fields check
      if (!title || !(thumbnailUrl || thumbnail) || !videoUrl) {
        return res.status(400).json({
          message: "title, thumbnailUrl and videoUrl are required"
        });
      }

      // Normalize tags: allow comma-separated string or array
      let normalizedTags = [];
      if (Array.isArray(tags)) normalizedTags = tags;
      else if (typeof tags === "string" && tags.trim() !== "") {
        normalizedTags = tags.split(",").map(t => t.trim()).filter(Boolean);
      }

      // Normalize likes/dislikes: if client sends empty or wrong types, ignore and let defaults apply
      let normalizedLikes = Array.isArray(likes) ? likes.map(Number).filter(n => !Number.isNaN(n)) : undefined;
      let normalizedDislikes = Array.isArray(dislikes) ? dislikes.map(Number).filter(n => !Number.isNaN(n)) : undefined;

      const video = new Video({
        user: req.user._id,
        title,
        thumbnailUrl: thumbnailUrl || thumbnail,
        videoUrl,
        description,
        tags: normalizedTags,
        audience,
        monetization,
        license,
        visibility,
        category,
        date: date || Date.now(),
        checks,
        more,
        // only set likes/dislikes if provided as arrays of numbers
        ...(normalizedLikes ? { likes: normalizedLikes } : {}),
        ...(normalizedDislikes ? { dislikes: normalizedDislikes } : {})
      });

      await video.save();
      return res.status(201).json({ success: true, video });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "internal server error" });
    }
  },

    async getAllVideo(req,res){
        try{
            const videos=await Video.find().populate('user','channelName profilePic userName createdAt');
             return res.status(201).json({ success: true, "videos":videos });
        }catch (error) {
             console.error(error);
             return res.status(500).json({ message: "internal server error" });
        }
    },

    async getVideoById(req,res){
        try{
            let{id}=req.params;
            const video=await Video.findById(id).populate('user','channelName profilePic userName createdAt')
             return res.status(201).json({ success: true, "video":video });
        }catch (error) {
             console.error(error);
             return res.status(500).json({ message: "internal server error" });
        }
    },
async getVideoByUserId(req,res){
    try{
        let { userId } = req.params;
        const video = await Video.find({ user: userId }).populate('user','channelName profilePic userName createdAt');

        return res.status(200).json({
            success: true,
            video
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "internal server error" });
    }
}


};

export default VideoController;
