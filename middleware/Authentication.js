
// import jwt from 'jsonwebtoken';
// import User from '../models/User.model.js'

// const auth= async(req,res,next)=>{
//     const token =req.cookies.token;
//     if(!token){
//         return res.status(401).json({error:'No token, authorization denied'});
//     }else{
//         try{
//             const decode=jwt.verify(token,"SECRET");
//             req.user=await User.findById(decode.userId).select('-password');
//             next();
//         }catch(err){
//             res.status(401).json({error:'Token is not valid'});
//         }
//     }
// }

// export default auth;


import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const auth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, "SECRET");

    req.user = await User.findById(decoded.userId).select("-password");

    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token is not valid" });
  }
};

export default auth;
