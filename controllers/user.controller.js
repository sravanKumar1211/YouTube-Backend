
import User from "../models/User.model.js";
import bcrypt from "bcryptjs";

const UserController = {
  async signUp(req, res) {
    try {
      const { channelName, userName, about, profilePic, password, email, fullName } = req.body;

      // Check required fields
      if (!userName || !email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Check if user exists
      const isExist = await User.findOne({ userName });
      if (isExist) {
        return res.status(400).json({
          message: "User already exists with this userName",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = new User({
        channelName,
        userName,
        about,
        profilePic,
        email,
        fullName,
        password: hashedPassword,
      });

      await user.save();

      return res.status(201).json({
        message: "User Registered Successfully",
        data: user,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },

    async signIn(req,res){
        try{
            const {userName,password}=req.body;
            const user= await User.findOne({userName});

            if(user && await bcrypt.compare(password,user.password)){
               return res.status(201).json({message:'logged in successfully',success:'true'});
            }else{
                res.status(400).json({error:'invalid credentials'});
            }
        } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Something went wrong" });
    }
    }


};

export default UserController;
