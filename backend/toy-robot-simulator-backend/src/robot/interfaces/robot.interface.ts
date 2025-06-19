import { Facing } from '../dtos/rotate-robot.dto';

export interface Robot {
  robotId: string;
  x: number;
  y: number;
  facing: Facing;
}
