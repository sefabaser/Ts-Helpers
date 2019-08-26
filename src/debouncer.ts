export class Debouncer {
  timeout: any;

  debounce(func: () => void, wait: number, immediate = false) {
    if (immediate) {
      this.timeout && clearTimeout(this.timeout);
      this.timeout = null;
      func();
    } else {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.timeout = null;
        func();
      }, wait);
    }
  }
}
