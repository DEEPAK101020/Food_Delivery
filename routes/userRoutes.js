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

module.exports={
    Userrouter
}