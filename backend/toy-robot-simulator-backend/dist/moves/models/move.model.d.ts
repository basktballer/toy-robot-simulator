import { Model } from 'sequelize-typescript';
export declare class Move extends Model {
    robotId: string;
    moveNumber: number;
    x: number;
    y: number;
    facing: string;
}
