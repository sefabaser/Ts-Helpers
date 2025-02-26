import { Rectangle } from '../../geometry/shapes/rectangle';
import { Vector } from '../../geometry/vector/vector';
import { Random } from '../../random/random';

const NEIGHBORS = [new Vector(-1, 0), new Vector(0, -1), new Vector(0, 1), new Vector(1, 0)];

const DIAGONALS = [new Vector(-1, -1), new Vector(-1, 1), new Vector(1, -1), new Vector(1, 1)];

const NEIGHBORS_INCLUDING_DIAGONALS = [...NEIGHBORS, ...DIAGONALS];

export class Grid<T> {
  static createByValues<T>(values: T[][]): Grid<T> {
    let width = values[0].length;
    values.forEach(row => {
      if (row.length !== width) {
        throw new Error(`Grid: All rows must have the same length. Expected: ${width}, got: ${row.length}`);
      }
    });
    return new Grid(values);
  }

  static createNew<T>(size: Vector, defaultValue: T): Grid<T> {
    let values = Array(Math.floor(size.y))
      .fill(undefined)
      .map(() => Array(Math.floor(size.x)).fill(defaultValue));
    return new Grid<T>(values);
  }

  static getNeighborDirections(options?: { includeDiagonals: boolean }): Vector[] {
    return options?.includeDiagonals ? NEIGHBORS_INCLUDING_DIAGONALS : NEIGHBORS;
  }

  static getDiagonalNeighborDirections(): Vector[] {
    return DIAGONALS;
  }

  static vectorToNeighborDirection(vector: Vector, options?: { includeDiagonals: boolean }): Vector {
    let roundedVector = vector.normalize().round();
    if (!options?.includeDiagonals && roundedVector.x !== 0 && roundedVector.y !== 0) {
      if (Random.chance(0.5)) {
        return new Vector(0, roundedVector.y);
      } else {
        return new Vector(roundedVector.x, 0);
      }
    } else {
      return new Vector(roundedVector.x, roundedVector.y);
    }
  }

  private _size: Vector;
  private _grid: T[][];

  get size(): Vector {
    return this._size;
  }

  get width(): number {
    return this._size.x;
  }

  get height(): number {
    return this._size.y;
  }

  private constructor(values: T[][]) {
    this._size = new Vector(values[0].length, values.length);
    this._grid = values;
  }

  has(position: Vector): boolean {
    return this.isPointWithinBounds(position) && this.get(position) !== undefined;
  }

  get(position: Vector): T {
    return this._grid[position.y][position.x];
  }

  set(position: Vector, value: T): void {
    if (!this.isPointWithinBounds(position)) {
      throw new Error(`Grid: Point is outside of the grid: point: "${position}", grid-size: "${this._size}"`);
    }
    this._grid[position.y][position.x] = value;
  }

  safeSetArea(area: Rectangle, value: T): void {
    area = this.cropPartsOutsideOfTheGrid(area);
    this.setArea(area, value);
  }

  setArea(area: Rectangle, value: T): void {
    if (!this.isAreaWithinBounds(area)) {
      throw new Error(
        `Grid: Area is outside of the grid: area: "${JSON.stringify(area)}", grid-size: "${JSON.stringify(this._size)}"`
      );
    }

    for (let y = area.topLeft.y; y <= area.bottomRight.y && y < this._grid.length; y++) {
      for (let x = area.topLeft.x; x <= area.bottomRight.x && x < this._grid[y].length; x++) {
        this._grid[y][x] = value;
      }
    }
  }

  forEach(callback: (value: T, position: Vector) => void): void {
    this._grid.forEach((row, y) => row.forEach((value, x) => callback(value, new Vector(x, y))));
  }

  map<U>(callback: (value: T, position: Vector) => U): Grid<U> {
    let newValues = this._grid.map((row, y) => row.map((value, x) => callback(value, new Vector(x, y))));
    return new Grid(newValues);
  }

  isAreaWithinBounds(area: Rectangle): boolean {
    return this.isPointWithinBounds(area.topLeft) && this.isPointWithinBounds(area.bottomRight);
  }

  isPointWithinBounds(point: Vector): boolean {
    return point.x >= 0 && point.y >= 0 && point.x < this._size.x && point.y < this._size.y;
  }

  cropPartsOutsideOfTheGrid(area: Rectangle): Rectangle {
    let topLeft = this.movePositionInsideGrid(area.topLeft);
    let bottomRight = this.movePositionInsideGrid(area.bottomRight);
    return new Rectangle(topLeft, bottomRight);
  }

  moveAreaInsideGrid(area: Rectangle): Rectangle {
    let topLeft = this.movePositionInsideGrid(area.topLeft);
    let bottomRight = this.movePositionInsideGrid(area.bottomRight);
    return new Rectangle(topLeft, bottomRight);
  }

  movePositionInsideGrid(point: Vector): Vector {
    let x = Math.max(0, Math.min(this._size.x - 1, point.x));
    let y = Math.max(0, Math.min(this._size.y - 1, point.y));
    return new Vector(x, y);
  }

  getNeighborPositions(
    position: Vector,
    options: { includeDiagonals: boolean } = { includeDiagonals: false }
  ): Vector[] {
    let neighbors = options.includeDiagonals ? NEIGHBORS_INCLUDING_DIAGONALS : NEIGHBORS;
    return neighbors
      .map(neighborDirection => new Vector(position.x + neighborDirection.x, position.y + neighborDirection.y))
      .filter(neighborPosition => this.isPointWithinBounds(neighborPosition));
  }

  getDiagonalNeighborPositions(position: Vector): Vector[] {
    return DIAGONALS.map(
      neighborDirection => new Vector(position.x + neighborDirection.x, position.y + neighborDirection.y)
    ).filter(neighborPosition => this.isPointWithinBounds(neighborPosition));
  }
}
