import { Test, TestingModule } from '@nestjs/testing';
import { RobotController } from './robot.controller';
import { RobotService } from './robot.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { MovesService } from '../moves/moves.service';
import { Robot } from './robot';
import { Facing, RotationDirection } from './dtos/rotate-robot.dto';

const moduleMocker = new ModuleMocker(global);

describe('RobotController', () => {
  let controller: RobotController;
  let robotService: RobotService;
  let movesService: MovesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RobotController],
    })
      .useMocker((token) => {
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = module.get<RobotController>(RobotController);
    robotService = module.get<RobotService>(RobotService);
    movesService = module.get<MovesService>(MovesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(robotService).toBeDefined();
  });

  it('GET position should getRobot and return undefined', async () => {
    jest
      .spyOn(robotService, 'getCurrentRobot')
      .mockResolvedValueOnce(undefined);
    const resp = await controller.currentPosition();
    expect(resp).toBeUndefined();
  });

  it('GET position should return Robot if found', async () => {
    const robotData = {
      robotId: '1',
      x: 0,
      y: 0,
      facing: 'north' as Facing,
      lastMove: 0,
    };
    const robot = new Robot(robotData);
    jest.spyOn(robotService, 'getCurrentRobot').mockResolvedValueOnce(robot);
    const resp = await controller.currentPosition();
    expect(resp).toEqual(robot);
  });

  it('POST place should place robot and return the new robot', async () => {
    const placeDto = {
      x: 1,
      y: 1,
    };
    const robotData = {
      robotId: '1',
      x: 1,
      y: 1,
      facing: 'north' as Facing,
      lastMove: 0,
    };
    const robot = new Robot(robotData);

    jest.spyOn(robotService, 'placeRobot').mockResolvedValueOnce(robot);
    const mockWrite = jest.spyOn(movesService, 'writeMove');
    const resp = await controller.place(placeDto);
    expect(resp).toEqual(robot);
    expect(mockWrite).toHaveBeenCalledWith('1', 1, 1, 'north', 0);
  });

  // it('POST place should handle when a BadRequest is sent via API)

  it('PUT rotate should update Robot facing and return values', async () => {
    const rotateDto = {
      robotId: '1',
      direction: 'left' as RotationDirection,
      facing: 'north' as Facing,
    };
    const robotData = {
      robotId: '1',
      x: 1,
      y: 1,
      facing: 'west' as Facing,
      lastMove: 0,
    };
    const robot = new Robot(robotData);
    jest.spyOn(robotService, 'rotateRobot').mockResolvedValue();
    jest.spyOn(robotService, 'getCurrentRobot').mockResolvedValue(robot);
    const mockWrite = jest.spyOn(movesService, 'writeMove');
    const resp = await controller.rotateFacing(rotateDto);
    expect(resp).toEqual(robot);
    expect(mockWrite).toHaveBeenCalledWith('1', 1, 1, 'west', 0);
  });

  it('PUT move should update Robot position if eligible and return values', async () => {
    const moveDto = {
      robotId: '1',
      facing: 'north' as Facing,
    };
    const robotData = {
      robotId: '1',
      x: 1,
      y: 2,
      facing: 'north' as Facing,
      lastMove: 0,
    };
    const robot = new Robot(robotData);
    jest.spyOn(robotService, 'moveRobot').mockResolvedValue();
    jest.spyOn(robotService, 'getCurrentRobot').mockResolvedValue(robot);
    const mockWrite = jest.spyOn(movesService, 'writeMove');
    const resp = await controller.moveRobot(moveDto);
    expect(resp).toEqual(robot);
    expect(mockWrite).toHaveBeenCalledWith('1', 1, 2, 'north', 0);
  });
});
