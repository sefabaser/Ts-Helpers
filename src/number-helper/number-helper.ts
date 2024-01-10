export class NumberHelper {
  public static ensurePositiveZero(value: number): number {
    return value === 0 ? 0 : value;
  }

  public static removeUnderflow(num: number): number {
    return Math.abs(num) < Number.EPSILON ? 0 : Number.parseFloat(num.toFixed(15));
  }
}
