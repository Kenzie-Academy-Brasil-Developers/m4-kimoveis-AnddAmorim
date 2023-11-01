import {z} from "zod";
import {createScheduleSchema} from "../schemas/schedules.schema";
import {Repository} from "typeorm";
import Schedule from "../entities/Schedules.entity";

export type CreateSchedule = z.infer<typeof createScheduleSchema>;

export type ScheduleRepo = Repository<Schedule>;
