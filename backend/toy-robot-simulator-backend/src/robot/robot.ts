import { ApiProperty } from '@nestjs/swagger';
import { Facing } from './dtos/rotate-robot.dto';

export interface RobotProps {
  robotId: string;
  x: number;
  y: number;
  facing: Facing;
  lastMove: number;
}

export class Robot {
  @ApiProperty()
  robotId: string;

  @ApiProperty()
  x: number;

  @ApiProperty()
  y: number;

  @ApiProperty()
  facing: Facing;

  @ApiProperty()
  lastMove: number;

  constructor({ robotId, x, y, facing, lastMove }: RobotProps) {
    this.robotId = robotId;
    this.facing = facing;
    this.x = x;
    this.y = y;
    this.lastMove = lastMove;
  }
}
