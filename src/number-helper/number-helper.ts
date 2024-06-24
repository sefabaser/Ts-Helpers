import { Comparator } from '../comparator/comparator';

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
   * @param number number to be converted to string
   * @returns returns the string representation of the number, which always have a decimal point
   */
  static toFloatString(number: number): string {
    if (Number.isInteger(number)) {
      return number.toFixed(1);
    } else {
      return number.toString();
    }
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
    if (min > max) {
      [min, max] = [max, min];
    }
    return Math.min(Math.max(value, min), max);
  }

  /**
   * @param row number of the desired row of the pascal triangle
   * @returns Row's values of the pascal triangle
   */
  static pascalTriangleRow(row: number): number[] {
    if (row < 0) {
      throw new Error('NumberHelper: Row number must be greater than or equal to 0');
    } else if (Comparator.isInteger(row) === false) {
      throw new Error('NumberHelper: Row number must be an integer');
    } else if (row > 50) {
      throw new Error('NumberHelper: Row number must be less than or equal to 50');
    }

    return [...NumberHelper.getPascalTriangleRow(row)];
  }

  private static pascalTriangleCache = new Map<number, number[]>();
  private static getPascalTriangleRow(row: number): number[] {
    if (NumberHelper.pascalTriangleCache.has(row)) {
      return NumberHelper.pascalTriangleCache.get(row) as number[];
    }

    let result = [1];
    for (let i = 0; i < row / 2; i++) {
      result.push((result[i] * (row - i)) / (i + 1));
    }

    if (row % 2 === 0) {
      result = result.concat(result.slice(0, -1).reverse());
    } else {
      result = result.concat(result.slice(0, -2).reverse());
    }

    NumberHelper.pascalTriangleCache.set(row, result);
    return result;
  }
}
