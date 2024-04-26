const HALF_PI = Math.PI / 2;
const DOUBLE_PI = Math.PI * 2;

export class NumberHelper {
  public static ensurePositiveZero(value: number): number {
    return value === 0 ? 0 : value;
  }

  public static removeUnderflow(num: number): number {
    return Math.abs(num) < Number.EPSILON ? 0 : Number.parseFloat(num.toFixed(15));
  }

  /**
   * Returns a number whose value is limited to the given range.
   *
   * Example: limit the output of this computation to between 0 and 255
   * (x * 255).clamp(0, 255)
   *
   * @param {Number} value The value to be clamped
   * @param {Number} min The lower boundary of the output range
   * @param {Number} max The upper boundary of the output range
   * @returns A number in the range [min, max]
   * @type Number
   */
  public static clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  public static get PI(): number {
    return Math.PI;
  }

  public static get DoublePI(): number {
    return DOUBLE_PI;
  }

  public static get HalfPI(): number {
    return HALF_PI;
  }
}
