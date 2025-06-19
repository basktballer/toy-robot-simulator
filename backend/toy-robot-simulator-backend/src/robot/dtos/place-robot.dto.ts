import { ApiProperty } from '@nestjs/swagger';

export class PlaceRobotDto {
  @ApiProperty()
  x: number;

  @ApiProperty()
  y: number;
}
