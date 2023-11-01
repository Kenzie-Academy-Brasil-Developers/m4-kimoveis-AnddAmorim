import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Schedule from "./Schedules.entity";
import Addresses from "./Adresses.entity";
import Category from "./Categories.entity";

@Entity("realEstates")
export default class RealEstates {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({default: false})
  sold: boolean;

  @Column({type: "decimal", precision: 12, scale: 2, default: 0})
  value: number | string;

  @Column()
  size: number;

  @CreateDateColumn({type: "date"})
  createdAt: string;

  @UpdateDateColumn({type: "date"})
  updatedAt: string;

  @OneToMany(() => Schedule, (schedule) => schedule.realEstate)
  schedules: Schedule[];

  @OneToOne(() => Addresses, (addresses) => addresses.realEstate)
  @JoinColumn()
  address: Addresses;

  @ManyToOne(() => Category, (categories) => categories.realEstate)
  category: Category;
}
