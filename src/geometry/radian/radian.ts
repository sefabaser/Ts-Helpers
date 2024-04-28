import { NumberHelper } from '../../number-helper/number-helper';
import { Vec2 } from '../vector/vector';

const DEGREE_45 = Math.PI / 4;
const DEGREE_90 = Math.PI / 2;
const DEGREE_135 = (Math.PI * 3) / 4;
const DEGREE_180 = Math.PI;
const DEGREE_225 = (Math.PI * 5) / 4;
const DEGREE_270 = (Math.PI * 3) / 2;
const DEGREE_315 = (Math.PI * 7) / 4;
const DEGREE_360 = Math.PI * 2;

export class Radian {
  public static get get45(): number {
    return DEGREE_45;
  }

  public static get get90(): number {
    return DEGREE_90;
  }

  public static get get135(): number {
    return DEGREE_135;
  }

  public static get get180(): number {
    return DEGREE_180;
  }

  public static get get225(): number {
    return DEGREE_225;
  }

  public static get get270(): number {
    return DEGREE_270;
  }

  public static get get315(): number {
    return DEGREE_315;
  }

  public static get get360(): number {
    return DEGREE_360;
  }

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
}
