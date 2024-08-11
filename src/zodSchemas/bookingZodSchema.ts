import { Types } from "mongoose";
import { z } from "zod";

export const bookingZodSchema = z.object({
  userId: z.instanceof(Types.ObjectId),
  bikeId: z.instanceof(Types.ObjectId),
  startTime: z.date(),
  returnTime: z.date(),
  totalCost: z.number().nonnegative("Total cost must be a non-negative number"),
  isReturned: z.boolean().default(false),
});
