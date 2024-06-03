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
const DEGREE_210 = (Math.PI * 7) / 6;
const DEGREE_225 = (Math.PI * 5) / 4;
const DEGREE_240 = (Math.PI * 4) / 3;
// 255
const DEGREE_270 = (Math.PI * 3) / 2;
// 285
const DEGREE_300 = (Math.PI * 5) / 3;
const DEGREE_315 = (Math.PI * 7) / 4;
const DEGREE_330 = (Math.PI * 11) / 6;
// 345
const DEGREE_360 = Math.PI * 2;

const TRIPLE_EPSILON = Number.EPSILON * 3;

export interface RadianCache {
  vector?: Vector;
}

export interface RadianOptions {
  skipNormalization?: boolean;
  cache?: RadianCache;
}

export class Radian {
  static random(): Radian {
    // Normalize - skip: The value is always in normalized range.
    // Cache - vector: Unknown, requires calculation.
    return new Radian(Math.random() * this.get360 - this.get180, {
      skipNormalization: true,
      cache: { vector: undefined }
    });
  }

  static get get30(): number {
    return DEGREE_30;
  }

  static get get45(): number {
    return DEGREE_45;
  }

  static get get60(): number {
    return DEGREE_60;
  }

  static get get90(): number {
    return DEGREE_90;
  }

  static get get120(): number {
    return DEGREE_120;
  }

  static get get135(): number {
    return DEGREE_135;
  }

  static get get150(): number {
    return DEGREE_150;
  }

  static get get180(): number {
    return DEGREE_180;
  }

  static get get210(): number {
    return DEGREE_210;
  }

  static get get225(): number {
    return DEGREE_225;
  }

  static get get240(): number {
    return DEGREE_240;
  }

  static get get270(): number {
    return DEGREE_270;
  }

  static get get300(): number {
    return DEGREE_300;
  }

  static get get315(): number {
    return DEGREE_315;
  }

  static get get330(): number {
    return DEGREE_330;
  }

  static get get360(): number {
    return DEGREE_360;
  }

  readonly value: number;

  private cache: RadianCache;

  constructor(value: number, options?: RadianOptions) {
    this.value = options?.skipNormalization ? value : this.normalize(value);
    this.cache = options?.cache ?? { vector: undefined };
  }

  toVector(): Vector {
    if (!this.cache.vector) {
      this.cache.vector = this.getVector();
    }
    return this.cache.vector;
  }

  acuteAngle(radian: Radian): Radian {
    let result = (radian.value - this.value) % Radian.get360;
    if (result > Radian.get180) {
      result = result - Radian.get360;
    } else if (result < -Radian.get180) {
      result = result + Radian.get360;
    }
    // Normalize - skip: The value is always in normalized range.
    // Cache - vector: Unknown, requires calculation.
    return new Radian(result, { skipNormalization: true, cache: { vector: undefined } });
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
    // Normalize - do not skip: The value is not guaranteed to be in normalized range.
    return new Radian(this.value + acuteAngle.value * ratio);
  }

  /**
   * @returns Normalizes radian to [-PI, PI]
   */
  private normalize(radian: number): number {
    radian = radian % Radian.get360;
    if (radian < -Radian.get180) {
      radian += Math.ceil(-radian / Radian.get360) * Radian.get360;
    } else if (radian > Radian.get180) {
      radian -= Math.floor(radian / Radian.get360) * Radian.get360;
    }
    return NumberHelper.ensurePositiveZero(radian);
  }

  private getVector(): Vector {
    // Cache - length: Known, equals to this radian.
    // Cache - radian: Known, equals to one.
    return new Vector(Math.sin(this.value), Math.cos(Radian.get180 - this.value), { radian: this.value, length: 1 });
  }
}
