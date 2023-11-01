import {z} from "zod";

export const categoriesSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(45),
});

export const createCategorySchema = categoriesSchema.omit({id: true});

export const readAllCategoriesSchema = categoriesSchema.array();
