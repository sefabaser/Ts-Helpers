import { Comparator } from '../comparator/comparator';

export class Random {
  private static _fibonacciMap: number[] = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377];
  static fibonacci(i: number): number {
    if (Comparator.isInteger(i) && i >= 0) {
      if (this._fibonacciMap[i]) {
        return this._fibonacciMap[i];
      } else {
        let iMinus1Result = this.fibonacci(i - 1);
        this._fibonacciMap[i - 1] = iMinus1Result;
        let iResult = iMinus1Result + this.fibonacci(i - 2);
        this._fibonacciMap[i] = iResult;
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
    if (from > to) {
      [from, to] = [to, from];
    }
    return Math.random() * (to - from) + from;
  }

  static integerBetween(from: number, to: number): number {
    if (from > to) {
      [from, to] = [to, from];
    }
    return Math.floor(Math.random() * (to - from) + from);
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
   * @param from - The minimum value
   * @param to - The maximum value
   * @param type 'ascending' | 'descending' | 'full'
   * @returns A random number between x and y that respects the probability of the gaussian distribution
   */
  static gaussianRandomBetween(from: number, to: number, type: 'ascending' | 'descending' | 'full' = 'full'): number {
    if (from > to) {
      [from, to] = [to, from];
    }

    let gaussianClamped = this.gaussianRandomWithoutRange();
    while (Math.abs(gaussianClamped) > 1) {
      gaussianClamped = this.gaussianRandomWithoutRange();
    }

    switch (type) {
      case 'ascending': {
        gaussianClamped = Math.abs(gaussianClamped);
        let range = to - from;
        return to - gaussianClamped * range;
      }
      case 'descending': {
        gaussianClamped = Math.abs(gaussianClamped);
        let range = to - from;
        return from + gaussianClamped * range;
      }
      case 'full': {
        let center = (from + to) * 0.5;
        let range = (to - from) * 0.5;

        return center + gaussianClamped * range;
      }
    }
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
