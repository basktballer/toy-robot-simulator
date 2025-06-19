import { ApiProperty } from '@nestjs/swagger';

export type RotationDirection = 'left' | 'right';
export type Facing = 'north' | 'south' | 'east' | 'west';
export class RotateRobotDto {
  @ApiProperty()
  robotId: string;

  @ApiProperty()
  direction: RotationDirection;

  @ApiProperty()
  facing: Facing;
}
