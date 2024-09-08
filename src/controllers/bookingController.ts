import { Request, Response } from "express";
import { Bike } from "../models/Bike";
import { z } from "zod";
import { bookingZodSchema } from "../zodSchemas/bookingZodSchema";
import { Booking } from "../models/Booking";

// Create Rental
export const createRental = async (req: Request, res: Response) => {
  try {
    const { bikeId, startTime } = req.body;
    const userId = (req as any).userId;

    // Check bike availability
    const bike = await Bike.findById(bikeId);
    if (!bike || !bike.isAvailable) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Bike is not available",
      });
    }

    // Create rental
    const rental = new Booking({
      userId,
      bikeId,
      startTime,
    });
    await rental.save();

    // Update bike availability
    bike.isAvailable = false;
    await bike.save();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Rental created successfully",
      data: rental,
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

// Return Bike
export const returnBike = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const rental = await Booking.findById(id).populate("bikeId");

    if (!rental || rental.isReturned) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Rental not found or already returned",
      });
    }

    // Calculate rental cost
    const currentTime = new Date();
    const rentalDuration = Math.ceil(
      (currentTime.getTime() - rental.startTime.getTime()) / (1000 * 60 * 60)
    );
    const bike = await Bike.findById(rental.bikeId);

    if (!bike) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Bike not found",
      });
    }

    rental.returnTime = currentTime;
    rental.totalCost = rentalDuration * bike.pricePerHour;
    rental.isReturned = true;
    await rental.save();

    // Update bike availability
    bike.isAvailable = true;
    await bike.save();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Bike returned successfully",
      data: rental,
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

// Get All Rentals for User
export const getUserRentals = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const rentals = await Booking.find({ userId });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Rentals retrieved successfully",
      data: rentals,
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
// Get All Rentals for Admin
export const getAllUserRentals = async (req: Request, res: Response) => {
  try {
    const rentals = await Booking.find();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Rentals retrieved successfully",
      data: rentals,
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
