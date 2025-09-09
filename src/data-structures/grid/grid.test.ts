import { beforeEach, describe, expect, test } from 'vitest';

import { Rectangle } from '../../geometry/shapes/rectangle';
import { Vector } from '../../geometry/vector/vector';
import { Grid, GridNeighborType } from './grid';

describe('Grid', () => {
  let grid: Grid<boolean>;

  beforeEach(() => {
    grid = new Grid({ size: new Vector(3, 3), defaultValue: true });
  });

  test('should be defined', () => {
    expect(grid).toBeDefined();
  });

  test('should create a grid from an array', () => {
    grid = new Grid([
      [true, false],
      [false, true]
    ]);
    expect(grid.get(new Vector(0, 0))).toBeTruthy();
    expect(grid.get(new Vector(1, 0))).toBeFalsy();
  });

  test('should set and get values', () => {
    grid.setArea(new Rectangle(new Vector(0, 0), new Vector(1, 1)), false);
    expect(grid.get(new Vector(0, 0))).toBeFalsy();
    expect(grid.get(new Vector(0, 1))).toBeFalsy();
    expect(grid.get(new Vector(1, 0))).toBeFalsy();
    expect(grid.get(new Vector(1, 1))).toBeFalsy();
  });

  test('trying to get a value that is outside of the grid', () => {
    expect(grid.get(new Vector(3, 3))).toEqual(undefined);
    expect(grid.get(new Vector(-1, 3))).toEqual(undefined);
    expect(grid.get(new Vector(1, -3))).toEqual(undefined);
  });

  test('should throw an error if area is outside of the grid', () => {
    expect(() => grid.setAreaOrFail(new Rectangle(new Vector(0, 0), new Vector(3, 3)), false)).toThrow();
  });

  test('should crop area outside of the grid 1', () => {
    expect(grid.cropAreaOutsideOfTheGrid(new Rectangle(new Vector(-1, -1), new Vector(3, 3))).toRect()).toStrictEqual({
      topLeft: { x: 0, y: 0 },
      bottomRight: { x: 2, y: 2 }
    });
  });

  test('should crop area outside of the grid 2', () => {
    expect(grid.cropAreaOutsideOfTheGrid(new Rectangle(new Vector(3, 3), new Vector(4, 4))).toRect()).toStrictEqual({
      topLeft: { x: 2, y: 2 },
      bottomRight: { x: 2, y: 2 }
    });
  });

  test('should crop area outside of the grid 2', () => {
    expect(grid.cropAreaOutsideOfTheGrid(new Rectangle(new Vector(-1, -1), new Vector(-1, -1))).toRect()).toStrictEqual({
      topLeft: { x: 0, y: 0 },
      bottomRight: { x: 0, y: 0 }
    });
  });

  test('should check if area is within bounds', () => {
    expect(grid.isAreaWithinBounds(new Rectangle(new Vector(0, 0), new Vector(1, 1)))).toBeTruthy();
    expect(grid.isAreaWithinBounds(new Rectangle(new Vector(0, 0), new Vector(3, 3)))).toBeFalsy();
  });

  test('should check if point is within bounds', () => {
    expect(grid.isPointWithinBounds(new Vector(0, 0))).toBeTruthy();
    expect(grid.isPointWithinBounds(new Vector(1, 1))).toBeTruthy();
    expect(grid.isPointWithinBounds(new Vector(3, 3))).toBeFalsy();
  });

  test('should set area within bounds', () => {
    grid.setArea(new Rectangle(new Vector(0, 0), new Vector(3, 3)), false);
    expect(grid.get(new Vector(0, 0))).toBeFalsy();
    expect(grid.get(new Vector(0, 1))).toBeFalsy();
    expect(grid.get(new Vector(1, 0))).toBeFalsy();
    expect(grid.get(new Vector(1, 1))).toBeFalsy();
  });

  test('should iterate over all values', () => {
    grid.setArea(new Rectangle(new Vector(1, 0), new Vector(1, 1)), false);

    let values: { value: boolean; position: Vector }[] = [];
    grid.forEach((value, position) => values.push({ value, position }));
    expect(values.map(item => ({ value: item.value, position: item.position.toVec2() }))).toStrictEqual([
      { value: true, position: { x: 0, y: 0 } },
      { value: false, position: { x: 1, y: 0 } },
      { value: true, position: { x: 2, y: 0 } },
      { value: true, position: { x: 0, y: 1 } },
      { value: false, position: { x: 1, y: 1 } },
      { value: true, position: { x: 2, y: 1 } },
      { value: true, position: { x: 0, y: 2 } },
      { value: true, position: { x: 1, y: 2 } },
      { value: true, position: { x: 2, y: 2 } }
    ]);
  });

  test('should map over all values', () => {
    grid.setArea(new Rectangle(new Vector(1, 0), new Vector(1, 1)), false);

    let newGrid = grid.map<number>((value, position) => (position.x + position.y) * (value ? 1 : -1));

    expect(newGrid.get(new Vector(0, 0))).toBe(0);
    expect(newGrid.get(new Vector(1, 0))).toBe(-1);
    expect(newGrid.get(new Vector(2, 0))).toBe(2);
    expect(newGrid.get(new Vector(0, 1))).toBe(1);
    expect(newGrid.get(new Vector(1, 1))).toBe(-2);
    expect(newGrid.get(new Vector(2, 1))).toBe(3);
    expect(newGrid.get(new Vector(0, 2))).toBe(2);
    expect(newGrid.get(new Vector(1, 2))).toBe(3);
    expect(newGrid.get(new Vector(2, 2))).toBe(4);

    expect(newGrid.size.toVec2()).toStrictEqual({ x: 3, y: 3 });
  });

  test('should return neighbor positions only adjacent', () => {
    expect(grid.getNeighborPositions(new Vector(1, 1), GridNeighborType.ORTOGONAL).map(item => item.toVec2())).toStrictEqual([
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: 2 },
      { x: 2, y: 1 }
    ]);
  });

  test('should return neighbor positions with diagonals', () => {
    expect(grid.getNeighborPositions(new Vector(1, 1), GridNeighborType.ALL).map(item => item.toVec2())).toStrictEqual([
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: 0, y: 0 },
      { x: 0, y: 2 },
      { x: 2, y: 0 },
      { x: 2, y: 2 }
    ]);
  });

  test('should return neighbor positions only adjacent at the edge', () => {
    expect(grid.getNeighborPositions(new Vector(2, 2), GridNeighborType.ORTOGONAL).map(item => item.toVec2())).toStrictEqual([
      { x: 1, y: 2 },
      { x: 2, y: 1 }
    ]);
  });

  test('should return neighbor positions at the edge with diagonals', () => {
    expect(grid.getNeighborPositions(new Vector(0, 0), GridNeighborType.ALL).map(item => item.toVec2())).toStrictEqual([
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 }
    ]);
  });
});
