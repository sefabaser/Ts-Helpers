import { Vec2 } from '../vector/vector';

export interface Rectangle {
  topLeft: Vec2;
  bottomRight: Vec2;
}

export class RectangleHelper {
  static isEqual(a: Rectangle, b: Rectangle): boolean {
    return (
      a.topLeft.x === b.topLeft.x &&
      a.topLeft.y === b.topLeft.y &&
      a.bottomRight.x === b.bottomRight.x &&
      a.bottomRight.y === b.bottomRight.y
    );
  }
}
