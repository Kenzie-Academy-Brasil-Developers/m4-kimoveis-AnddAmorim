import { DeepPartial, Repository } from 'typeorm';
import { AppDataSource } from '../../../data-source';
import RealEstates from '../../../entities/RealEstates.entity';
import Addresses from '../../../entities/Adresses.entity';
// import { Address, RealEstate } from '../../../entities';

type iRealEstateRepo = Repository<RealEstates>;
type iAddressRepo = Repository<Addresses>;

const manyRealStations = async (
  realEstateTotal: number = 5
): Promise<Array<DeepPartial<RealEstates>>> => {
  const realEstateRepo: iRealEstateRepo =
    AppDataSource.getRepository(RealEstates);
  const addressRepo: iAddressRepo = AppDataSource.getRepository(Addresses);

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
    });
  }

  await realEstateRepo
    .createQueryBuilder('rs')
    .insert()
    .values(manyRealEstate)
    .execute();

  return manyRealEstate;
};

export default { manyRealStations };
