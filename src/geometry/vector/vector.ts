import { PI_360, PI_90, PI_180, Radian } from '../radian/radian';
import { Rectangle } from '../shapes/rectangle';

export interface Vec2 {
  readonly x: number;
  readonly y: number;
}

export interface VectorCache {
  length?: number;
  radian?: Radian;
}

// Each "new Vector()" should consider the cache and have "Cache" comments.
export class Vector {
  // Cache - length: Known, equals to zero.
  // Cache - radion: If anyone gets the radion of the vector, it will set the cache for all requests. There is no need to cache beforehand.
  static zero = new Vector(0, 0, { length: 0, radian: undefined });

  static fromVec2(vector: Vec2): Vector {
    // Cache - length: Unknown, requires calculation.
    // Cache - radian: Unknown, requires calculation.
    return new Vector(vector.x, vector.y);
  }

  static random(length: number = 1): Vector {
    let radian = Radian.random();
    // Cache - length: Known, it is assigned.
    // Cache - radian: Known, it is assigned.
    return new Vector(Math.sin(radian.value) * length, -Math.cos(radian.value) * length, { length, radian });
  }

  static isEqual(vector1: Vector | undefined, vector2: Vector | undefined): boolean {
    if (!vector1 || !vector2) {
      return false;
    } else {
      return vector1.isEqual(vector2);
    }
  }

  static fromTo(from: Vector, to: Vector): Vector {
    // Cache - length: Unknown, requires calculation.
    // Cache - radian: Unknown, requires calculation.
    return new Vector(to.x - from.x, to.y - from.y);
  }

  readonly x: number;
  readonly y: number;

  private cache: VectorCache;

  get length(): number {
    if (this.cache.length === undefined) {
      this.cache.length = this.getLength();
    }
    return this.cache.length;
  }

  get radian(): Radian {
    if (this.cache.radian === undefined) {
      this.cache.radian = this.getRadian();
    }
    return this.cache.radian;
  }

  constructor(x: number, y: number, cache?: VectorCache) {
    this.x = x;
    this.y = y;
    this.cache = cache ?? { length: undefined, radian: undefined };
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
    // Cache - length: Unknown, requires calculation.
    // Cache - radian: Unknown, requires calculation.
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  fromTo(vector: Vector): Vector {
    return Vector.fromTo(this, vector);
  }

  subtract(vector: Vector): Vector {
    // Cache - length: Unknown, requires calculation.
    // Cache - radian: Unknown, requires calculation.
    return new Vector(this.x - vector.x, this.y - vector.y);
  }

  multiply(vector: Vector): Vector {
    // Cache - length: Unknown, requires calculation.
    // Cache - radian: Unknown, requires calculation.
    return new Vector(this.x * vector.x, this.y * vector.y);
  }

  multiplyNumber(multiplier: number): Vector {
    // Cache - length: Unknown, requires calculation.
    // Cache - radian: Known, stays the same.
    return new Vector(this.x * multiplier, this.y * multiplier, { radian: this.cache.radian });
  }

  divide(vector: Vector): Vector {
    // Cache - length: Unknown, requires calculation.
    // Cache - radian: Unknown, requires calculation.
    return new Vector(this.x / vector.x, this.y / vector.y);
  }

  divideNumber(divider: number): Vector {
    // Cache - length: Unknown, requires calculation.
    // Cache - radian: Known, stays the same.
    return new Vector(this.x / divider, this.y / divider, { radian: this.cache.radian });
  }

  round(): Vector {
    // Cache - length: Unknown, requires calculation.
    // Cache - radian: Unknown, requires calculation.
    return new Vector(Math.round(this.x), Math.round(this.y));
  }

  floor(): Vector {
    // Cache - length: Unknown, requires calculation.
    // Cache - radian: Unknown, requires calculation.
    return new Vector(Math.floor(this.x), Math.floor(this.y));
  }

  ceil(): Vector {
    // Cache - length: Unknown, requires calculation.
    // Cache - radian: Unknown, requires calculation.
    return new Vector(Math.ceil(this.x), Math.ceil(this.y));
  }

  /**
   * Rotates vector with the degree that is represented by given vector.
   * @param vector Rotation vector. Should have been normalized.
   * @param normalize If it is known that the given vector is already normalized, this option skips the normalization process.
   * @returns Rotation result
   */
  rotate(vector: Vector, normalize: boolean = true): Vector {
    if (normalize) {
      vector = vector.normalize();
    }
    // Cache - length: Unknown, because it is not guaranteed that the given vector is normalized.
    // Cache - radian: Unknown, requires calculation.
    return new Vector(-this.x * vector.y - this.y * vector.x, this.x * vector.x - this.y * vector.y);
  }

  normalize(value: number = 1): Vector {
    let length = this.length;
    if (length === value) {
      return this;
    } else if (length === 0 || value === 0) {
      return Vector.zero;
    } else {
      length = length / value;
      // Cache - length: Known, because the length is given.
      // Cache - radian: Known, stays the same.
      return new Vector(this.x / length, this.y / length, { length: value, radian: this.cache.radian });
    }
  }

  /**
   * Drops the "shadow" of the vector on the given vector.
   * @param vector The line that the vector will be projected on. Should have been normalized.
   * @returns The projection
   */
  projection(vector: Vector): Vector {
    let vectorLength = vector.length;
    if (vectorLength === 0) {
      return Vector.zero;
    }

    let dotProduct = this.dotProduct(vector);
    let multiplier = dotProduct / (vectorLength * vectorLength);
    // Cache - length: Unknown, requires calculation.
    // Cache - radian: Known, it is equal to the radian of the given vector.
    return new Vector(vector.x * multiplier, vector.y * multiplier, { radian: vector.cache.radian });
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
        // Cache - length: Known, calculated.
        // Cache - radian: Known, stays the same.
        return new Vector(this.x / length, this.y / length, { length, radian: this.cache.radian });
      }
    } else {
      return this;
    }
  }

  lerp(vector: Vector, ratio: number): Vector {
    // Cache - length: Unknown, requires calculation.
    // Cache - radian: Unknown, requires calculation.
    return new Vector(this.x + (vector.x - this.x) * ratio, this.y + (vector.y - this.y) * ratio);
  }

  private getLength(): number {
    return Math.hypot(this.x, this.y);
  }

  private getRadian(): Radian {
    let radian = Math.atan2(this.y, this.x) + PI_90;
    // Cache - vector: Known, equal to this vector.
    // Cache - alreadyNormalized: Unknown, requires calculation.
    return new Radian(radian, { vector: this, alreadyNormalized: false });
  }
}
