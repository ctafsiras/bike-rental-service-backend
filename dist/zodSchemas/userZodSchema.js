"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userZodSchema = void 0;
const zod_1 = require("zod");
exports.userZodSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
    phone: zod_1.z.string().min(10, 'Phone number must be at least 10 characters long'),
    address: zod_1.z.string().min(5, 'Address is required'),
    role: zod_1.z.enum(['admin', 'user']),
});
