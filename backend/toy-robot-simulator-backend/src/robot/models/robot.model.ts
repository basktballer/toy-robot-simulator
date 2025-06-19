import { Table, Column, Model } from "sequelize-typescript";

@Table
export class Robot extends Model {
  @Column({ defaultValue: false })
  active: boolean

  @Column
  lastMove: number

  @Column
  x: number

  @Column
  y: number

  @Column
  facing: string

}