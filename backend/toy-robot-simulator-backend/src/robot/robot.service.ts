import { Logger, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Robot as RobotModel } from './models/robot.model';
import { Facing, RotationDirection } from './dtos/rotate-robot.dto';
import { rotateRight, rotateLeft } from './utils/helpers';
import { Op } from 'sequelize';
import { Robot } from './robot';

@Injectable()
export class RobotService {
  constructor(
    @InjectModel(RobotModel)
    private robotModel: typeof RobotModel,
  ) {}

  private readonly logger = new Logger(RobotService.name);

  async getCurrentRobot(): Promise<Robot | undefined> {
    this.logger.log('getting current robot');
    const robotData = await this.robotModel.findOne({
      order: [['createdAt', 'DESC']],
    });
    this.logger.log('last robot', robotData?.dataValues);
    if (robotData) {
      const { id, x, y, lastMove, facing } = robotData.dataValues;
      const robot = new Robot({
        robotId: id,
        x,
        y,
        lastMove,
        facing: facing as Facing,
      });
      return robot;
    }
    return undefined;
  }

  async placeRobot(x = 0, y = 0): Promise<Robot> {
    this.logger.log(`placing robot, ${x}, ${y}`);
    const robotData = await this.robotModel.create({
      x: x,
      y: y,
      facing: 'north',
      lastMove: 0,
    });
    const { id, x: placeX, y: placeY, lastMove, facing } = robotData.dataValues;
    const robot = new Robot({
      robotId: id,
      x: placeX,
      y: placeY,
      lastMove,
      facing: facing as Facing,
    });
    return robot;
  }

  async moveRobot(id: string, facing: Facing) {
    this.logger.log(`moving robot, ${id}, ${facing}`);
    if (facing === 'north') {
      await this.robotModel.increment(
        {
          y: 1,
        },
        {
          where: {
            y: {
              [Op.lt]: 4,
            },
            id: id,
          },
        },
      );
    } else if (facing === 'east') {
      await this.robotModel.increment(
        {
          x: 1,
        },
        {
          where: {
            x: {
              [Op.lt]: 4,
            },
            id: id,
          },
        },
      );
    } else if (facing === 'south') {
      await this.robotModel.decrement(
        {
          y: 1,
        },
        {
          where: {
            y: {
              [Op.gt]: 0,
            },
            id: id,
          },
        },
      );
    } else if (facing === 'west') {
      await this.robotModel.decrement(
        {
          x: 1,
        },
        {
          where: {
            x: {
              [Op.gt]: 0,
            },
            id: id,
          },
        },
      );
    }
  }

  async rotateRobot(
    direction: RotationDirection,
    facing: Facing,
    id: string,
  ): Promise<void> {
    console.log('rotating robot', direction, facing, id);
    let newFace;
    if (direction === 'left') {
      newFace = rotateLeft(facing);
    } else {
      newFace = rotateRight(facing);
    }
    await this.robotModel.update(
      {
        facing: newFace,
      },
      {
        where: {
          id: id,
        },
      },
    );
  }
}
