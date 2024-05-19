import { Radian } from '../radian/radian';
import { Rectangle } from '../shapes/rectangle';

export interface Vec2 {
  readonly x: number;
  readonly y: number;
}

export interface Vec3 {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export class Vector {
  static zero = new Vector(0, 0);

  static fromVec2(vector: Vec2): Vector {
    return new Vector(vector.x, vector.y);
  }

  static random(length: number = 1): Vector {
    let randomRadian = Math.random() * 2 * Math.PI;
    return new Vector(Math.cos(randomRadian) * length, Math.sin(randomRadian) * length);
  }

  static isEqual(vector1: Vector | undefined, vector2: Vector | undefined): boolean {
    if (!vector1 || !vector2) {
      return false;
    } else {
      return vector1.isEqual(vector2);
    }
  }

  static fromTo(from: Vector, to: Vector): Vector {
    return new Vector(to.x - from.x, to.y - from.y);
  }

  readonly x: number;
  readonly y: number;

  private _length: number | undefined;
  get length(): number {
    if (this._length === undefined) {
      this._length = Math.hypot(this.x, this.y);
    }
    return this._length;
  }

  private _radian: number | undefined;
  get radian(): number {
    if (this._radian === undefined) {
      let radian = Math.atan2(this.y, this.x) + Radian.get90;
      this._radian = radian > Radian.get180 ? radian - Radian.get360 : radian;
    }
    return this._radian;
  }

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  isEqual(vector: Vector | undefined): boolean {
    if (!vector) {
      return false;
    } else {
      return this.x === vector.x && this.y === vector.y;
    }
  }

  isZero(): boolean {
    return this.x === 0 && this.y === 0;
  }

  isInsideRectangle(rectangle: Rectangle): boolean {
    return (
      this.x >= rectangle.topLeft.x &&
      this.x <= rectangle.bottomRight.x &&
      this.y >= rectangle.topLeft.y &&
      this.y <= rectangle.bottomRight.y
    );
  }

  toVec2(): Vec2 {
    return { x: this.x, y: this.y };
  }

  add(vector: Vector): Vector {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  fromTo(vector: Vector): Vector {
    return Vector.fromTo(this, vector);
  }

  multiply(multiplier: number): Vector {
    return new Vector(this.x * multiplier, this.y * multiplier);
  }

  divide(divider: number): Vector {
    return new Vector(this.x / divider, this.y / divider);
  }

  round(): Vector {
    return new Vector(Math.round(this.x), Math.round(this.y));
  }

  floor(): Vector {
    return new Vector(Math.floor(this.x), Math.floor(this.y));
  }

  ceil(): Vector {
    return new Vector(Math.ceil(this.x), Math.ceil(this.y));
  }

  /**
   * Rotates vector with the degree that is represented by given vector.
   * @param vector Rotation vector
   * @param normalize If it is known that the given vector is already normalized, this option skips the normalization process.
   * @returns Rotation result
   */
  rotate(vector: Vector, normalize: boolean = true): Vector {
    if (normalize) {
      vector = vector.normalize();
    }
    return new Vector(-this.x * vector.y - this.y * vector.x, this.x * vector.x - this.y * vector.y);
  }

  normalize(value: number = 1): Vector {
    let length = this.length;
    if (length === 0 || value === 0) {
      return Vector.zero;
    } else {
      length = length / value;
      return new Vector(this.x / length, this.y / length);
    }
  }

  projection(vector: Vector): Vector {
    let vectorLength = vector.length;
    if (vectorLength === 0) {
      return Vector.zero;
    }

    let dotProduct = this.dotProduct(vector);
    let multiplier = dotProduct / (vectorLength * vectorLength);
    return new Vector(vector.x * multiplier, vector.y * multiplier);
  }

  dotProduct(vector: Vector): number {
    return this.x * vector.x + this.y * vector.y;
  }

  getDistance(vector: Vector): number {
    return this.fromTo(vector).length;
  }

  ensureMaxLength(maxLength: number): Vector {
    let length = this.length;
    if (length > maxLength) {
      if (length === 0 || maxLength === 0) {
        return Vector.zero;
      } else {
        length = length / maxLength;
        return new Vector(this.x / length, this.y / length);
      }
    } else {
      return this;
    }
  }

  lerp(vector: Vector, ratio: number): Vector {
    return new Vector(this.x + (vector.x - this.x) * ratio, this.y + (vector.y - this.y) * ratio);
  }
}
