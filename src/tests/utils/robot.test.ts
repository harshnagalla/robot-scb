import { Direction } from "@/types/robot";
import {
  getLeftDirection,
  getNextPosition,
  getRightDirection,
  isInBounds,
} from "@/utils/robot";

describe("getNextPosition", () => {
  it("should return the correct position for NORTH direction", () => {
    const result = getNextPosition(1, 1, Direction.NORTH);
    expect(result).toEqual({ x: 0, y: 1 });
  });

  it("should return the correct position for EAST direction", () => {
    const result = getNextPosition(1, 1, Direction.EAST);
    expect(result).toEqual({ x: 1, y: 2 });
  });

  it("should return the correct position for SOUTH direction", () => {
    const result = getNextPosition(1, 1, Direction.SOUTH);
    expect(result).toEqual({ x: 2, y: 1 });
  });

  it("should return the correct position for WEST direction", () => {
    const result = getNextPosition(1, 1, Direction.WEST);
    expect(result).toEqual({ x: 1, y: 0 });
  });

  it("should return the same position for an invalid direction", () => {
    const result = getNextPosition(1, 1, "invalid" as Direction);
    expect(result).toEqual({ x: 1, y: 1 });
  });
});

describe("getRightDirection", () => {
  it("should return the correct direction when turning right from NORTH", () => {
    const result = getRightDirection(Direction.NORTH);
    expect(result).toEqual(Direction.EAST);
  });

  it("should return the correct direction when turning right from EAST", () => {
    const result = getRightDirection(Direction.EAST);
    expect(result).toEqual(Direction.SOUTH);
  });

  it("should return the correct direction when turning right from SOUTH", () => {
    const result = getRightDirection(Direction.SOUTH);
    expect(result).toEqual(Direction.WEST);
  });

  it("should return the correct direction when turning right from WEST", () => {
    const result = getRightDirection(Direction.WEST);
    expect(result).toEqual(Direction.NORTH);
  });

  it("should return the same direction for an invalid direction", () => {
    const result = getRightDirection("invalid" as Direction);
    expect(result).toEqual("invalid");
  });
});

describe("getLeftDirection", () => {
  it("should return the correct direction when turning left from NORTH", () => {
    const result = getLeftDirection(Direction.NORTH);
    expect(result).toEqual(Direction.WEST);
  });

  it("should return the correct direction when turning left from EAST", () => {
    const result = getLeftDirection(Direction.EAST);
    expect(result).toEqual(Direction.NORTH);
  });

  it("should return the correct direction when turning left from SOUTH", () => {
    const result = getLeftDirection(Direction.SOUTH);
    expect(result).toEqual(Direction.EAST);
  });

  it("should return the correct direction when turning left from WEST", () => {
    const result = getLeftDirection(Direction.WEST);
    expect(result).toEqual(Direction.SOUTH);
  });

  it("should return the same direction for an invalid direction", () => {
    const result = getLeftDirection("invalid" as Direction);
    expect(result).toEqual("invalid");
  });
});

describe("isInBounds", () => {
  test("returns true when x and y are within bounds", () => {
    expect(isInBounds(0, 0)).toBe(true);
    expect(isInBounds(1, -1)).toBe(true);
    expect(isInBounds(-2, 2)).toBe(true);
  });

  test("returns false when x and y are outside bounds", () => {
    expect(isInBounds(3, 0)).toBe(false);
    expect(isInBounds(0, -3)).toBe(false);
    expect(isInBounds(-3, -3)).toBe(false);
  });

  test("returns false when only x or only y is outside bounds", () => {
    expect(isInBounds(2, 3)).toBe(false);
    expect(isInBounds(-3, 2)).toBe(false);
    expect(isInBounds(2, -3)).toBe(false);
  });
});
