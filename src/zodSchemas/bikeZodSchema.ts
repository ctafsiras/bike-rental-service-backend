import { z } from "zod";

export const bikeZodSchema = z.object({
  name: z.string().min(1, "Bike name is required"),
  description: z.string().min(1, "Description is required"),
  pricePerHour: z.number().positive("Price per hour must be a positive number"),
  isAvailable: z.boolean().default(true),
  cc: z.number().positive("CC must be a positive number"),
  year: z.number().int().min(1900, "Year must be a valid year"),
  model: z.string().min(1, "Model is required"),
  brand: z.string().min(1, "Brand is required"),
});
