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
