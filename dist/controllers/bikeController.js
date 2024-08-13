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
exports.deleteBike = exports.updateBike = exports.getAllBikes = exports.createBike = void 0;
const zod_1 = require("zod");
const Bike_1 = require("../models/Bike");
const bikeZodSchema_1 = require("../zodSchemas/bikeZodSchema");
// Create Bike
const createBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate request body
        const validatedData = bikeZodSchema_1.bikeZodSchema.parse(req.body);
        // Create a new bike
        const newBike = new Bike_1.Bike(validatedData);
        yield newBike.save();
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: 'Bike added successfully',
            data: newBike,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
            error: error instanceof zod_1.z.ZodError ? error.errors : error,
        });
    }
});
exports.createBike = createBike;
// Get All Bikes
const getAllBikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bikes = yield Bike_1.Bike.find();
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Bikes retrieved successfully',
            data: bikes,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
            error,
        });
    }
});
exports.getAllBikes = getAllBikes;
// Update Bike
const updateBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Update the bike's details
        const updatedBike = yield Bike_1.Bike.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!updatedBike) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: 'Bike not found',
            });
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Bike updated successfully',
            data: updatedBike,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
            error,
        });
    }
});
exports.updateBike = updateBike;
// Delete Bike
const deleteBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Remove the bike
        const deletedBike = yield Bike_1.Bike.findByIdAndDelete(id);
        if (!deletedBike) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: 'Bike not found',
            });
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Bike deleted successfully',
            data: deletedBike,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
            error,
        });
    }
});
exports.deleteBike = deleteBike;
