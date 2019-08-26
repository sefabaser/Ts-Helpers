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
