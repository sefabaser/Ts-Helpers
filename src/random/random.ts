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

  static pickRandomElementWithWeight<T>(
    items: { value: T; weight: number }[] | ReadonlyArray<{ value: T; weight: number }>
  ): T {
    let selectedIndex = this.pickRandomWeight([...items].map(item => item.weight));
    return items[selectedIndex].value;
  }

  static random(possibility = 0.5): boolean {
    return Math.random() < possibility;
  }

  static randomBetween(start: number, to: number): number {
    return Math.floor(Math.random() * (to - start)) + start;
  }

  static pickRandomWeight(weights: number[] | ReadonlyArray<number>): number {
    let total = weights.reduce((acc, item) => acc + item);
    let threshold = Math.ceil(Math.random() * total);
    total = 0;
    for (let i = 0; i < weights.length; ++i) {
      total += weights[i];
      if (total >= threshold) {
        return i;
      }
    }
    return -1;
  }
}
