import { beforeEach, describe, expect, test } from 'vitest';

import { Rectangle } from '../../geometry/shapes/rectangle';
import { Vector } from '../../geometry/vector/vector';
import { Grid } from './grid';

describe('Grid', () => {
  let grid: Grid<boolean>;

  beforeEach(() => {
    grid = Grid.createNew(new Vector(3, 3), true);
  });

  test('should be defined', () => {
    expect(grid).toBeDefined();
  });

  test('should set and get values', () => {
    grid.setArea(new Rectangle(new Vector(0, 0), new Vector(1, 1)), false);
    expect(grid.get(new Vector(0, 0))).toBeFalsy();
    expect(grid.get(new Vector(0, 1))).toBeFalsy();
    expect(grid.get(new Vector(1, 0))).toBeFalsy();
    expect(grid.get(new Vector(1, 1))).toBeFalsy();
  });

  test('should throw an error if area is outside of the grid', () => {
    expect(() => grid.setArea(new Rectangle(new Vector(0, 0), new Vector(3, 3)), false)).toThrow();
  });

  test('should crop area outside of the grid 1', () => {
    expect(grid.cropPartsOutsideOfTheGrid(new Rectangle(new Vector(-1, -1), new Vector(3, 3))).toRect()).toStrictEqual({
      topLeft: { x: 0, y: 0 },
      bottomRight: { x: 2, y: 2 }
    });
  });

  test('should crop area outside of the grid 2', () => {
    expect(grid.cropPartsOutsideOfTheGrid(new Rectangle(new Vector(3, 3), new Vector(4, 4))).toRect()).toStrictEqual({
      topLeft: { x: 2, y: 2 },
      bottomRight: { x: 2, y: 2 }
    });
  });

  test('should crop area outside of the grid 2', () => {
    expect(
      grid.cropPartsOutsideOfTheGrid(new Rectangle(new Vector(-1, -1), new Vector(-1, -1))).toRect()
    ).toStrictEqual({
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
    grid.safeSetArea(new Rectangle(new Vector(0, 0), new Vector(3, 3)), false);
    expect(grid.get(new Vector(0, 0))).toBeFalsy();
    expect(grid.get(new Vector(0, 1))).toBeFalsy();
    expect(grid.get(new Vector(1, 0))).toBeFalsy();
    expect(grid.get(new Vector(1, 1))).toBeFalsy();
  });

  test('should return neighbor positions only adjacent', () => {
    expect(grid.getNeighborPositions(new Vector(1, 1)).map(item => item.toVec2())).toStrictEqual([
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: 2 },
      { x: 2, y: 1 }
    ]);
  });

  test('should return neighbor positions with diagonals', () => {
    expect(
      grid.getNeighborPositions(new Vector(1, 1), { includeDiagonals: true }).map(item => item.toVec2())
    ).toStrictEqual([
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
    expect(grid.getNeighborPositions(new Vector(2, 2)).map(item => item.toVec2())).toStrictEqual([
      { x: 1, y: 2 },
      { x: 2, y: 1 }
    ]);
  });

  test('should return neighbor positions at the edge with diagonals', () => {
    expect(
      grid.getNeighborPositions(new Vector(0, 0), { includeDiagonals: true }).map(item => item.toVec2())
    ).toStrictEqual([
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 }
    ]);
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

  test('should find the neighbor direction from a vector', () => {
    expect(Grid.vectorToNeighborDirection(new Vector(0, 1)).toVec2()).toStrictEqual({ x: 0, y: 1 });
    expect(Grid.vectorToNeighborDirection(new Vector(1, 0)).toVec2()).toStrictEqual({ x: 1, y: 0 });
    expect(Grid.vectorToNeighborDirection(new Vector(0, -1)).toVec2()).toStrictEqual({ x: 0, y: -1 });
    expect(Grid.vectorToNeighborDirection(new Vector(-1, 0)).toVec2()).toStrictEqual({ x: -1, y: 0 });

    expect(Grid.vectorToNeighborDirection(new Vector(0.5, 2)).toVec2()).toStrictEqual({ x: 0, y: 1 });
    expect(Grid.vectorToNeighborDirection(new Vector(2, -0.5)).toVec2()).toStrictEqual({ x: 1, y: -0 });
    expect(Grid.vectorToNeighborDirection(new Vector(0.5, -2)).toVec2()).toStrictEqual({ x: 0, y: -1 });
    expect(Grid.vectorToNeighborDirection(new Vector(-2, -0.5)).toVec2()).toStrictEqual({ x: -1, y: -0 });

    let middle = Grid.vectorToNeighborDirection(new Vector(1, 1));
    expect(Vector.isEqual(middle, new Vector(0, 1)) || Vector.isEqual(middle, new Vector(1, 0))).toBeTruthy();
  });

  test('should find the neighbor direction with diagonals from a vector', () => {
    expect(Grid.vectorToNeighborDirection(new Vector(0, 1), { includeDiagonals: true }).toVec2()).toStrictEqual({
      x: 0,
      y: 1
    });
    expect(Grid.vectorToNeighborDirection(new Vector(1, 1), { includeDiagonals: true }).toVec2()).toStrictEqual({
      x: 1,
      y: 1
    });
    expect(Grid.vectorToNeighborDirection(new Vector(-1, -1), { includeDiagonals: true }).toVec2()).toStrictEqual({
      x: -1,
      y: -1
    });
    expect(Grid.vectorToNeighborDirection(new Vector(2, 1), { includeDiagonals: true }).toVec2()).toStrictEqual({
      x: 1,
      y: 0
    });
  });
});
