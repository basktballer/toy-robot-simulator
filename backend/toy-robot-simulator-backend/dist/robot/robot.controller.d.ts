import { PlaceRobotDto } from './dtos/place-robot.dto';
import { RotateRobotDto } from './dtos/rotate-robot.dto';
import { RobotService } from './robot.service';
import { MoveRobotDto } from './dtos/move-robot.dto';
import { MovesService } from '../moves/moves.service';
import { Robot } from './robot';
export declare class RobotController {
    private robotService;
    private moveService;
    constructor(robotService: RobotService, moveService: MovesService);
    private readonly logger;
    currentPosition(): Promise<Robot | undefined>;
    place(placeRobotDto: PlaceRobotDto): Promise<Robot>;
    rotateFacing(rotateRobotDto: RotateRobotDto): Promise<Robot>;
    moveRobot(moveRobotDto: MoveRobotDto): Promise<Robot>;
}
