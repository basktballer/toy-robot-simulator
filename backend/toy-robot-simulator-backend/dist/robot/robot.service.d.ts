import { Robot as RobotModel } from './models/robot.model';
import { Facing, RotationDirection } from './dtos/rotate-robot.dto';
import { Robot } from './robot';
export declare class RobotService {
    private robotModel;
    constructor(robotModel: typeof RobotModel);
    private readonly logger;
    getCurrentRobot(): Promise<Robot | undefined>;
    placeRobot(x?: number, y?: number): Promise<Robot>;
    moveRobot(id: string, facing: Facing): Promise<void>;
    rotateRobot(direction: RotationDirection, facing: Facing, id: string): Promise<void>;
}
