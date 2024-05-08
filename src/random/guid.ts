export class Guid {
  static next(): Guid {
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
    return new Guid(guid);
  }

  private guid: string;

  constructor(guid: string) {
    this.guid = guid;
  }

  toString(): string {
    return this.guid;
  }
}
