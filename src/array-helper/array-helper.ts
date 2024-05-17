export class ArrayHelper {
  static createEmptyArray(length: number): undefined[] {
    return Array.from({ length }, () => undefined);
  }

  static createIntegerArray(length: number): number[] {
    return Array.from({ length }, (_, index) => index);
  }
}
