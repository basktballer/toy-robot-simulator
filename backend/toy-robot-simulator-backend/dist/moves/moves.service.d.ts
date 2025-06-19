import { Move } from 'src/robot/models/move.model';
export declare class MovesService {
    private moveModel;
    constructor(moveModel: typeof Move);
    private readonly logger;
    writeMove(robotId: string, x: number, y: number, facing: string, lastMove: number): Promise<void>;
}
