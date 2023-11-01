import {Router} from "express";
import {
  validateBody,
  verifyAdmin,
  verifyToken,
} from "../middlewares/globals.middleware";
import {createRealEstateSchema} from "../schemas/realEstates.schema";
import {verifyAddressExists} from "../middlewares/realEstates.middleware";
import {
  createRealEstateController,
  readRealEstatesController,
} from "../controller/realEstates.controller";

export const realEstateRouter: Router = Router();

realEstateRouter.post(
  "/",
  verifyToken,
  verifyAdmin,
  validateBody(createRealEstateSchema),
  verifyAddressExists,
  createRealEstateController
);

realEstateRouter.get("/", readRealEstatesController);
