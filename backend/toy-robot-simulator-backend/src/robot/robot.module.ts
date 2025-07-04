import { Module } from '@nestjs/common';
import { RobotController } from './robot.controller';
import { RobotService } from './robot.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Robot } from './models/robot.model';
import { MovesService } from '../moves/moves.service';
import { Move } from '../moves/models/move.model';

@Module({
  imports: [SequelizeModule.forFeature([Robot, Move])],
  exports: [SequelizeModule],
  controllers: [RobotController],
  providers: [RobotService, MovesService],
})
export class RobotModule {}
