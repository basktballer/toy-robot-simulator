import { Test, TestingModule } from '@nestjs/testing';
import { RobotService } from './robot.service';
import { Robot as RobotModel } from './models/robot.model';
import { getModelToken } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Robot } from './robot';
import { Facing } from './dtos/rotate-robot.dto';

const mockModel = {
  findOne: jest.fn(),
  create: jest.fn(),
  increment: jest.fn(),
  decrement: jest.fn(),
  update: jest.fn(),
};

describe('RobotService', () => {
  let service: RobotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RobotService,
        {
          provide: getModelToken(RobotModel),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<RobotService>(RobotService);
    jest.clearAllMocks();
  });

  it('getCurrentRobot should get the current robot', async () => {
    const findOneArgs = {
      order: [['createdAt', 'DESC']],
    };
    const robotData = {
      dataValues: {
        x: 0,
        y: 0,
        id: '1',
        facing: 'north',
        lastMove: 2,
      },
    };
    const robot = new Robot({
      robotId: '1',
      x: 0,
      y: 0,
      facing: 'north' as Facing,
      lastMove: 2,
    });
    mockModel.findOne.mockResolvedValueOnce(robotData);
    const resp = await service.getCurrentRobot();
    console.log('resp', resp);
    expect(mockModel.findOne).toHaveBeenCalledWith(findOneArgs);
    expect(resp).toEqual(robot);
  });

  it('getCurrentRobot should return undefined if robot not found', async () => {
    const findOneArgs = {
      order: [['createdAt', 'DESC']],
    };
    mockModel.findOne.mockResolvedValueOnce(undefined);
    const resp = await service.getCurrentRobot();
    expect(mockModel.findOne).toHaveBeenCalledWith(findOneArgs);
    expect(resp).toEqual(undefined);
  });

  it('placeRobot should create a new robot at position', async () => {
    const createArgs = {
      x: 1,
      y: 1,
      lastMove: 0,
      facing: 'north',
    };
    const robotData = {
      dataValues: {
        x: 1,
        y: 1,
        id: '1',
        facing: 'north',
        lastMove: 0,
      },
    };
    const robot = new Robot({
      robotId: '1',
      x: 1,
      y: 1,
      lastMove: 0,
      facing: 'north' as Facing,
    });
    mockModel.create.mockResolvedValueOnce(robotData);
    const resp = await service.placeRobot(1, 1);
    expect(mockModel.create).toHaveBeenCalledWith(createArgs);
    expect(resp).toEqual(robot);
  });

  it('moveRobot should increment y if facing north and y less than 4', async () => {
    const incArgs = {
      y: 1,
    };
    const incWhere = {
      where: {
        y: {
          [Op.lt]: 4,
        },
        id: '2',
      },
    };
    await service.moveRobot('2', 'north');
    expect(mockModel.increment).toHaveBeenCalledWith(incArgs, incWhere);
  });

  it('moveRobot should increment x if facing east and x less than 4', async () => {
    const incArgs = {
      x: 1,
    };
    const incWhere = {
      where: {
        x: {
          [Op.lt]: 4,
        },
        id: '2',
      },
    };
    await service.moveRobot('2', 'east');
    expect(mockModel.increment).toHaveBeenCalledWith(incArgs, incWhere);
  });

  it('moveRobot should decrement y if facing south and y greater than 0', async () => {
    const decArgs = {
      y: 1,
    };
    const decWhere = {
      where: {
        y: {
          [Op.gt]: 0,
        },
        id: '2',
      },
    };
    await service.moveRobot('2', 'south');
    expect(mockModel.decrement).toHaveBeenCalledWith(decArgs, decWhere);
  });

  it('moveRobot should decrement x if facing west and x greater than 0', async () => {
    const incArgs = {
      x: 1,
    };
    const incWhere = {
      where: {
        x: {
          [Op.gt]: 0,
        },
        id: '2',
      },
    };
    await service.moveRobot('2', 'west');
    expect(mockModel.decrement).toHaveBeenCalledWith(incArgs, incWhere);
  });

  it('rotateRobot should rotate west if facing north and left passed', async () => {
    const updateArgs = {
      facing: 'west',
    };
    const updateWhere = {
      where: {
        id: '2',
      },
    };
    await service.rotateRobot('left', 'north', '2');
    expect(mockModel.update).toHaveBeenCalledWith(updateArgs, updateWhere);
  });

  it('rotateRobot should rotate east if facing north and right passed', async () => {
    const updateArgs = {
      facing: 'east',
    };
    const updateWhere = {
      where: {
        id: '2',
      },
    };
    await service.rotateRobot('right', 'north', '2');
    expect(mockModel.update).toHaveBeenCalledWith(updateArgs, updateWhere);
  });
});
