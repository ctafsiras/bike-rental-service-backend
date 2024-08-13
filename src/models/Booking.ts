import mongoose, { Schema, Document } from "mongoose";
import { z } from "zod";
import { bookingZodSchema } from "../zodSchemas/bookingZodSchema";

export type BookingType = z.infer<typeof bookingZodSchema> & Document;

const bookingSchema = new Schema<BookingType>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  bikeId: { type: Schema.Types.ObjectId, ref: "Bike", required: true },
  startTime: { type: Date, required: true },
  returnTime: { type: Date, default: null },
  totalCost: { type: Number, default: 0 },
  isReturned: { type: Boolean, default: false },
});

export const Booking = mongoose.model<BookingType>("Booking", bookingSchema);
