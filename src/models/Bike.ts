import mongoose, { Schema, Document } from "mongoose";
import { z } from "zod";
import { bikeZodSchema } from "../zodSchemas/bikeZodSchema";

export type BikeType = z.infer<typeof bikeZodSchema> & Document;

const bikeSchema = new Schema<BikeType>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  pricePerHour: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  cc: { type: Number, required: true },
  year: { type: Number, required: true },
  model: { type: String, required: true },
  brand: { type: String, required: true },
});

export const Bike = mongoose.model<BikeType>("Bike", bikeSchema);
