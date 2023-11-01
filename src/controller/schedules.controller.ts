import {Request, Response} from "express";
import {
  createScheduleService,
  readAllSchedulesEstatesService,
} from "../services/schedules.service";

export const createScheduleController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {sub} = res.locals.decoded;

  await createScheduleService(req.body, sub);

  return res.status(201).json({message: "Schedule created"});
};

export const readAllSchedulesEstatesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {id} = req.params;

  const estate = await readAllSchedulesEstatesService(Number(id));

  return res.status(200).json(estate);
};
