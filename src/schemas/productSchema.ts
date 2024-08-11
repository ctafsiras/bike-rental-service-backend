import { z } from "zod";

export const variantSchema = z.object({
  type: z.string(),
  value: z.string(),
});

export const inventorySchema = z.object({
  quantity: z.number(),
  inStock: z.boolean(),
});

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(variantSchema),
  inventory: inventorySchema,
});

export const productSchemaForUpdate = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  variants: z
    .array(
      z.object({
        type: z.string(),
        value: z.string(),
      })
    )
    .optional(),
  inventory: z
    .object({
      quantity: z.number().optional(),
      inStock: z.boolean().optional(),
    })
    .optional(),
});
