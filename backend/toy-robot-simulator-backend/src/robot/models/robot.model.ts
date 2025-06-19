import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Robot extends Model {
  @Column
  lastMove: number;

  @Column
  x: number;

  @Column
  y: number;

  @Column
  facing: string;
}
