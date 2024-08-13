"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bikeZodSchema = void 0;
const zod_1 = require("zod");
exports.bikeZodSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Bike name is required"),
    description: zod_1.z.string().min(1, "Description is required"),
    pricePerHour: zod_1.z.number().positive("Price per hour must be a positive number"),
    isAvailable: zod_1.z.boolean().default(true),
    cc: zod_1.z.number().positive("CC must be a positive number"),
    year: zod_1.z.number().int().min(1900, "Year must be a valid year"),
    model: zod_1.z.string().min(1, "Model is required"),
    brand: zod_1.z.string().min(1, "Brand is required"),
});
