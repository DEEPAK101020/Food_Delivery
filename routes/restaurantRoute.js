const express=require("express");
const bcrypt=require("bcrypt");

const jwt=require("jsonwebtoken");
const RestaurantRoute=express.Router();
require("dotenv").config();

const {RestaurantModel}=require("../model/Restaurantmodel")

RestaurantRoute.post("/restaurants",async(req,res)=>{
    try {
        const {name ,address,menu}=req.body;
        const newitem=new RestaurantModel({name ,address,menu})
        await newitem.save();
        res.status(201).json({msg:"new menu item added"})
    } catch (error) {
        console.log(error)
        res.status(400).json({err:error})
    }
})

RestaurantRoute.get("/restaurants",async(req,res)=>{
    try {
        const menu=await RestaurantModel.find();
        res.status(200).json(menu)
    } catch (error) {
        res.status(500).json({err:error})
    }
})

//get all restaurants

RestaurantRoute.get("/restaurants/:id",async(req,res)=>{

    try {
        const menu=await RestaurantModel.findById(req.params.id);
        res.status(200).json(menu)
    } catch (error) {
        res.status(500).json({err:error})
    }
})

//get spesific restaurants by there id
RestaurantRoute.get("/restaurants/:id/menu",async(req,res)=>{

    try {
        const menu=await RestaurantModel.findById(req.params.id);
        res.status(200).json(menu.menu)
    } catch (error) {
        res.status(500).json({err:error})
    }
})

RestaurantRoute.post("/restaurants:id/menu",async(req,res)=>{
const userId=req.params.id;
    try {
        const menu=await RestaurantModel.findById(req.params.id);
        
        res.status(200).json(menu.menu)
    } catch (error) {
        res.status(500).json({err:error})
    }
})


module.exports={
    RestaurantRoute
}