import {AppDataSource} from "./data-source";
import User from "./entities/Users.entity";
import {UserRepo} from "./interfaces/users.interface";
import Addresses from "./entities/Adresses.entity";
import {AdressRepo, RealEstateRepo} from "./interfaces/realEstates.interface";
import Schedule from "./entities/Schedules.entity";
import {ScheduleRepo} from "./interfaces/schedules.interface";
import RealEstates from "./entities/RealEstates.entity";
import Category from "./entities/Categories.entity";
import {CategoryRepo} from "./interfaces/categories.interface";

export const userRepo: UserRepo = AppDataSource.getRepository(User);

export const scheduleRepo: ScheduleRepo = AppDataSource.getRepository(Schedule);

export const addressRepo: AdressRepo = AppDataSource.getRepository(Addresses);

export const realEstateRepo: RealEstateRepo =
  AppDataSource.getRepository(RealEstates);

export const categoryRepo: CategoryRepo = AppDataSource.getRepository(Category);
