//todo Schedule to this real estate at this date and time already exists (midd)
//todo Invalid hour, available times are 8AM to 18PM
//todo Invalid date, work days are monday to friday

import RealEstates from "../entities/RealEstates.entity";
import User from "../entities/Users.entity";
import {AppError} from "../errors/AppError";
import {CreateSchedule} from "../interfaces/schedules.interface";
import {realEstateRepo, scheduleRepo, userRepo} from "../repositories";

export const createScheduleService = async (
  data: CreateSchedule,
  userId: number
): Promise<void> => {
  const newDate = new Date(data.date).getDay();

  if (newDate === 0 || newDate === 6)
    throw new AppError("Invalid date, work days are monday to friday", 400);

  const time = Number(data.hour.split(":")[0]);

  if (time < 8 || time > 18)
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);

  const estate: RealEstates | null = await realEstateRepo.findOneBy({
    id: data.realEstateId,
  });

  const user: User | null = await userRepo.findOneBy({id: userId});

  await scheduleRepo.save({...data, estate: estate!, user: user!});
};

export const readAllSchedulesEstatesService = async (
  id: number
): Promise<any> => {
  const estate = await realEstateRepo.findOne({
    where: {id},
    relations: {
      schedules: {user: true},
      address: true,
      category: true,
    },
  });

  if (!estate)
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );

  return estate;
};
