import { Wait } from '../delayer/delayer';

export interface UnitTestHelperPerformanceTestOptions {
  readonly sampleCount: number;
  readonly repetationCount: number;
  readonly printResult: boolean;
}

export class UnitTestHelper {
  private static allPromises: Promise<void>[] = [];
  private static allResolves = new Set<(value: void | PromiseLike<void>) => void>();

  static callDelayed(callback: () => void, duration?: number): void {
    let promise = new Promise<void>((resolve, reject) => {
      this.allResolves.add(resolve);
      (async () => {
        await Wait(duration);
        try {
          callback();
        } catch (e) {
          this.allResolves.delete(resolve);
          reject(e);
          return;
        }
        resolve();
        this.allResolves.delete(resolve);
      })();
    });
    this.allPromises.push(promise);
  }

  static callEachDelayed<T>(values: T[], callback: (value: T) => void, allDone?: () => void, duration?: number): void {
    let promise = new Promise<void>((resolve, reject) => {
      this.allResolves.add(resolve);
      (async () => {
        for (let value of values) {
          await Wait(duration);
          try {
            callback(value);
          } catch (e) {
            this.allResolves.delete(resolve);
            reject(e);
            return;
          }
        }
        resolve();
        this.allResolves.delete(resolve);
      })();
    }).finally(allDone);
    this.allPromises.push(promise);
  }

  static async waitForAllOperations(): Promise<void> {
    let promises = [...this.allPromises];
    this.allPromises = [];

    await Promise.all(promises);
    if (this.allPromises.length > 0) {
      await this.waitForAllOperations();
    }
  }

  static reset() {
    this.allResolves.forEach(resolve => resolve());
    this.allResolves.clear();
    this.allPromises = [];
  }

  /**
   * @param partialOptions.sampleCount How many samples will be taken to determine the lowest run time. Default = 500.
   * @param partialOptions.repetationCount How many times the callback will be called. Default = 1000.
   * @param partialOptions.printResult Log the result in the console. Default = true.
   */
  static async testPerformance(
    callback: () => Promise<void> | void,
    partialOptions?: Partial<UnitTestHelperPerformanceTestOptions>
  ): Promise<number> {
    let options: UnitTestHelperPerformanceTestOptions = {
      sampleCount: 500,
      repetationCount: 1000,
      printResult: true,
      ...partialOptions
    };

    let start: number;
    let end: number;
    let durations: number[] = [];

    for (let v = 0; v < options.sampleCount; v++) {
      start = performance.now();
      for (let i = 0; i < options.repetationCount; i++) {
        let promise = callback();
        if (promise) {
          await promise;
        }
      }
      end = performance.now();
      durations.push(end - start);

      await Wait();
      if (global.gc) {
        global.gc();
        await Wait();
      }
    }

    durations = durations.sort((a, b) => a - b);
    let min = durations[0];

    if (options.printResult) {
      console.info('Min: ', min);
    }
    return min;
  }
}
