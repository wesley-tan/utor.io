import express from 'express';
import Product from '../models/product.model.js';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/product.controller.js';
import mongoose from 'mongoose';
const router = express.Router();

export default router;

router.post("", createProduct);
router.get("", getProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
