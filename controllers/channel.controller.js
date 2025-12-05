import Video from "../models/Video.model.js";

const ChannelController = {

    // ---------------- GET CHANNEL VIDEOS ---------------- //
    async getChannelVideoByUserId(req, res) {
        try {
            let { userId } = req.params;

            const video = await Video.find({ user: userId })
                .populate('user', 'channelName profilePic channelBanner userName createdAt about');

            return res.status(200).json({ success: true, video });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },


    // ---------------- UPDATE VIDEO ---------------- //
    async updateVideo(req, res) {
        try {
            const { videoId } = req.params;
            const userId = req.user._id;  // from auth middleware
            const updates = req.body;

            const video = await Video.findById(videoId);
            if (!video) {
                return res.status(404).json({ message: "Video not found" });
            }

            // Check if logged-in user is the owner
            if (video.user.toString() !== userId.toString()) {
                return res.status(403).json({ message: "Not authorized to update this video" });
            }

            // Apply updates
            const updatedVideo = await Video.findByIdAndUpdate(
                videoId,
                updates,
                { new: true }
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


    // ---------------- DELETE VIDEO ---------------- //
    async deleteVideo(req, res) {
        try {
            const { videoId } = req.params;
            const userId = req.user._id;

            const video = await Video.findById(videoId);
            if (!video) {
                return res.status(404).json({ message: "Video not found" });
            }

            // Check if logged-in user is the owner
            if (video.user.toString() !== userId.toString()) {
                return res.status(403).json({ message: "Not authorized to delete this video" });
            }

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

