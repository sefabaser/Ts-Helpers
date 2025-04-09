import { Vec2, Vector } from '../vector/vector';

export interface Rect {
  topLeft: Vec2;
  bottomRight: Vec2;
}

export class Rectangle {
  static fromRect(rect: Rect): Rectangle {
    return new Rectangle(Vector.fromVec2(rect.topLeft), Vector.fromVec2(rect.bottomRight));
  }

  readonly topLeft: Vector;
  readonly bottomRight: Vector;

  private _size: Vector | undefined;
  get size(): Vector {
    if (this._size === undefined) {
      this._size = Vector.fromTo(this.topLeft, this.bottomRight);
    }
    return this._size;
  }

  constructor(topLeft: Vector, bottomRight: Vector) {
    this.topLeft = topLeft;
    this.bottomRight = bottomRight;
  }

  toRect(): Rect {
    return { topLeft: this.topLeft.toVec2(), bottomRight: this.bottomRight.toVec2() };
  }

  isEqual(rectangle: Rectangle): boolean {
    return this.topLeft.isEqual(rectangle.topLeft) && this.bottomRight.isEqual(rectangle.bottomRight);
  }

  isValid(): boolean {
    return this.topLeft.x <= this.bottomRight.x && this.topLeft.y <= this.bottomRight.y;
  }

  isCovering(rectangle: Rectangle, options?: { includeEdges?: boolean }): boolean {
    let includeEdges = options?.includeEdges ?? true;

    if (includeEdges) {
      return (
        this.topLeft.x <= rectangle.topLeft.x &&
        this.bottomRight.x >= rectangle.bottomRight.x &&
        this.topLeft.y <= rectangle.topLeft.y &&
        this.bottomRight.y >= rectangle.bottomRight.y
      );
    } else {
      return (
        this.topLeft.x < rectangle.topLeft.x &&
        this.bottomRight.x > rectangle.bottomRight.x &&
        this.topLeft.y < rectangle.topLeft.y &&
        this.bottomRight.y > rectangle.bottomRight.y
      );
    }
  }

  isOverlapping(rectangle: Rectangle, options?: { includeEdges?: boolean }): boolean {
    let includeEdges = options?.includeEdges ?? true;

    if (includeEdges) {
      return (
        this.topLeft.x <= rectangle.bottomRight.x &&
        this.bottomRight.x >= rectangle.topLeft.x &&
        this.topLeft.y <= rectangle.bottomRight.y &&
        this.bottomRight.y >= rectangle.topLeft.y
      );
    } else {
      return (
        this.topLeft.x < rectangle.bottomRight.x &&
        this.bottomRight.x > rectangle.topLeft.x &&
        this.topLeft.y < rectangle.bottomRight.y &&
        this.bottomRight.y > rectangle.topLeft.y
      );
    }
  }

  isPointInside(point: Vec2, options?: { includeEdges?: boolean }): boolean {
    let includeEdges = options?.includeEdges ?? true;

    if (includeEdges) {
      return (
        this.topLeft.x <= point.x &&
        this.bottomRight.x >= point.x &&
        this.topLeft.y <= point.y &&
        this.bottomRight.y >= point.y
      );
    } else {
      return (
        this.topLeft.x < point.x &&
        this.bottomRight.x > point.x &&
        this.topLeft.y < point.y &&
        this.bottomRight.y > point.y
      );
    }
  }
}
