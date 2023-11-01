import {Request, Response} from "express";
import {
  createRealEstateService,
  readRealEstatesService,
} from "../services/realEstates.service";

export const createRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const estate = await createRealEstateService(req.body);

  return res.status(201).json(estate);
};

export const readRealEstatesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const estate = await readRealEstatesService();

  return res.status(200).json(estate);
};
