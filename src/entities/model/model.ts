import CommonEntity from "../common/common-entity";
import { Column, ManyToOne, Entity, JoinColumn } from "typeorm";
import Brand from "../brand/brand";

@Entity('Model')
export default class Model extends CommonEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  photoURI: string;

  @ManyToOne(type => Brand, { nullable: false })
  @JoinColumn()
  brand: Brand;

  get exibitionName(): string { 
    return `[${this.brand.name}] ${this.name}`
  }
}