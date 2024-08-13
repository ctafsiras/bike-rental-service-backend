import { Types } from "mongoose";
import { z } from "zod";

const objectIdTransform = z
  .string()
  .refine((value) => Types.ObjectId.isValid(value), {
    message: "Invalid ObjectId format",
  })
  .transform((value) => new Types.ObjectId(value));

// Custom transformation to convert strings to Date
const dateTransform = z.string().transform((value) => new Date(value));

export const bookingZodSchema = z.object({
  userId: objectIdTransform,
  bikeId: objectIdTransform,
  startTime: dateTransform,
  returnTime: dateTransform,
  totalCost: z.number().nonnegative("Total cost must be a non-negative number"),
  isReturned: z.boolean().default(false),
});
