import { Comparator } from '../../comparator/comparator';
import { Rectangle } from '../../geometry/shapes/rectangle';
import { Vector } from '../../geometry/vector/vector';

const ORTOGONALS = [new Vector(-1, 0), new Vector(0, -1), new Vector(0, 1), new Vector(1, 0)];
const DIAGONALS = [new Vector(-1, -1), new Vector(-1, 1), new Vector(1, -1), new Vector(1, 1)];
const ALL_NEIGHBORS = [...ORTOGONALS, ...DIAGONALS];

export enum GridNeighborType {
  Ortogonal = 1,
  Diagonal,
  All
}

export class Grid<T> {
  static create<S>(size: Vector, callback: (position: Vector) => S): Grid<S> {
    return new Grid({ size, defaultValue: undefined }).map((_, position) => callback(position));
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

  constructor(createFrom: T[][] | { size: Vector; defaultValue: T }) {
    if (Comparator.isArray(createFrom)) {
      this._size = new Vector(createFrom[0].length, createFrom.length);
      this._grid = createFrom;
    } else {
      if (!Comparator.isInteger(createFrom.size.x) || !Comparator.isInteger(createFrom.size.y)) {
        throw new Error(`Grid: Size has to be integer: size: "${createFrom.size}"`);
      } else if (createFrom.size.x < 0 || createFrom.size.y < 0) {
        throw new Error(`Grid: Size has to be positive: size: "${createFrom.size}"`);
      }

      this._size = createFrom.size;
      this._grid = new Array(createFrom.size.y)
        .fill(undefined)
        .map(() => new Array(createFrom.size.x).fill(createFrom.defaultValue));
    }
  }

  // ------------- GETTERS -------------
  has(position: Vector): boolean {
    this._validatePoint(position);
    return this.get(position) !== undefined;
  }

  get(position: Vector): T | undefined {
    return this._grid[position.y]?.[position.x];
  }

  getOrFail(position: Vector): T {
    this._validatePoint(position);
    return this._grid[position.y][position.x];
  }

  getNeighbors(position: Vector, type: GridNeighborType): T[] {
    let neighborPositions = this.getNeighborPositions(position, type);
    return neighborPositions.map(neighborPosition => this.get(neighborPosition)!);
  }

  getNeighborPositions(position: Vector, type: GridNeighborType): Vector[] {
    return this.getNeighborDirections(position, type).map(direction => position.add(direction));
  }

  getNeighborDirections(position: Vector, type: GridNeighborType): Vector[] {
    this._validatePoint(position);
    let directions = this._neighborTypeToDirections(type);

    if (position.y === 0) {
      directions = directions.filter(direction => direction.y !== -1);
    }

    if (position.y === this._size.y - 1) {
      directions = directions.filter(direction => direction.y !== 1);
    }

    if (position.x === 0) {
      directions = directions.filter(direction => direction.x !== -1);
    }

    if (position.x === this._size.x - 1) {
      directions = directions.filter(direction => direction.x !== 1);
    }
    return directions;
  }

  snapshot(): T[][] {
    return this._grid.map(row => [...row]);
  }

  // ------------- SETTERS -------------
  set(position: Vector, value: T): void {
    this._validatePoint(position);
    this._grid[position.y][position.x] = value;
  }

  setArea(area: Rectangle, value: T): void {
    area = this.cropAreaOutsideOfTheGrid(area);
    this._internalSetArea(area, value);
  }

  setAreaOrFail(area: Rectangle, value: T): void {
    this._validateArea(area);
    this._internalSetArea(area, value);
  }

  private _internalSetArea(area: Rectangle, value: T): void {
    for (let y = area.topLeft.y; y <= area.bottomRight.y && y < this._grid.length; y++) {
      for (let x = area.topLeft.x; x <= area.bottomRight.x && x < this._grid[y].length; x++) {
        this._grid[y][x] = value;
      }
    }
  }

  // ------------- ITERATIONS -------------
  forEach(callback: (value: T, position: Vector) => void): void {
    this._grid.forEach((row, y) => row.forEach((value, x) => callback(value, new Vector(x, y))));
  }

  map<U>(callback: (value: T, position: Vector) => U): Grid<U> {
    let newValues = this._grid.map((row, y) => row.map((value, x) => callback(value, new Vector(x, y))));
    return new Grid(newValues);
  }

  toArray(): T[][] {
    return this._grid.map(row => row.map(value => value));
  }

  // ------------- CONTROLS -------------
  private _validateArea(area: Rectangle): void {
    this._validatePoint(area.topLeft);
    this._validatePoint(area.bottomRight);
  }

  private _validatePoint(point: Vector): void {
    if (!Comparator.isInteger(point.x) || !Comparator.isInteger(point.y)) {
      throw new Error(`Grid: Point values has to be integer: point: "${point}"`);
    }

    if (!this.isPointWithinBounds(point)) {
      throw new Error(`Grid: Point is outside of the grid: point: "${point}", grid-size: "${this._size}"`);
    }
  }

  isAreaWithinBounds(area: Rectangle): boolean {
    return this.isPointWithinBounds(area.topLeft) && this.isPointWithinBounds(area.bottomRight);
  }

  isPointWithinBounds(point: Vector): boolean {
    return point.x >= 0 && point.y >= 0 && point.x < this._size.x && point.y < this._size.y;
  }

  // ------------- BOUNDARY HELPERS -------------
  cropAreaOutsideOfTheGrid(area: Rectangle): Rectangle {
    let topLeft = this.movePositionInsideGrid(area.topLeft);
    let bottomRight = this.movePositionInsideGrid(area.bottomRight);
    return new Rectangle(topLeft, bottomRight);
  }

  movePositionInsideGrid(point: Vector): Vector {
    let x = Math.round(point.x);
    let y = Math.round(point.y);

    x = Math.max(0, Math.min(this._size.x - 1, x));
    y = Math.max(0, Math.min(this._size.y - 1, y));

    return new Vector(x, y);
  }

  // ------------- DIRECTION HELPERS -------------
  private _neighborTypeToDirections(type: GridNeighborType): Vector[] {
    return type === GridNeighborType.Ortogonal ? ORTOGONALS : type === GridNeighborType.Diagonal ? DIAGONALS : ALL_NEIGHBORS;
  }
}
