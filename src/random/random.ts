import { Comparator } from '../comparator/comparator';

export class Random {
  private static fibonacciMap: number[] = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377];
  static fibonacci(i: number): number {
    if (Comparator.isInteger(i) && i >= 0) {
      if (this.fibonacciMap[i]) {
        return this.fibonacciMap[i];
      } else {
        let iMinus1Result = this.fibonacci(i - 1);
        this.fibonacciMap[i - 1] = iMinus1Result;
        let iResult = iMinus1Result + this.fibonacci(i - 2);
        this.fibonacciMap[i] = iResult;
        return iResult;
      }
    } else {
      return -1;
    }
  }

  static pickRandomElement<T>(items: T[] | ReadonlyArray<T>): T {
    return items[Math.floor(Math.random() * items.length)];
  }

  static pickRandomElementFirstLikely<T>(items: T[] | ReadonlyArray<T>): T {
    let i = this.pickRandomWeight([...items].map((_, index) => this.fibonacci(items.length - index), 2));
    return items[i];
  }

  static pickRandomElementWithWeight<T>(items: { value: T; weight: number }[] | ReadonlyArray<{ value: T; weight: number }>): T {
    let selectedIndex = this.pickRandomWeight(items.map(item => item.weight));
    return items[selectedIndex].value;
  }

  static chance(possibility: number): boolean {
    return Math.random() < possibility;
  }

  static between(from: number, to: number): number {
    return Math.random() * (to - from) + from;
  }

  static integerBetween(start: number, to: number): number {
    return Math.floor(Math.random() * (to - start) + start);
  }

  static pickRandomWeight(weights: number[] | ReadonlyArray<number>): number {
    let total = weights.reduce((acc, item) => acc + item);
    let threshold = Math.random() * total;
    total = 0;
    for (let i = 0; i < weights.length; ++i) {
      total += weights[i];
      if (total >= threshold) {
        return i;
      }
    }
    return -1;
  }

  /**
   * @param x - The minimum value
   * @param y - The maximum value
   * @returns A random number between x and y that respects the probability of the gaussian distribution
   */
  static gaussianRandomBetween(x: number, y: number): number {
    if (x > y) {
      [x, y] = [y, x];
    }

    let gaussianClamped = this.gaussianRandomWithoutRange();
    while (Math.abs(gaussianClamped) > 1) {
      gaussianClamped = this.gaussianRandomWithoutRange();
    }

    let center = (x + y) * 0.5;
    let range = (y - x) * 0.5;

    return center + gaussianClamped * range;
  }

  /**
   * Generates a random number that respects the probability of the gaussian distribution
   * @returns A random number between -Infinity and Infinity ~99.7% of values fall within [-1, 1]
   */
  static gaussianRandomWithoutRange(): number {
    let u = 0;
    let v = 0;
    // Converting [0,1) to (0,1)
    while (u === 0) {
      u = Math.random();
    }
    while (v === 0) {
      v = Math.random();
    }
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v) * 0.3;
  }
}
