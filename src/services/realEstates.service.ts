import Addresses from "../entities/Adresses.entity";
import Category from "../entities/Categories.entity";
import RealEstates from "../entities/RealEstates.entity";
import {AppError} from "../errors/AppError";
import {CreateRealEstate} from "../interfaces/realEstates.interface";
import {addressRepo, categoryRepo, realEstateRepo} from "../repositories";

export const createRealEstateService = async (
  data: CreateRealEstate
): Promise<RealEstates> => {
  const category: Category | null = await categoryRepo.findOneBy({
    id: data.categoryId,
  });

  if (!category) throw new AppError("Category not found", 404);

  const address: Addresses = await addressRepo.save(data.address);

  const estate: RealEstates = await realEstateRepo.save({
    ...data,
    address,
    category: category!,
  });

  return estate;
};

export const readRealEstatesService = async (): Promise<RealEstates[]> => {
  return await realEstateRepo.find({
    relations: {address: true},
  });
};
