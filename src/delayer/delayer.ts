// TODO: unit tests
export class Debouncer {
  private timeout: any;

  constructor(private waitTime: number = 200) {}

  debounce(func: () => void, immediate = false) {
    if (immediate) {
      this.timeout && clearTimeout(this.timeout);
      this.timeout = null;
      func();
    } else {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.timeout = null;
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

  call(callback: () => void) {
    this.halt();
    this.delayerTimeout = setTimeout(() => {
      this.delayerTimeout = undefined;
      callback();
    }, this.delay);
  }

  halt() {
    this.delayerTimeout && clearTimeout(this.delayerTimeout);
  }
}

export function Wait(duration: number = 0) {
  return new Promise(resolve => setTimeout(resolve, duration));
}
