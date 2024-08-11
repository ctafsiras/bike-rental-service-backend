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
exports.getAllOrders = exports.createOrder = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const Product_1 = __importDefault(require("../models/Product"));
const orderSchema_1 = require("../schemas/orderSchema");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedOrder = orderSchema_1.orderSchema.parse(req.body);
        const product = yield Product_1.default.findById(validatedOrder.productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        if (product.inventory.quantity < validatedOrder.quantity) {
            return res.status(400).json({
                success: false,
                message: "Insufficient quantity available in inventory",
            });
        }
        product.inventory.quantity -= validatedOrder.quantity;
        product.inventory.inStock = product.inventory.quantity > 0;
        yield product.save();
        const order = new Order_1.default(validatedOrder);
        yield order.save();
        res.status(201).json({
            success: true,
            message: "Order created successfully!",
            data: order,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.errors
                ? error.errors.map((err) => err.message).join(", ")
                : "Error creating order",
        });
    }
});
exports.createOrder = createOrder;
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        if (!email) {
            const orders = yield Order_1.default.find();
            if (orders.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No orders found",
                    data: null,
                });
            }
            return res.status(200).json({
                success: true,
                message: "Orders fetched successfully!",
                data: orders,
            });
        }
        const orders = yield Order_1.default.find({ email });
        if (orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No orders found for email '${email}'`,
                data: null,
            });
        }
        return res.status(200).json({
            success: true,
            message: `Orders fetched successfully for user email!`,
            data: orders,
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
exports.getAllOrders = getAllOrders;
