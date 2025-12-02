import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./DataBase/database.js";
import AuthRoutes from "./Routes/user.routes.js";
import VideoRoutes from "./Routes/video.routes.js";
import CommentRoutes from "./Routes/comment.routes.js";
import ChannelRoutes from "./Routes/chnnel.router.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5175",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());
connectDB();

app.use((req, res, next) => {
  res.on("finish", () => {
    console.log("🔥 CORS Origin Sent:", res.getHeader("Access-Control-Allow-Origin"));
  });
  next();
});


app.use("/auth", AuthRoutes);
app.use("/api", VideoRoutes);
app.use("/commentapi", CommentRoutes);
app.use("/channelapi", ChannelRoutes);



app.listen(3000, () => {
  console.log("Server running on port 3000");
});
