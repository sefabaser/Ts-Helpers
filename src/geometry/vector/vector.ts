import { PI_90, Radian } from '../radian/radian';
import type { Rectangle } from '../shapes/rectangle';

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
  // Cache - radian: If anyone gets the radian of the vector, it will set the cache for all requests. There is no need to cache beforehand.
  static zero = new Vector(0, 0, { length: 0, radian: undefined });

  // Cache - length: Known
  // Cache - radian: If anyone gets the radian of the vector, it will set the cache for all requests. There is no need to cache beforehand.
  static half = new Vector(0.5, 0.5, { length: 0.7071068, radian: undefined });

  // Cache - length: Known
  // Cache - radian: If anyone gets the radian of the vector, it will set the cache for all requests. There is no need to cache beforehand.
  static one = new Vector(1, 1, { length: 1.4142136, radian: undefined });

  static fromVec2(vector: Vec2): Vector {
    // Cache - length: Unknown, requires calculation.
    // Cache - radian: Unknown, requires calculation.
    return new Vector(vector.x, vector.y);
  }

  static random(length = 1): Vector {
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

  private _cache: VectorCache;

  get length(): number {
    if (this._cache.length === undefined) {
      this._cache.length = this._getLength();
    }
    return this._cache.length;
  }

  get radian(): Radian {
    if (this._cache.radian === undefined) {
      this._cache.radian = this._getRadian();
    }
    return this._cache.radian;
  }

  constructor(x: number, y: number, cache?: VectorCache) {
    this.x = x;
    this.y = y;
    this._cache = cache ?? { length: undefined, radian: undefined };
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

  addNumber(value: number): Vector {
    // Cache - length: Unknown, requires calculation.
    // Cache - radian: Unknown, requires calculation.
    return new Vector(this.x + value, this.y + value);
  }

  subtract(vector: Vector): Vector {
    // Cache - length: Unknown, requires calculation.
    // Cache - radian: Unknown, requires calculation.
    return new Vector(this.x - vector.x, this.y - vector.y);
  }

  subtractNumber(value: number): Vector {
    // Cache - length: Unknown, requires calculation.
    // Cache - radian: Unknown, requires calculation.
    return new Vector(this.x - value, this.y - value);
  }

  to(vector: Vector): Vector {
    return Vector.fromTo(this, vector);
  }

  multiply(vector: Vector): Vector {
    // Cache - length: Unknown, requires calculation.
    // Cache - radian: Unknown, requires calculation.
    return new Vector(this.x * vector.x, this.y * vector.y);
  }

  multiplyNumber(multiplier: number): Vector {
    // Cache - length: Unknown, requires calculation.
    // Cache - radian: Known, stays the same.
    return new Vector(this.x * multiplier, this.y * multiplier, { radian: this._cache.radian });
  }

  divide(vector: Vector): Vector {
    // Cache - length: Unknown, requires calculation.
    // Cache - radian: Unknown, requires calculation.
    return new Vector(this.x / vector.x, this.y / vector.y);
  }

  divideNumber(divider: number): Vector {
    // Cache - length: Unknown, requires calculation.
    // Cache - radian: Known, stays the same.
    return new Vector(this.x / divider, this.y / divider, { radian: this._cache.radian });
  }

  round(options?: { rollHalfsDown?: boolean }): Vector {
    // Cache - length: Unknown, requires calculation.
    // Cache - radian: Unknown, requires calculation.
    let rollHalfsDown = options?.rollHalfsDown ?? false;
    if (rollHalfsDown) {
      let x = Math.abs(this.x % 1) === 0.5 ? this.x - 0.5 : this.x;
      let y = Math.abs(this.y % 1) === 0.5 ? this.y - 0.5 : this.y;
      return new Vector(Math.round(x), Math.round(y));
    } else {
      return new Vector(Math.round(this.x), Math.round(this.y));
    }
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
  rotate(vector: Vector, normalize = true): Vector {
    if (normalize) {
      vector = vector.normalize();
    }
    // Cache - length: Unknown, because it is not guaranteed that the given vector is normalized.
    // Cache - radian: Unknown, requires calculation.
    return new Vector(-this.x * vector.y - this.y * vector.x, this.x * vector.x - this.y * vector.y);
  }

  normalize(value = 1): Vector {
    let length = this.length;
    if (length === value) {
      return this;
    } else if (length === 0 || value === 0) {
      return Vector.zero;
    } else {
      length = length / value;
      // Cache - length: Known, because the length is given.
      // Cache - radian: Known, stays the same.
      return new Vector(this.x / length, this.y / length, { length: value, radian: this._cache.radian });
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
    return new Vector(vector.x * multiplier, vector.y * multiplier, { radian: vector._cache.radian });
  }

  dotProduct(vector: Vector): number {
    return this.x * vector.x + this.y * vector.y;
  }

  getDistance(vector: Vector): number {
    return this.to(vector).length;
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
        return new Vector(this.x / length, this.y / length, { length, radian: this._cache.radian });
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

  private _getLength(): number {
    return Math.hypot(this.x, this.y);
  }

  private _getRadian(): Radian {
    let radian = Math.atan2(this.y, this.x) + PI_90;
    // Cache - vector: Known, equal to this vector.
    // Cache - alreadyNormalized: Unknown, requires calculation.
    return new Radian(radian, { vector: this, alreadyNormalized: false });
  }
}
