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

  isEqual(rectangle: Rectangle): boolean {
    return this.topLeft.isEqual(rectangle.topLeft) && this.bottomRight.isEqual(rectangle.bottomRight);
  }

  isValid(): boolean {
    return this.topLeft.x <= this.bottomRight.x && this.topLeft.y <= this.bottomRight.y;
  }
}
