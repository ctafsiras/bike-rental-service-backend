"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchemaForUpdate = exports.productSchema = exports.inventorySchema = exports.variantSchema = void 0;
const zod_1 = require("zod");
exports.variantSchema = zod_1.z.object({
    type: zod_1.z.string(),
    value: zod_1.z.string(),
});
exports.inventorySchema = zod_1.z.object({
    quantity: zod_1.z.number(),
    inStock: zod_1.z.boolean(),
});
exports.productSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number(),
    category: zod_1.z.string(),
    tags: zod_1.z.array(zod_1.z.string()),
    variants: zod_1.z.array(exports.variantSchema),
    inventory: exports.inventorySchema,
});
exports.productSchemaForUpdate = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    price: zod_1.z.number().optional(),
    category: zod_1.z.string().optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    variants: zod_1.z
        .array(zod_1.z.object({
        type: zod_1.z.string(),
        value: zod_1.z.string(),
    }))
        .optional(),
    inventory: zod_1.z
        .object({
        quantity: zod_1.z.number().optional(),
        inStock: zod_1.z.boolean().optional(),
    })
        .optional(),
});
