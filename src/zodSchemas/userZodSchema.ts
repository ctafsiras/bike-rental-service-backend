import { z } from "zod";

export const userZodSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters long'),
  address: z.string().min(5, 'Address is required'),
  role: z.enum(['admin', 'user']),
});