import { Controller, Post, Get, Put, Body, Logger } from '@nestjs/common';
import { PlaceRobotDto } from './dtos/place-robot.dto';
import { RotateRobotDto } from './dtos/rotate-robot.dto';
import { RobotService } from './robot.service';
import { MoveRobotDto } from './dtos/move-robot.dto';
import { MovesService } from 'src/moves/moves.service';

@Controller('robot')
export class RobotController {
  constructor(
    private robotService: RobotService,
    private moveService: MovesService
  ) {}

  private readonly logger = new Logger(RobotController.name)

  @Get('position')
  async currentPosition() {
    this.logger.log('get position called')
    const robot = await this.robotService.getCurrentRobot()
    if (!robot) {
      // if no data values, no robot found return null
      return null
    }
    const { x, y, facing } = robot.dataValues
    return {
      x: x,
      y: y,
      facing: facing
    }
  }

  @Post('place')
  async place(@Body() placeRobotDto: PlaceRobotDto) {
    this.logger.log('place called')
    const { x, y } = placeRobotDto
    await this.robotService.placeRobot(x, y);
    const { x: placedX, y: placedY, facing, id } = await this.robotService.getCurrentRobot()
    this.logger.log('place succesful')
    return {
      x: placedX,
      y: placedY,
      facing,
      robotId: id
    }
  }

  @Put('rotate')
  async rotateFacing(@Body() rotateRobotDto: RotateRobotDto) {
    this.logger.log('rotate called', rotateRobotDto)
    const { direction, facing, robotId } = rotateRobotDto 
    await this.robotService.rotateRobot(direction, facing, robotId)

    // grab updated robot
    const { x, y, facing: newFacing, id } = await this.robotService.getCurrentRobot()
    this.logger.log('rotate succesful')
    return {
      x,
      y,
      facing: newFacing,
      robotId: id
    }
  }

  @Put('move')
  async moveRobot(@Body() moveRobotDto: MoveRobotDto) {
    this.logger.log('move called')
    const { robotId, facing } = moveRobotDto
    await this.robotService.moveRobot(robotId, facing)

    // grab updated robot
    const { x, y, lastMove, id } = await this.robotService.getCurrentRobot()

    // update move
    await this.moveService.writeMove(robotId, x, y, facing, lastMove)
    this.logger.log('move succesful')
    return {
      x,
      y,
      facing: facing,
      robotId: id
    }
  }
}
