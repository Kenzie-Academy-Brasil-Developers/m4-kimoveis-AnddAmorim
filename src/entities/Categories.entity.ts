import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import RealEstates from "./RealEstates.entity";

@Entity("categories")
export default class Category {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({length: 45, unique: true})
  name: string;

  @OneToMany(() => RealEstates, (realEstates) => realEstates.category)
  realEstate: RealEstates;
}
