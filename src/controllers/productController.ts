import { Request, Response } from "express";
import Product from "../models/Bike";
import {
  productSchema,
  productSchemaForUpdate,
} from "../zodSchemas/bikeZodSchema";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const validatedProduct = productSchema.parse(req.body);
    const product = new Product(validatedProduct);
    await product.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully!",
      data: product,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.errors
        ? error.errors.map((err: any) => err.message).join(", ")
        : "Error creating product",
    });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;

    if (!searchTerm) {
      const products = await Product.find();
      return res.status(200).json({
        success: true,
        message: "Products fetched successfully!",
        data: products,
      });
    }
    const regex = new RegExp(searchTerm, "i");

    const products = await Product.find({
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching products",
      data: null,
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;

    // Find the product by ID
    const product = await Product.findById(productId);

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
  } catch (error) {
    // Handle errors
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      data: null,
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const updateData = req.body;

    const parsedData = productSchemaForUpdate.parse(updateData);

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
        data: null,
      });
    }

    const updatedProductData = { ...product.toObject(), ...parsedData };

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedProductData,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: updatedProduct,
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

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId);

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
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      data: null,
    });
  }
};
