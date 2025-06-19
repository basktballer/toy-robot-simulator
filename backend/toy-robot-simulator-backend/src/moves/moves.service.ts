import { Logger, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Move } from '../moves/models/move.model';

@Injectable()
export class MovesService {
  constructor(
    @InjectModel(Move)
    private moveModel: typeof Move,
  ) {}

  private readonly logger = new Logger(MovesService.name);

  async writeMove(
    robotId: string,
    x: number,
    y: number,
    facing: string,
    lastMove: number,
  ) {
    this.logger.log('writing move');
    await this.moveModel.create({
      robotId: robotId,
      x: x,
      y: y,
      facing: facing,
      moveNumber: lastMove + 1,
    });
  }
}
