import Comment from '../models/Comments.model.js'

const CommentController = {

    // ADD NEW COMMENT //

    // Creates a new comment for a video.
    // Requires: req.user._id (from auth middleware), video ID, and message text.
    async addComment(req, res) {
        try {
            const { video, message } = req.body;

            // Create new comment using logged-in user's ID
            const comment = new Comment({
                user: req.user._id,
                video,
                message
            });

            await comment.save(); // Save to DB

            return res.status(201).json({ message: "success", comment });

        } catch (error) {
            return res.status(500).json({ error: 'internal server error' });
        }
    },


    // GET COMMENTS BY VIDEO ID //

    // Fetch all comments for a specific video.
    // Populates user fields to show user info along with the comment.
    async getCommentByVideoId(req, res) {
        try {
            let { videoid } = req.params;

            // Find all comments where the video field matches videoid
            const comments = await Comment.find({ video: videoid })
                .populate(
                    'user',
                    'channelName profilePic userName createdAt'
                ); // only return specific user fields

            return res.status(201).json({ message: "success", comments });

        } catch (error) {
            return res.status(500).json({ error: 'internal server error' });
        }
    },


    // UPDATE COMMENT  //

    // Allows the owner of the comment to edit it.
    async updateComment(req, res) {
        try {
            const { commentid } = req.params;
            const { message } = req.body;

            // First check if comment exists
            const comment = await Comment.findById(commentid);
            if (!comment) {
                return res.status(404).json({ error: "Comment not found" });
            }

            // Ensure that only the owner can update their comment
            if (comment.user.toString() !== req.user._id.toString()) {
                return res.status(403).json({ error: "Not authorized to edit this comment" });
            }

            // Update the comment content
            comment.message = message;
            await comment.save();

            return res.status(200).json({
                message: "Comment updated",
                comment
            });

        } catch (err) {
            return res.status(500).json({ error: "internal server error" });
        }
    },


    //  DELETE COMMENT  //
    
    // Allows only the owner of the comment to delete it.
    async deleteComment(req, res) {
        try {
            const { commentid } = req.params;

            // Validate comment existence
            const comment = await Comment.findById(commentid);
            if (!comment) {
                return res.status(404).json({ error: "Comment not found" });
            }

            // Only the user who created the comment can delete it
            if (comment.user.toString() !== req.user._id.toString()) {
                return res.status(403).json({ error: "Not authorized to delete this comment" });
            }

            // Delete comment from database
            await Comment.findByIdAndDelete(commentid);

            return res.status(200).json({
                message: "Comment deleted successfully"
            });

        } catch (err) {
            return res.status(500).json({ error: "internal server error" });
        }
    }
};

export default CommentController;
