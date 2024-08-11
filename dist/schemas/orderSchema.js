"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = void 0;
const zod_1 = require("zod");
exports.orderSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    productId: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
