import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { PlaceRobotDto } from './dtos/place-robot.dto';
import { RotateRobotDto } from './dtos/rotate-robot.dto';
import { RobotService } from './robot.service';
import { MoveRobotDto } from './dtos/move-robot.dto';
import { MovesService } from '../moves/moves.service';
import { ApiResponse } from '@nestjs/swagger';
import { Robot } from './robot';

@Controller('robot')
export class RobotController {
  constructor(
    private robotService: RobotService,
    private moveService: MovesService,
  ) {}

  private readonly logger = new Logger(RobotController.name);

  @Get('position')
  @ApiResponse({
    status: 201,
    description: 'Current robot position succesfully returned',
    type: Robot
  })
  async currentPosition(): Promise<Robot | undefined> {
    this.logger.log('get position called');
    const robot = await this.robotService.getCurrentRobot();
    if (!robot) {
      // if no data values, no robot found return undefined
      return undefined;
    }
    this.logger.log('returning robot position');
    return robot;
  }

  @Post('place')
  @ApiResponse({
    status: 201,
    description: 'New robot has been succesfully placed and returned',
    type: Robot
  })
  async place(@Body() placeRobotDto: PlaceRobotDto): Promise<Robot> {
    this.logger.log('place called');
    const { x, y } = placeRobotDto;
    const robot = await this.robotService.placeRobot(x, y);
    const { x: placedX, y: placedY, facing, robotId, lastMove } = robot;
    // update move
    await this.moveService.writeMove(
      robotId,
      placedX,
      placedY,
      facing,
      lastMove,
    );
    this.logger.log('place succesful');
    return robot;
  }

  @Put('rotate')
  @ApiResponse({
    status: 201,
    description: 'Robot has succesfully rotated',
    type: Robot
  })
  async rotateFacing(@Body() rotateRobotDto: RotateRobotDto): Promise<Robot> {
    this.logger.log('rotate called', rotateRobotDto);
    const { direction, facing, robotId } = rotateRobotDto;
    await this.robotService.rotateRobot(direction, facing, robotId);

    // grab updated robot
    const robot = await this.robotService.getCurrentRobot();
    if (!robot) {
      throw new InternalServerErrorException();
    }
    const { x, y, facing: newFacing, lastMove } = robot;
    // update move
    await this.moveService.writeMove(robotId, x, y, newFacing, lastMove);
    this.logger.log('rotate succesful');
    return robot;
  }

  @Put('move')
  @ApiResponse({
    status: 201,
    description: 'Robot has succesfully moved',
    type: Robot
  })
  async moveRobot(@Body() moveRobotDto: MoveRobotDto): Promise<Robot> {
    this.logger.log('move called');
    const { robotId, facing } = moveRobotDto;
    await this.robotService.moveRobot(robotId, facing);

    // grab updated robot
    const robot = await this.robotService.getCurrentRobot();
    if (!robot) {
      throw new InternalServerErrorException();
    }
    const { x, y, lastMove } = robot;

    // update move
    await this.moveService.writeMove(robotId, x, y, facing, lastMove);
    this.logger.log('move succesful');
    return robot;
  }
}
