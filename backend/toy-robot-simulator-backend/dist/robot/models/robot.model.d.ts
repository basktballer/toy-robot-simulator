import { Model } from 'sequelize-typescript';
export declare class Robot extends Model {
    lastMove: number;
    x: number;
    y: number;
    facing: string;
}
