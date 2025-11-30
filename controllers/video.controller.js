import User from "../models/Video.model.js";
import jwt from "jsonwebtoken";



const VideoController = {
        async uploadVideo(req,res){
            try{
    const{title,thumbnail,videoUrl,description,tags,audience,monetization,license, 
        visibility,category,date,checks,more,likes,dislikes}=req.body
        console.log(req.user)

            }catch(error){
                res.status(500).json({message:'internal server error'})
            }
        }
};

export default VideoController;
