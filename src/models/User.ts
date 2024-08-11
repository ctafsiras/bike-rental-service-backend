import mongoose, { Schema, Document } from "mongoose";
import { z } from "zod";
import { userSchema } from "../schemas/userSchema";

export type UserType = z.infer<typeof userSchema> & Document;

const UserSchema = new Schema<UserType>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

export default mongoose.model<UserType>("User", UserSchema);
