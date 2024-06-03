import { NumberHelper } from '../../number-helper/number-helper';
import { Vector } from '../vector/vector';

const DEGREE_30 = Math.PI / 6;
const DEGREE_45 = Math.PI / 4;
const DEGREE_60 = Math.PI / 3;
// 75
const DEGREE_90 = Math.PI / 2;
// 105
const DEGREE_120 = (Math.PI * 2) / 3;
const DEGREE_135 = (Math.PI * 3) / 4;
const DEGREE_150 = (Math.PI * 5) / 6;
// 165
const DEGREE_180 = Math.PI;
// 195
const DEGREE_210 = -DEGREE_150;
const DEGREE_225 = -DEGREE_135;
const DEGREE_240 = -DEGREE_120;
// 255
const DEGREE_270 = -DEGREE_90;
// 285
const DEGREE_300 = -DEGREE_60;
const DEGREE_315 = -DEGREE_45;
const DEGREE_330 = -DEGREE_30;
// 345

export const HALF_PI = Math.PI / 2;
export const PI = Math.PI;
export const DOUBLE_PI = Math.PI * 2;

const TRIPLE_EPSILON = Number.EPSILON * 3;

export interface RadianCache {
  vector?: Vector;
  alreadyNormalized?: boolean;
}

export class Radian {
  // Normalize - skip: The values are always in normalized range.
  // Cache - vector: If anyone gets the vector of the radian, it will set the cache for all requests. There is no need to cache beforehand.
  static readonly get30 = new Radian(DEGREE_30, { vector: undefined, alreadyNormalized: true });
  static readonly get45 = new Radian(DEGREE_45, { vector: undefined, alreadyNormalized: true });
  static readonly get60 = new Radian(DEGREE_60, { vector: undefined, alreadyNormalized: true });
  static readonly get90 = new Radian(DEGREE_90, { vector: undefined, alreadyNormalized: true });
  static readonly get120 = new Radian(DEGREE_120, { vector: undefined, alreadyNormalized: true });
  static readonly get135 = new Radian(DEGREE_135, { vector: undefined, alreadyNormalized: true });
  static readonly get150 = new Radian(DEGREE_150, { vector: undefined, alreadyNormalized: true });
  static readonly get180 = new Radian(DEGREE_180, { vector: undefined, alreadyNormalized: true });
  static readonly get210 = new Radian(DEGREE_210, { vector: undefined, alreadyNormalized: true });
  static readonly get225 = new Radian(DEGREE_225, { vector: undefined, alreadyNormalized: true });
  static readonly get240 = new Radian(DEGREE_240, { vector: undefined, alreadyNormalized: true });
  static readonly get270 = new Radian(DEGREE_270, { vector: undefined, alreadyNormalized: true });
  static readonly get300 = new Radian(DEGREE_300, { vector: undefined, alreadyNormalized: true });
  static readonly get315 = new Radian(DEGREE_315, { vector: undefined, alreadyNormalized: true });
  static readonly get330 = new Radian(DEGREE_330, { vector: undefined, alreadyNormalized: true });

  static random(): Radian {
    let radian = Math.random() * DOUBLE_PI - PI;
    // Cache - vector: Unknown, requires calculation.
    // Cache - alreadyNormalized: The value is always in normalized range.
    return new Radian(radian, { vector: undefined, alreadyNormalized: true });
  }

  private cache: RadianCache;

  private _value: number;
  get value(): number {
    if (!this.cache.alreadyNormalized) {
      this._value = this.normalize(this._value);
    }
    return this._value;
  }

  constructor(value: number, cache?: RadianCache) {
    this._value = value;
    this.cache = cache ?? { vector: undefined, alreadyNormalized: undefined };
  }

  subtract(radian: Radian): Radian {
    // Cache - vector: Unknown, requires calculation.
    // Cache - alreadyNormalized: Unknown, requires calculation.
    return new Radian(this.value - radian.value);
  }

  add(radian: Radian): Radian {
    // Cache - vector: Unknown, requires calculation.
    // Cache - alreadyNormalized: Unknown, requires calculation.
    return new Radian(this.value + radian.value);
  }

  multiply(value: number): Radian {
    // Cache - vector: Unknown, requires calculation.
    // Cache - alreadyNormalized: Unknown, requires calculation.
    return new Radian(this.value * value);
  }

  divide(value: number): Radian {
    // Cache - vector: Unknown, requires calculation.
    // Cache - alreadyNormalized: Unknown, requires calculation.
    return new Radian(this.value / value);
  }

  toVector(): Vector {
    if (!this.cache.vector) {
      this.cache.vector = this.getVector();
    }
    return this.cache.vector;
  }

  acuteAngle(radian: Radian): Radian {
    let result = (radian.value - this.value) % DOUBLE_PI;
    if (result > PI) {
      result = result - DOUBLE_PI;
    } else if (result < -PI) {
      result = result + DOUBLE_PI;
    }
    // Cache - vector: Unknown, requires calculation.
    // Cache - alreadyNormalized: The value is always in normalized range.
    return new Radian(result, { vector: undefined, alreadyNormalized: true });
  }

  isBetweenAngles(start: Radian, end: Radian): boolean {
    let total =
      Math.abs(start.acuteAngle(this).value) +
      Math.abs(this.acuteAngle(end).value) -
      Math.abs(start.acuteAngle(end).value);
    return total <= TRIPLE_EPSILON;
  }

  lerp(radian: Radian, ratio: number): Radian {
    let acuteAngle = this.acuteAngle(radian);
    // Cache - vector: Unknown, requires calculation.
    // Cache - alreadyNormalized: Unknown, requires calculation.
    return new Radian(this.value + acuteAngle.value * ratio);
  }

  /**
   * @returns Normalizes radian to [-PI, PI]
   */
  private normalize(radian: number): number {
    radian = radian % DOUBLE_PI;
    if (radian < -PI) {
      radian += Math.ceil(-radian / DOUBLE_PI) * DOUBLE_PI;
    } else if (radian > PI) {
      radian -= Math.floor(radian / DOUBLE_PI) * DOUBLE_PI;
    }
    return NumberHelper.ensurePositiveZero(radian);
  }

  private getVector(): Vector {
    // Cache - length: Known, equals to this radian.
    // Cache - radian: Known, equals to one.
    return new Vector(Math.sin(this.value), Math.cos(PI - this.value), { radian: this, length: 1 });
  }
}
