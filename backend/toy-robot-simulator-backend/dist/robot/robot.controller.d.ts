import { PlaceRobotDto } from './dtos/place-robot.dto';
import { Facing, RotateRobotDto } from './dtos/rotate-robot.dto';
import { RobotService } from './robot.service';
import { MoveRobotDto } from './dtos/move-robot.dto';
import { MovesService } from 'src/moves/moves.service';
import { Robot } from './interfaces/robot.interface';
export declare class RobotController {
    private robotService;
    private moveService;
    constructor(robotService: RobotService, moveService: MovesService);
    private readonly logger;
    currentPosition(): Promise<Robot | undefined>;
    place(placeRobotDto: PlaceRobotDto): Promise<{
        x: number;
        y: number;
        facing: string;
        robotId: any;
    }>;
    rotateFacing(rotateRobotDto: RotateRobotDto): Promise<{
        x: number;
        y: number;
        facing: string;
        robotId: any;
    }>;
    moveRobot(moveRobotDto: MoveRobotDto): Promise<{
        x: number;
        y: number;
        facing: Facing;
        robotId: any;
    }>;
}
