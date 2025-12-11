import { Wait } from '../delayer/delayer';

export interface UnitTestHelperPerformanceTestOptions {
  readonly sampleCount: number;
  readonly repetationCount: number;
  readonly printResult: boolean;
}

export class UnitTestHelper {
  private static _allPromises: Promise<void>[] = [];
  private static _allResolves = new Set<(value: void | PromiseLike<void>) => void>();

  static callDelayed(callback: () => void, duration?: number): void {
    let promise = new Promise<void>((resolve, reject) => {
      this._allResolves.add(resolve);
      (async () => {
        await Wait(duration);
        try {
          callback();
        } catch (e) {
          this._allResolves.delete(resolve);
          reject(e);
          return;
        }
        resolve();
        this._allResolves.delete(resolve);
      })();
    });
    this._allPromises.push(promise);
  }

  static callEachDelayed<T>(
    values: T[],
    callback: (value: T) => void,
    options?: { allDone?: () => void; duration?: number }
  ): void {
    let promise = new Promise<void>((resolve, reject) => {
      this._allResolves.add(resolve);
      (async () => {
        for (let value of values) {
          await Wait(options?.duration);
          try {
            callback(value);
          } catch (e) {
            this._allResolves.delete(resolve);
            reject(e);
            return;
          }
        }
        resolve();
        this._allResolves.delete(resolve);
      })();
    }).finally(options?.allDone);
    this._allPromises.push(promise);
  }

  static async waitForAllOperations(): Promise<void> {
    let promises = [...this._allPromises];
    this._allPromises = [];

    await Promise.all(promises);
    if (this._allPromises.length > 0) {
      await this.waitForAllOperations();
    }
  }

  static reset() {
    this._allResolves.forEach(resolve => resolve());
    this._allResolves.clear();
    this._allPromises = [];
  }

  static async forceGarbageCollection(): Promise<void> {
    await Wait();
    if (global?.gc) {
      global.gc();
    } else {
      throw new Error('The "global.gc()" is not activated. Run tests with --expose-gc.');
    }
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
      sampleCount: 100,
      repetationCount: 10000,
      printResult: true,
      ...partialOptions
    };

    let start: number;
    let end: number;
    let durations: number[] = [];

    await this._checkCallbackErrors(callback);

    this.silenceConsole(true);
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

      await this.forceGarbageCollection();
    }
    this.silenceConsole(false);

    durations = durations.sort((a, b) => a - b);
    let min = durations[0];

    if (options.printResult) {
      console.info('Min: ', min);
    }
    return min;
  }

  static captureErrors(): { destroy: () => void; getErrors: () => Error[]; throwErrors: () => void } {
    let capturedErrors: Error[] = [];

    let unhandledRejectionHandler = (reason: any) => {
      let capturedError = reason instanceof Error ? reason : new Error(String(reason));
      capturedErrors.push(capturedError);
    };

    let uncaughtExceptionHandler = (error: Error) => {
      capturedErrors.push(error);
    };

    let originalUnhandledListeners = process.listeners('unhandledRejection');
    let originalUncaughtListeners = process.listeners('uncaughtException');
    process.removeAllListeners('unhandledRejection');
    process.removeAllListeners('uncaughtException');

    process.on('unhandledRejection', unhandledRejectionHandler);
    process.on('uncaughtException', uncaughtExceptionHandler);

    return {
      getErrors: () => {
        return capturedErrors;
      },
      throwErrors: () => {
        capturedErrors.forEach(error => {
          throw error;
        });
      },
      destroy: () => {
        // To prevent errors for using libraries that does not @types/node installed.
        (process as any).off('unhandledRejection', unhandledRejectionHandler);
        (process as any).off('uncaughtException', uncaughtExceptionHandler);

        originalUnhandledListeners.forEach(listener => process.on('unhandledRejection', listener));
        originalUncaughtListeners.forEach(listener => process.on('uncaughtException', listener));
      }
    };
  }

  private static async _checkCallbackErrors(callback: () => Promise<void> | void): Promise<void> {
    let errorCapturer = this.captureErrors();

    let originalError = console.error;
    console.error = (...data: any[]) => {
      throw new Error(data.map(d => String(d)).join(' '));
    };

    try {
      let promise = callback();
      if (promise) {
        await promise;
      }
      await Wait();
      let capturedErrors = errorCapturer.getErrors();
      if (capturedErrors.length > 0) {
        throw capturedErrors[0];
      }
    } finally {
      errorCapturer.destroy();
      console.error = originalError;
    }
  }

  private static _originalLog = console.log;
  private static _originalInfo = console.info;
  private static _originalError = console.error;
  private static _originalWarn = console.warn;
  private static _originalDir = console.dir;

  static silenceConsole(silence: boolean): void {
    if (silence) {
      console.log = () => {};
      console.info = () => {};
      console.warn = () => {};
      console.dir = () => {};
      console.error = () => {};
    } else {
      console.log = this._originalLog;
      console.info = this._originalInfo;
      console.warn = this._originalWarn;
      console.dir = this._originalDir;
      console.error = this._originalError;
    }
  }
}
