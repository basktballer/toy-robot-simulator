import { ApiProperty } from '@nestjs/swagger';
import { Facing } from './rotate-robot.dto';

export class MoveRobotDto {
  @ApiProperty()
  robotId: string;

  @ApiProperty()
  facing: Facing;
}
