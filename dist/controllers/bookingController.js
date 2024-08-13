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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserRentals = exports.returnBike = exports.createRental = void 0;
const Bike_1 = require("../models/Bike");
const zod_1 = require("zod");
const bookingZodSchema_1 = require("../zodSchemas/bookingZodSchema");
const Booking_1 = require("../models/Booking");
// Create Rental
const createRental = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bikeId, startTime } = bookingZodSchema_1.bookingZodSchema.parse(req.body);
        const userId = req.userId;
        // Check bike availability
        const bike = yield Bike_1.Bike.findById(bikeId);
        if (!bike || !bike.isAvailable) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Bike is not available",
            });
        }
        // Create rental
        const rental = new Booking_1.Booking({
            userId,
            bikeId,
            startTime,
        });
        yield rental.save();
        // Update bike availability
        bike.isAvailable = false;
        yield bike.save();
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Rental created successfully",
            data: rental,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal server error",
            error: error instanceof zod_1.z.ZodError ? error.errors : error,
        });
    }
});
exports.createRental = createRental;
// Return Bike
const returnBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const rental = yield Booking_1.Booking.findById(id).populate("bikeId");
        if (!rental || rental.isReturned) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Rental not found or already returned",
            });
        }
        // Calculate rental cost
        const currentTime = new Date();
        const rentalDuration = Math.ceil((currentTime.getTime() - rental.startTime.getTime()) / (1000 * 60 * 60));
        const bike = yield Bike_1.Bike.findById(rental.bikeId);
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
        yield rental.save();
        // Update bike availability
        bike.isAvailable = true;
        yield bike.save();
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Bike returned successfully",
            data: rental,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal server error",
            error,
        });
    }
});
exports.returnBike = returnBike;
// Get All Rentals for User
const getUserRentals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const rentals = yield Booking_1.Booking.find({ userId });
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Rentals retrieved successfully",
            data: rentals,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal server error",
            error,
        });
    }
});
exports.getUserRentals = getUserRentals;
