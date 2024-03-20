const express=require("express");
const mongoose=require("mongoose")
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

const {connection}=require("./db")
const {Userrouter}=require("./routes/userRoutes")
const {RestaurantRoute}=require("./routes/restaurantRoute")
const {orderRoutes}=require("./routes/orderRoute")


const app=express();

app.use(express.json());


app.use("/user",Userrouter)
app.use("/restaurant",RestaurantRoute)
app.use("/order",orderRoutes)

app.get("/",(req,res)=>{
    res.send("this is home page of our website");
})



app.listen(3000,async(req,res)=>{
    try {
        await connection
        console.log("connected to db");
        console.log("port is running on 3000")
    } catch (error) {
        console.log(error)
    }
})