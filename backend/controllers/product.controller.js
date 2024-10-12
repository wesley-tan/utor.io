import express from "express";
import Product from "../models/product.model.js";
import mongoose from "mongoose";

const router = express.Router();

const handleServerError = (res, error) => {
    console.error("Server error:", error);
    res.status(500).json({ message: "Internal server error" });
};

export const createProduct = async (req, res) => {
    const { name, price, image } = req.body;

    if (!name || !price || !image) {
        return res.status(400).json({ message: "Please provide name, price, and image" });
    }

    try {
        const newProduct = new Product({ name, price, image });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        handleServerError(res, error);
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().select('name price image');
        res.status(200).json(products);
    } catch (error) {
        handleServerError(res, error);
    }
};

export const getProductById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        handleServerError(res, error);
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, image } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, price, image },
            { new: true, runValidators: true }
        );
        
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        res.status(200).json(updatedProduct);
    } catch (error) {
        handleServerError(res, error);
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }
    
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        handleServerError(res, error);
    }
};

export default router;
