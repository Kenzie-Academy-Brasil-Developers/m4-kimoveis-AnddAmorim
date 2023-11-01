import {Router} from "express";
import {
  validateBody,
  verifyAdmin,
  verifyPermission,
  verifyToken,
} from "../middlewares/globals.middleware";
import {createScheduleSchema} from "../schemas/schedules.schema";
import {
  createScheduleController,
  readAllSchedulesEstatesController,
} from "../controller/schedules.controller";
import {
  verifyRealEstateExists,
  verifyRealEstatesSchedulesExists,
  verifyUserScheduleExists,
} from "../middlewares/schedules.middleware";

export const scheduleRouter: Router = Router();

scheduleRouter.post(
  "/",
  verifyToken,
  validateBody(createScheduleSchema),
  verifyRealEstateExists,
  verifyRealEstatesSchedulesExists,
  verifyUserScheduleExists,
  createScheduleController
);

scheduleRouter.get(
  "/realEstate/:id",
  verifyToken,
  verifyAdmin,
  verifyRealEstateExists,
  readAllSchedulesEstatesController
);
