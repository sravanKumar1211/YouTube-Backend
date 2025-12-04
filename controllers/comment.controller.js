import Comment from '../models/Comments.model.js'

const CommentController = {
    async addComment(req, res) {
        try {
            const { video, message } = req.body;
            const comment = new Comment({ user: req.user._id, video, message });
            await comment.save();
            return res.status(201).json({ message:"success", comment });
        } catch (error) {
            return res.status(500).json({ error:'internal server error' });
        }
    },

    async getCommentByVideoId(req,res){
        try {
            let { videoid } = req.params;
            const comments = await Comment.find({ video: videoid })
                .populate('user','channelName profilePic userName createdAt');
            return res.status(201).json({ message:"success", comments });
        } catch (error) {
            return res.status(500).json({ error:'internal server error' });
        }
    },

    // ⭐ EDIT COMMENT
    async updateComment(req, res) {
        try {
            const { commentid } = req.params;
            const { message } = req.body;

            const comment = await Comment.findById(commentid);
            if (!comment) {
                return res.status(404).json({ error: "Comment not found" });
            }

            // Check owner
            if (comment.user.toString() !== req.user._id.toString()) {
                return res.status(403).json({ error: "Not authorized to edit this comment" });
            }

            comment.message = message;
            await comment.save();

            return res.status(200).json({ message: "Comment updated", comment });
        } catch (err) {
            return res.status(500).json({ error: "internal server error" });
        }
    },

    // ⭐ DELETE COMMENT
    async deleteComment(req, res) {
        try {
            const { commentid } = req.params;

            const comment = await Comment.findById(commentid);
            if (!comment) {
                return res.status(404).json({ error: "Comment not found" });
            }

            if (comment.user.toString() !== req.user._id.toString()) {
                return res.status(403).json({ error: "Not authorized to delete this comment" });
            }

            await Comment.findByIdAndDelete(commentid);

            return res.status(200).json({ message: "Comment deleted successfully" });
        } catch (err) {
            return res.status(500).json({ error:"internal server error" });
        }
    }
};

export default CommentController;
