import { DateTransformer } from './date-transform';
import { PrimaryGeneratedColumn, Column } from "typeorm";

export default abstract class CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "bigint", transformer: new DateTransformer()})
  createdAt: Date = new Date();
}