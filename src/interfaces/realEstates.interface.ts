import {z} from "zod";
import {createRealEstateSchema} from "../schemas/realEstates.schema";
import {Repository} from "typeorm";
import Addresses from "../entities/Adresses.entity";
import RealEstates from "../entities/RealEstates.entity";

export type CreateRealEstate = z.infer<typeof createRealEstateSchema>;

export type RealEstateRepo = Repository<RealEstates>;

export type AdressRepo = Repository<Addresses>;
