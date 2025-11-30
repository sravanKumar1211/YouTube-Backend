import express from 'express'
import { connectDB } from "./DataBase/database.js";

const app=express();
const PORT=3000;



connectDB();

app.get('/',(req,res)=>{
    res.send("welcome")
})

app.listen(PORT,()=>{
    console.log(`server is running at PORT:${PORT}`)
})