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

export class Radian {
  static random(): number {
    return Math.random() * this.get360 - this.get180;
  }

  static toVector(radian: number): Vector {
    return new Vector(Math.sin(radian), Math.cos(this.get180 - radian));
  }

  /*
   * Normalize radian to [-PI, PI]
   */
  static normalize(radian: number): number {
    radian = radian % this.get360;
    if (radian < -this.get180) {
      radian += Math.ceil(-radian / this.get360) * this.get360;
    } else if (radian > this.get180) {
      radian -= Math.floor(radian / this.get360) * this.get360;
    }
    return NumberHelper.ensurePositiveZero(radian);
  }

  static acuteAngle(radian1: number, radian2: number): number {
    let result = (radian2 - radian1) % this.get360;
    if (result > this.get180) {
      result = result - this.get360;
    } else if (result < -this.get180) {
      result = result + this.get360;
    }
    return result;
  }

  static isBetweenAngles(radian: number, start: number, end: number): boolean {
    let total =
      Math.abs(this.acuteAngle(start, radian)) +
      Math.abs(this.acuteAngle(radian, end)) -
      Math.abs(this.acuteAngle(start, end));
    return total <= TRIPLE_EPSILON;
  }

  static lerp(radianA: number, radianB: number, ratio: number): number {
    let acuteAngle = this.acuteAngle(radianA, radianB);
    return radianA + acuteAngle * ratio;
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
}
