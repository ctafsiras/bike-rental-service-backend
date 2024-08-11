import { Request, Response } from "express";
import Order from "../models/Order";
import Product from "../models/Product";
import { orderSchema } from "../schemas/orderSchema";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const validatedOrder = orderSchema.parse(req.body);

    const product = await Product.findById(validatedOrder.productId);
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
    await product.save();

    const order = new Order(validatedOrder);
    await order.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully!",
      data: order,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.errors
        ? error.errors.map((err: any) => err.message).join(", ")
        : "Error creating order",
    });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;

    if (!email) {
      const orders = await Order.find();

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

    const orders = await Order.find({ email });

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
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      data: null,
    });
  }
};
