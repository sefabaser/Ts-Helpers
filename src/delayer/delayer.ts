// TODO: unit tests
export class Debouncer {
  private timeout: any;

  constructor(private waitTime: number = 200) {}

  debounce(func: () => void, immediate = false): void {
    if (immediate) {
      this.timeout && clearTimeout(this.timeout);
      this.timeout = undefined;
      func();
    } else {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.timeout = undefined;
        func();
      }, this.waitTime);
    }
  }
}

// TODO: unit tests
export class FunctionDelayer {
  private delay: number;
  private delayerTimeout: any;

  constructor(delay = 200) {
    this.delay = delay;
  }

  call(callback: () => void): void {
    this.halt();
    this.delayerTimeout = setTimeout(() => {
      this.delayerTimeout = undefined;
      callback();
    }, this.delay);
  }

  halt(): void {
    this.delayerTimeout && clearTimeout(this.delayerTimeout);
  }
}

export function Wait(duration: number = 0): Promise<void> {
  return new Promise<void>(resolve => setTimeout(resolve, duration));
}
