import express from "express";
import { connectDB } from "./DataBase/database.js";
import AuthRoutes from "./Routes/user.routes.js";

const app = express();
app.use(express.json());

connectDB();

app.use("/auth", AuthRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
