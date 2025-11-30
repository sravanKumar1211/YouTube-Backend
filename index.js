import express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./DataBase/database.js";
import AuthRoutes from "./Routes/user.routes.js";
import VideoRoutes from "./Routes/video.routes.js";

const app = express();
app.use(express.json());
app.use(cookieParser())

connectDB();

app.use("/auth", AuthRoutes);
app.use("/api", VideoRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
