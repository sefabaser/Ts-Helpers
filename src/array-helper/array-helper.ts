export class ArrayHelper {
  /**
   * @param length Length of the array
   * @returns Array of undefined values
   */
  static createEmptyArray(length: number): undefined[] {
    return Array.from({ length }, () => undefined);
  }

  /**
   * @param length Length of the array
   * @returns Array of integers from 0 to length - 1
   */
  static createIntegerArray(length: number): number[] {
    return Array.from({ length }, (_, index) => index);
  }
}
