import { Repository } from 'typeorm';
import { AppDataSource } from '../../../data-source';
import Category from '../../../entities/Categories.entity';
import Addresses from '../../../entities/Adresses.entity';
import RealEstates from '../../../entities/RealEstates.entity';

type iCategoryRepo = Repository<Category>;
type iRealEstateRepo = Repository<RealEstates>;
type iAddressRepo = Repository<Addresses>;

const categoryRealStation = async (): Promise<any> => {
  const categoryRepo: iCategoryRepo = AppDataSource.getRepository(Category);
  const category = await categoryRepo.save({ name: 'Studio' });

  const realEstateRepo: iRealEstateRepo =
    AppDataSource.getRepository(RealEstates);
  const addressRepo: iAddressRepo = AppDataSource.getRepository(Addresses);

  const realEstateTotal: number = 5;

  const manyAddresses = Array.from(Array(realEstateTotal)).map((val, index) => {
    return {
      city: `city${index}`,
      street: `street${index}`,
      state: `s${index}`,
      zipCode: `zipCode${index}`,
      number: index,
    };
  });

  const manyRealEstate = [];

  for await (const address of manyAddresses) {
    const realEstateVal = Math.random() * 10000000;
    const addressCreate = await addressRepo.save(address);
    manyRealEstate.push({
      value: parseFloat(realEstateVal.toString()) || 0,
      size: Math.ceil(Math.random() * 100),
      address: addressCreate,
      category: { id: category.id },
    });
  }

  await realEstateRepo
    .createQueryBuilder('rs')
    .insert()
    .values(manyRealEstate)
    .execute();

  return {
    ...category,
    realEstate: await realEstateRepo.find(),
  };
};

export default { categoryRealStation };
