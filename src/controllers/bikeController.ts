import { Request, Response } from "express";
import { z } from "zod";
import { Bike, BikeType } from "../models/Bike";
import { bikeZodSchema } from "../zodSchemas/bikeZodSchema";

// Create Bike
export const createBike = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const validatedData = bikeZodSchema.parse(req.body);

    // Create a new bike
    const newBike = new Bike(validatedData);
    await newBike.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Bike added successfully",
      data: newBike,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
      error: error instanceof z.ZodError ? error.errors : error,
    });
  }
};

// Get All Bikes
export const getAllBikes = async (req: Request, res: Response) => {
  try {
    const bikes = await Bike.find();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Bikes retrieved successfully",
      data: bikes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
      error,
    });
  }
};

// Get All Bikes
export const getSingleBike = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bike = await Bike.findById(id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Bike retrieved successfully",
      data: bike,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
      error,
    });
  }
};

// Update Bike
export const updateBike = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Update the bike's details
    const updatedBike = await Bike.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedBike) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Bike not found",
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Bike updated successfully",
      data: updatedBike,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
      error,
    });
  }
};

// Delete Bike
export const deleteBike = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Remove the bike
    const deletedBike = await Bike.findByIdAndDelete(id);

    if (!deletedBike) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Bike not found",
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Bike deleted successfully",
      data: deletedBike,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
      error,
    });
  }
};
