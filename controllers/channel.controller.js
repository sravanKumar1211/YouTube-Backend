import Video from "../models/Video.model.js";

const ChannelController = {

    //  GET CHANNEL VIDEOS  //

    // Fetch all videos uploaded by a specific user (channel owner)
    async getChannelVideoByUserId(req, res) {
        try {
            let { userId } = req.params;

            // Find all videos where the video.user matches the given userId
            const video = await Video.find({ user: userId })
                .populate(
                    'user',
                    'channelName profilePic channelBanner userName createdAt about'
                ); // populate only selected fields from the User model

            return res.status(200).json({ success: true, video });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },


    //  UPDATE VIDEO //

    // Update video details (only allowed if logged-in user is the owner)
    async updateVideo(req, res) {
        try {
            const { videoId } = req.params;
            const userId = req.user._id;   // Extract logged-in user's ID from auth middleware
            const updates = req.body;      // Fields to be updated

            // Check if video exists
            const video = await Video.findById(videoId);
            if (!video) {
                return res.status(404).json({ message: "Video not found" });
            }

            // Ensure only the owner can update
            if (video.user.toString() !== userId.toString()) {
                return res.status(403).json({ message: "Not authorized to update this video" });
            }

            // Apply updates and return updated video
            const updatedVideo = await Video.findByIdAndUpdate(
                videoId,
                updates,
                { new: true } // return the updated document
            );

            return res.status(200).json({
                success: true,
                message: "Video updated successfully",
                updatedVideo
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },


    // DELETE VIDEO  //
    
    // Delete a video (only allowed if logged-in user is the owner)
    async deleteVideo(req, res) {
        try {
            const { videoId } = req.params;
            const userId = req.user._id;

            // Check if video exists
            const video = await Video.findById(videoId);
            if (!video) {
                return res.status(404).json({ message: "Video not found" });
            }

            // Confirm user owns the video
            if (video.user.toString() !== userId.toString()) {
                return res.status(403).json({ message: "Not authorized to delete this video" });
            }

            // Delete the video
            await Video.findByIdAndDelete(videoId);

            return res.status(200).json({
                success: true,
                message: "Video deleted successfully"
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    
};

export default ChannelController;
