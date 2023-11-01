import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import RealEstates from "./RealEstates.entity";

@Entity("addresses")
export default class Addresses {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({length: 45})
  street: string;

  @Column({length: 8})
  zipCode: string;

  @Column()
  number: number;

  @Column({length: 20})
  city: string;

  @Column({length: 2})
  state: string;

  @OneToOne(() => RealEstates, (realEstates) => realEstates.address)
  realEstate: RealEstates;
}
