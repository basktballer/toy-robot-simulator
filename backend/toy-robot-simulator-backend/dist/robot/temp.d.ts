import { Facing } from "./dtos/rotate-robot.dto";
export interface RobotProps {
    robotId: string;
    x: number;
    y: number;
    facing: Facing;
    lastMove: number;
}
export declare class Robot {
    robotId: string;
    x: number;
    y: number;
    facing: Facing;
    lastMove: number;
    constructor({ robotId, x, y, facing, lastMove }: RobotProps);
}
