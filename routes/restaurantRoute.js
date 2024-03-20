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

//post in specific menu
RestaurantRoute.post("/:id/menu", async (req, res) => {

    const restaurantId = req.params.id;
    const { name, description, price, image } = req.body;

    try {
        const restaurant = await RestaurantModel.findById(restaurantId);

        if (!restaurant) {
            return res.status(404).json({ msg: "Restaurant not found" });
        }

        restaurant.menu.push({ name, description, price, image });
        await restaurant.save();

        res.status(201).json({ msg: "new item added to menu", menu: restaurant.menu });
    } catch (err) {
        res.status(500).json({ msg: "Failed to add", error: err });
    }
});


//delete a menu

// delete a menu item
RestaurantRoute.delete("/:restaurantId/menu/:itemId", async (req, res) => {
    const restaurantId = req.params.restaurantId;
    const itemId = req.params.itemId;

    try {

        const restaurant = await RestaurantModel.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({ msg: "Restaurant not found" });
        }
        const index = restaurant.menu.findIndex(item => item._id.toString() === itemId);
        if (index === -1) {
            return res.status(404).json({ msg: "Menu item not found" });
        }
        restaurant.menu.splice(index, 1);

        await restaurant.save();

        res.status(202).json({ msg: "Menu item deleted", menu: restaurant.menu });
    } catch (err) {
        res.status(500).json({ msg: "Failed to delete menu item", error: err });
    }
});



module.exports={
    RestaurantRoute
}