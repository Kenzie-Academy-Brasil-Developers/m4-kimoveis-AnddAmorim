import {NextFunction, Request, Response} from "express";
import RealEstates from "../entities/RealEstates.entity";
import {realEstateRepo, scheduleRepo} from "../repositories";
import {AppError} from "../errors/AppError";
import Schedule from "./../entities/Schedules.entity";

export const verifyRealEstateExists = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  let id = req.params.id;

  if (!id) {
    id = req.body.realEstateId;
  }

  const estate: RealEstates | null = await realEstateRepo.findOne({
    where: {id: Number(id)},
  });

  if (!estate) throw new AppError("RealEstate not found", 404);

  return next();
};

export const verifyRealEstatesSchedulesExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {realEstateId, hour, date} = req.body;

  const schedule: Schedule | null = await scheduleRepo.findOne({
    where: {
      realEstate: {
        id: Number(realEstateId),
      },
      date,
      hour,
    },
  });

  if (schedule)
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );

  return next();
};

export const verifyUserScheduleExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let {sub} = res.locals.decoded;

  sub = Number(sub);

  const {date, hour} = req.body;

  const schedule: Schedule | null = await scheduleRepo.findOne({
    where: {
      user: {
        id: sub,
      },
      date,
      hour,
    },
  });

  if (schedule)
    throw new AppError(
      "User schedule to this real estate at this date and time already exists" /*'calopsito'*/,
      409
    );

  return next();
};
