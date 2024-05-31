export class NumberHelper {
  /**
   * Returns a number whose value is limited to the given range.
   * @param num any number with a possiblity of negative zero
   * @returns number that cannot have negative zero
   */
  static ensurePositiveZero(value: number): number {
    return value === 0 ? 0 : value;
  }

  /**
   * Returns a number whose value is limited to the given range.
   * @param num floating point number
   * @returns number that cannot have underflow
   */
  static removeUnderflow(num: number): number {
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
  static clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }
}
