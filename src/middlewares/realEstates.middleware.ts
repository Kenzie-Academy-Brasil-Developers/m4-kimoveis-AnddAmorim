import {NextFunction, Request, Response} from "express";
import Addresses from "../entities/Adresses.entity";
import {addressRepo} from "../repositories";
import {AppError} from "../errors/AppError";

export const verifyAddressExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {address} = req.body;

  const adressExists: Addresses | null = await addressRepo.findOne({
    where: {
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      number: address.number,
    },
  });

  if (adressExists) throw new AppError("Address already exists", 409);

  return next();
};
