import { Table, Column, Model } from "sequelize-typescript";

@Table
export class Move extends Model {
  @Column
  robotId: string

  @Column
  moveNumber: number

  @Column
  x: number

  @Column
  y: number

  @Column
  facing: string

}
