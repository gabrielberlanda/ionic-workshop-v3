import CommonEntity from "../common/common-entity";
import { Column, Entity } from "typeorm";

@Entity('Brand')
export default class Brand extends CommonEntity {
  @Column({ nullable: false })
  name: string;
}