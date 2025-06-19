import { PlaceRobotDto } from './dtos/place-robot.dto';
import { RotateRobotDto } from './dtos/rotate-robot.dto';
import { RobotService } from './robot.service';
import { MoveRobotDto } from './dtos/move-robot.dto';
import { MovesService } from 'src/moves/moves.service';
export declare class RobotController {
    private robotService;
    private moveService;
    constructor(robotService: RobotService, moveService: MovesService);
    private readonly logger;
    currentPosition(): Promise<{
        x: any;
        y: any;
        facing: any;
    } | null>;
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
        facing: import("./dtos/rotate-robot.dto").Facing;
        robotId: any;
    }>;
}
