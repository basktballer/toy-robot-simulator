import { Robot } from './models/robot.model';
import { Facing, RotationDirection } from './dtos/rotate-robot.dto';
export declare class RobotService {
    private robotModel;
    constructor(robotModel: typeof Robot);
    private readonly logger;
    findAll(): Promise<Robot[]>;
    getCurrentRobot(): Promise<Robot>;
    placeRobot(x?: number, y?: number): Promise<void>;
    moveRobot(id: string, facing: Facing): Promise<void>;
    rotateRobot(direction: RotationDirection, facing: Facing, id: string): Promise<void>;
}
