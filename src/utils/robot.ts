import { Direction } from "@/types/robot";

export const getNextPosition = (x: number, y: number, direction: Direction) => {
  switch (direction) {
    case Direction.NORTH:
      return { x: x - 1, y };
    case Direction.EAST:
      return { x, y: y + 1 };
    case Direction.SOUTH:
      return { x: x + 1, y };
    case Direction.WEST:
      return { x, y: y - 1 };
    default:
      return { x, y };
  }
};

export const getRightDirection = (direction: Direction) => {
  switch (direction) {
    case Direction.NORTH:
      return Direction.EAST;
    case Direction.EAST:
      return Direction.SOUTH;
    case Direction.SOUTH:
      return Direction.WEST;
    case Direction.WEST:
      return Direction.NORTH;
    default:
      return direction;
  }
};

export const getLeftDirection = (direction: Direction) => {
  switch (direction) {
    case Direction.NORTH:
      return Direction.WEST;
    case Direction.EAST:
      return Direction.NORTH;
    case Direction.SOUTH:
      return Direction.EAST;
    case Direction.WEST:
      return Direction.SOUTH;
    default:
      return direction;
  }
};

export const isInBounds = (x: number, y: number) => {
  return x >= -2 && x <= 2 && y >= -2 && y <= 2;
};
