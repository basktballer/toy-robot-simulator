export type RotationDirection = "left" | "right";
export type Facing = "north" | "south" | "east" | "west"
export class RotateRobotDto {
  robotId: string
  direction: RotationDirection
  facing: Facing
}