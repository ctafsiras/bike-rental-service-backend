"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingZodSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const objectIdTransform = zod_1.z
    .string()
    .refine((value) => mongoose_1.Types.ObjectId.isValid(value), {
    message: "Invalid ObjectId format",
})
    .transform((value) => new mongoose_1.Types.ObjectId(value));
// Custom transformation to convert strings to Date
const dateTransform = zod_1.z.string().transform((value) => new Date(value));
exports.bookingZodSchema = zod_1.z.object({
    userId: objectIdTransform,
    bikeId: objectIdTransform,
    startTime: dateTransform,
    returnTime: dateTransform,
    totalCost: zod_1.z.number().nonnegative("Total cost must be a non-negative number"),
    isReturned: zod_1.z.boolean().default(false),
});
