import { Model } from "sequelize-typescript";
export declare class Robot extends Model {
    active: boolean;
    lastMove: number;
    x: number;
    y: number;
    facing: string;
}
