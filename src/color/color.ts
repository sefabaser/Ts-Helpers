export interface Color {
  r: number;
  g: number;
  b: number;
}

export class ColorHelper {
  static hexColorToRGB(hex: number): Color {
    let hexString = hex.toString(16);
    while (hexString.length < 6) {
      hexString = '0' + hexString;
    }

    let r = parseInt(hexString.slice(0, 2), 16);
    let g = parseInt(hexString.slice(2, 4), 16);
    let b = parseInt(hexString.slice(4, 6), 16);
    return { r: r / 255, g: g / 255, b: b / 255 };
  }
}
