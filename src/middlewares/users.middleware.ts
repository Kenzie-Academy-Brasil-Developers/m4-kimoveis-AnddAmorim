import {NextFunction, Request, Response} from "express";
import User from "../entities/Users.entity";
import {userRepo} from "../repositories";
import {AppError} from "../errors/AppError";

export const verifyUserEmail = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  const {email} = req.body;

  const user: User | null = await userRepo.findOneBy({email});

  if (user) throw new AppError("Email already exists", 409);

  return next();
};

export const verifyUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {id} = req.params;

  const user: User | null = await userRepo.findOneBy({id: Number(id)});

  if (!user) throw new AppError("User not found", 404);

  res.locals = {...res.locals, user};

  return next();
};
