import {z} from "zod";
import {
  createUserSchema,
  loginUserSchema,
  returnUserSchema,
} from "../schemas/users.schema";
import {DeepPartial, Repository} from "typeorm";
import User from "../entities/Users.entity";

export type CreateUser = z.infer<typeof createUserSchema>;

export type UpdateUserBody = Omit<CreateUser, "admin">;

export type UpdateUser = DeepPartial<UpdateUserBody>;

export type ReturnUser = z.infer<typeof returnUserSchema>;

export type ReadReturnUser = ReturnUser[];

export type LoginUser = z.infer<typeof loginUserSchema>;

export type LoginReturn = {token: string};

export type UserRepo = Repository<User>;
