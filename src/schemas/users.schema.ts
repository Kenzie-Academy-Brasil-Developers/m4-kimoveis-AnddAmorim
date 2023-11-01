import {z} from "zod";

export const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(45),
  email: z.string().email().max(45),
  admin: z.boolean().default(false),
  password: z.string().max(120),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

export const createUserSchema = userSchema.pick({
  name: true,
  email: true,
  admin: true,
  password: true,
});

export const returnUserSchema = userSchema.omit({password: true});

export const readUserSchema = returnUserSchema.array();

export const loginUserSchema = userSchema.pick({
  email: true,
  password: true,
});

export const returnUserListSchema = returnUserSchema.array();

export const userWithoutAdmin = createUserSchema.omit({admin: true});

export const updateUserSchema = userWithoutAdmin.partial();
