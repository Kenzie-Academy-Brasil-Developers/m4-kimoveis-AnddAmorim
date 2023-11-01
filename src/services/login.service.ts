import "dotenv/config";
import {compare} from "bcryptjs";
import User from "../entities/Users.entity";
import {AppError} from "../errors/AppError";
import {LoginReturn, LoginUser} from "../interfaces/users.interface";
import {userRepo} from "../repositories";
import {sign} from "jsonwebtoken";

export const loginService = async (data: LoginUser): Promise<LoginReturn> => {
  const {email} = data;

  const user: User | null = await userRepo.findOneBy({email});

  if (!user) throw new AppError("Invalid credentials", 401);

  const passCompare = await compare(data.password, user.password);

  if (!passCompare) throw new AppError("Invalid credentials", 401);

  const token: string = sign(
    {email: user.email, admin: user.admin},
    process.env.SECRET_KEY!,
    {subject: user.id.toString(), expiresIn: process.env.EXPIRES_IN!}
  );

  return {token};
};
