export class Guid {
  private guid: string;

  constructor() {
    this.guid = this.next();
  }

  toString(): string {
    return this.guid;
  }

  private next(): string {
    let guid = '';
    let i: string;
    let j: number;

    for (j = 0; j < 32; j++) {
      if (j === 8 || j === 12 || j === 16 || j === 20) {
        guid += '-';
      }

      i = Math.floor(Math.random() * 16)
        .toString(16)
        .toUpperCase();
      guid += i;
    }
    return guid;
  }
}
