import CommonEntity from "../common/common-entity";
import { Column, Entity, OneToMany } from "typeorm";
import Model from "../model/model";

@Entity('Brand')
export default class Brand extends CommonEntity {
  @Column({ nullable: false })
  name: string;

  @OneToMany(type => Model, model => model.brand, { onDelete: 'CASCADE', persistence: false})
  models: Model[]
}