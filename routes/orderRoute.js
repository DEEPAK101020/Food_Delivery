const express=require("express");
const bcrypt=require("bcrypt");

const jwt=require("jsonwebtoken");

const orderRoutes=express.Router()

const {OrderModel}=require("../model/ordermodel");
const { stat } = require("fs");

orderRoutes.post("/", async (req, res) => {
    try {
        const { user, restaurant, items, totalPrice, deliveryAddress ,status} = req.body;
        const orderPlaced = new OrderModel({ user, restaurant, items, totalPrice, deliveryAddress ,status});
        await orderPlaced.save();
        res.status(201).json({ msg: "New order placed", order: orderPlaced });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
});

// GET route  details by ID
orderRoutes.get("/:id", async (req, res) => {
    const orderId = req.params.id;
    try {
        const order = await OrderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ msg: "Order not found" });
        }
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

//put
orderRoutes.put("/:id", async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;
        if (!status) {
            return res.status(200).json({ error: "Please provide the status to update" });
        }
        const updatedOrder = await OrderModel.findByIdAndUpdate(orderId,{status},{ new: true });
        if (!updatedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.status(204).json({ msg: "Order status updated successfully", order: updatedOrder });
    } catch (err) {
        console.error("error updating order status:", err);
        res.status(400).json({ error: "Internal Server Error" });
    }
});

module.exports={
    orderRoutes
}