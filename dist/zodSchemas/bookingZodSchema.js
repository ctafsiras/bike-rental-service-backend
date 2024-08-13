"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingZodSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
exports.bookingZodSchema = zod_1.z.object({
    userId: zod_1.z.instanceof(mongoose_1.Types.ObjectId),
    bikeId: zod_1.z.instanceof(mongoose_1.Types.ObjectId),
    startTime: zod_1.z.date(),
    returnTime: zod_1.z.date(),
    totalCost: zod_1.z.number().nonnegative("Total cost must be a non-negative number"),
    isReturned: zod_1.z.boolean().default(false),
});
