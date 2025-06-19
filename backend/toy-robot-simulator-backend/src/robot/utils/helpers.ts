import { Facing } from '../dtos/rotate-robot.dto';

export function rotateLeft(facing: Facing): Facing {
  switch (facing) {
    case 'north':
      return 'west';
    case 'south':
      return 'east';
    case 'east':
      return 'north';
    case 'west':
      return 'south';
  }
}

export function rotateRight(facing: Facing): Facing {
  switch (facing) {
    case 'north':
      return 'east';
    case 'south':
      return 'west';
    case 'east':
      return 'south';
    case 'west':
      return 'north';
  }
}
