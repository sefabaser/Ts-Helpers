import { NumberHelper } from '../../number-helper/number-helper';
import { Vec2 } from '../vector/vector';

//
const DEGREE_30 = Math.PI / 6;
const DEGREE_45 = Math.PI / 4;
const DEGREE_60 = Math.PI / 3;
//
const DEGREE_90 = Math.PI / 2;
//
const DEGREE_120 = (Math.PI * 2) / 3;
const DEGREE_135 = (Math.PI * 3) / 4;
const DEGREE_150 = (Math.PI * 5) / 6;
//
const DEGREE_180 = Math.PI;
//
const DEGREE_210 = (Math.PI * 7) / 6;
const DEGREE_225 = (Math.PI * 5) / 4;
const DEGREE_240 = (Math.PI * 4) / 3;
//
const DEGREE_270 = (Math.PI * 3) / 2;
//
const DEGREE_300 = (Math.PI * 5) / 3;
const DEGREE_315 = (Math.PI * 7) / 4;
const DEGREE_330 = (Math.PI * 11) / 6;
//
const DEGREE_360 = Math.PI * 2;

const TRIPLE_EPSILON = Number.EPSILON * 3;

export class Radian {
  static random(): number {
    return Math.random() * this.get360 - this.get180;
  }

  static vectorToRadian(vector: Vec2): number {
    let radian = Math.atan2(vector.y, vector.x) + this.get90;
    return radian > this.get180 ? radian - this.get360 : radian;
  }

  static radianToVector(radian: number): Vec2 {
    return {
      x: NumberHelper.removeUnderflow(Math.sin(radian)),
      y: NumberHelper.removeUnderflow(Math.cos(this.get180 - radian))
    };
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

  public static get get30(): number {
    return DEGREE_30;
  }

  public static get get45(): number {
    return DEGREE_45;
  }

  public static get get60(): number {
    return DEGREE_60;
  }

  public static get get90(): number {
    return DEGREE_90;
  }

  public static get get120(): number {
    return DEGREE_120;
  }

  public static get get135(): number {
    return DEGREE_135;
  }

  public static get get150(): number {
    return DEGREE_150;
  }

  public static get get180(): number {
    return DEGREE_180;
  }

  public static get get210(): number {
    return DEGREE_210;
  }

  public static get get225(): number {
    return DEGREE_225;
  }

  public static get get240(): number {
    return DEGREE_240;
  }

  public static get get270(): number {
    return DEGREE_270;
  }

  public static get get300(): number {
    return DEGREE_300;
  }

  public static get get315(): number {
    return DEGREE_315;
  }

  public static get get330(): number {
    return DEGREE_330;
  }

  public static get get360(): number {
    return DEGREE_360;
  }
}
