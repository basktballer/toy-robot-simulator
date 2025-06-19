import {
   Logger,
   Injectable
   } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Robot } from './models/robot.model';
import { Facing, RotationDirection } from './dtos/rotate-robot.dto';
import { rotateRight, rotateLeft } from './utils/helpers';
import { Op } from 'sequelize';

@Injectable()
export class RobotService {
  constructor(
    @InjectModel(Robot)
    private robotModel: typeof Robot,
  ) {}

  private readonly logger = new Logger(RobotService.name)

  async findAll(): Promise<Robot[]> {
    const data = await this.robotModel.findAll()
    this.logger.log('found all', data)
    return data
  }
  

  async getCurrentRobot(): Promise<Robot> {
    const robot = await this.robotModel.findOne({
      order: [['createdAt', 'DESC']]
    })
    this.logger.log('last robot', robot?.dataValues)
    return robot?.dataValues
  }

  async placeRobot(x = 0, y = 0) {
    this.logger.log('Placing robot')
    await this.robotModel.create(
      {
        x: x,
        y: y,
        facing: "north"
      }
    )
  }

  async moveRobot(id: string, facing: Facing) {
    if (facing === 'north') {
      await this.robotModel.increment(
        {
          y: 1
        },
        {
          where: {
            y: { 
              [Op.lt]: 4,
            }
          }
        }
      )
    } else if (facing === 'east') {
      await this.robotModel.increment(
        {
          x: 1
        },
        {
          where: {
            x: { 
              [Op.lt]: 4,
            }
          }
        }
      )
    } else if (facing === 'south') {
      await this.robotModel.decrement(
        {
          y: 1
        },
        {
          where: {
            y: { 
              [Op.gt]: 0,
            }
          }
        }
      )
    } else if (facing === 'west') {
      await this.robotModel.decrement(
        {
          x: 1
        },
        {
          where: {
            x: { 
              [Op.gt]: 0,
            }
          }
        }
      )
    }
  }

  async rotateRobot(direction: RotationDirection, facing: Facing, id: string) {
    console.log('props', direction, facing, id)
    let newFace
    if (direction === 'left') {
      newFace = rotateLeft(facing)
    } else {
      newFace = rotateRight(facing)
    }
    await this.robotModel.update(
      {
        facing: newFace
      },
      {
        where: {
          id: id
        }
      }
    )
  }
  
}
