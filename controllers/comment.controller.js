import Comment from '../models/Comments.model.js'

const CommentController = {
  async addComment(req, res) {
            try{
                const {video,message}=req.body;
                const comment =new Comment({user:req.user._id,video,message});
                await comment.save();
                return res.status(201).json({message:"success",comment})

            }catch(error){
                return res.status(500).json({error:'internal server error'})
            }
  },

  async getCommentByVideoId(req,res){
     try{
                let {videoid} = req.params;
                const comments = await Comment.find({video:videoid}).populate('user','channelName profilePic userName createdAt')
                 return res.status(201).json({message:"success",comments})
            }catch(error){
                return res.status(500).json({error:'internal server error'})
            }
  }

};

export default CommentController;
