
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js'

const auth= async(req,resizeBy,next)=>{
    const token =req.cookies.token;
    if(!token){
        return resizeBy.status(401).json({error:'No token, authorization denied'});
    }else{
        try{
            const decode=jwt.verify(token,"SECRET");
            req.user=await User.findById(decode.userId).select('-password');
            next();
        }catch(err){
            res.status(401).json({error:'Token is not valid'});
        }
    }
}

export default auth;