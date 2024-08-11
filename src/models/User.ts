import mongoose, { Schema, Document } from "mongoose";
import { z } from "zod";
import { userZodSchema } from "../zodSchemas/userZodSchema";

export type UserType = z.infer<typeof userZodSchema> & Document;

const userSchema = new Schema<UserType>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

export const User= mongoose.model<UserType>("User", userSchema);
