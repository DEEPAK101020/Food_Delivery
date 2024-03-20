const express=require("express");
const bcrypt=require("bcrypt");

const jwt=require("jsonwebtoken");
const Userrouter=express.Router();
require("dotenv").config();

const {UserModel}=require("../model/usermodel")

Userrouter.post("/register",async(req,res)=>{
    const {name,email,password,address}=req.body;
    try {
        const exist=await UserModel.findOne({email})
        if(exist){
            res.status(200).json({err:"user already exist"})
        }else{
            bcrypt.hash(password,5,async(err,hash)=>{
                const newuser=new UserModel({name,email,password:hash,address})
                await newuser.save();
                res.status(201).json({message:"new user registered"})
            })
        }
    } catch (error) {
        console.log(error)
        res.status(201).json({err:error})
        
    }
})

Userrouter.post("/login",async(req,res)=>{
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            bcrypt.compare(password, user.password, (err, pass) => {
                if (err) {
                    return res.status(401).json({ msg: "Invalid credentials" });
                }
                if (pass) {
                    const secret_key = process.env.secret_key;
                    const token = jwt.sign({ userID: user._id }, secret_key, { expiresIn: "7d" });
                    res.status(201).json({ token });
                } else {
                    res.status(401).json({ msg: "Invalid credentials" });
                }
            });
        } else {
            res.status(401).json({ msg: "User does not exist" });
        }
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
})

Userrouter.put("/:id/reset",async(req,res)=>{
        const userId = req.params.id;
        const { password, newPassword } = req.body;
    
        try {
            const user = await UserModel.findById(userId);
            if (!user) {
                return res.status(404).json({ msg: "User not found" });
            }
            bcrypt.compare(password, user.password, async (err, pass) => {
                if (err ||!pass) {
                    return res.status(401).json({ msg: "Invalid current password" });
                }
                const hashedNewPassword = await bcrypt.hash(newPassword, 5);
                user.password = hashedNewPassword;
                await user.save();
    
                res.status(204).send("password updated sucessfully"); 
            });
        } catch (error) {
            res.status(500).json({ err: error.message });
        }
    
})


module.exports={
    Userrouter
}