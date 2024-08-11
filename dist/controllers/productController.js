"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const productSchema_1 = require("../schemas/productSchema");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedProduct = productSchema_1.productSchema.parse(req.body);
        const product = new Product_1.default(validatedProduct);
        yield product.save();
        res.status(201).json({
            success: true,
            message: "Product created successfully!",
            data: product,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.errors
                ? error.errors.map((err) => err.message).join(", ")
                : "Error creating product",
        });
    }
});
exports.createProduct = createProduct;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        if (!searchTerm) {
            const products = yield Product_1.default.find();
            return res.status(200).json({
                success: true,
                message: "Products fetched successfully!",
                data: products,
            });
        }
        const regex = new RegExp(searchTerm, "i");
        const products = yield Product_1.default.find({
            $or: [
                { name: { $regex: regex } },
                { description: { $regex: regex } },
                { category: { $regex: regex } },
                { tags: { $in: [regex] } },
            ],
        });
        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No products matching search term '${searchTerm}' found`,
                data: null,
            });
        }
        return res.status(200).json({
            success: true,
            message: `Products matching search term '${searchTerm}' fetched successfully!`,
            data: products,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error fetching products",
            data: null,
        });
    }
});
exports.getAllProducts = getAllProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        // Find the product by ID
        const product = yield Product_1.default.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
                data: null,
            });
        }
        return res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
            data: product,
        });
    }
    catch (error) {
        // Handle errors
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            data: null,
        });
    }
});
exports.getProductById = getProductById;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const updateData = req.body;
        const parsedData = productSchema_1.productSchemaForUpdate.parse(updateData);
        const product = yield Product_1.default.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
                data: null,
            });
        }
        const updatedProductData = Object.assign(Object.assign({}, product.toObject()), parsedData);
        const updatedProduct = yield Product_1.default.findByIdAndUpdate(productId, updatedProductData, { new: true });
        return res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: updatedProduct,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            data: null,
        });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const deletedProduct = yield Product_1.default.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
                data: null,
            });
        }
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: null,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            data: null,
        });
    }
});
exports.deleteProduct = deleteProduct;
