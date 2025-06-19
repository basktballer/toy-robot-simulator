import { Test, TestingModule } from '@nestjs/testing';
import { MovesService } from './moves.service';
import { getModelToken } from '@nestjs/sequelize';
import { Move } from './models/move.model';

describe('MovesService', () => {
  let service: MovesService;
  const mockModel = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovesService,
        {
          provide: getModelToken(Move),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<MovesService>(MovesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a move', async () => {
    const moveResults = {
      robotId: '1',
      x: 0,
      y: 0,
      facing: 'north',
      moveNumber: 3,
    };
    await service.writeMove('1', 0, 0, 'north', 2);
    expect(mockModel.create).toHaveBeenCalledWith(moveResults);
  });
});
