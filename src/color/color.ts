export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export class ColorHelper {
  static hexColorToRGBColor(hex: number): RGBColor {
    let hexString = hex.toString(16);
    while (hexString.length < 6) {
      hexString = '0' + hexString;
    }

    return ColorHelper.colorNumbersToRGBColor(hexString);
  }

  static stringColorToRGBColor(color: string): RGBColor {
    color = color.replace('#', '');
    return ColorHelper.colorNumbersToRGBColor(color);
  }

  private static colorNumbersToRGBColor(colorNumbers: string): RGBColor {
    let r = parseInt(colorNumbers.slice(0, 2), 16);
    let g = parseInt(colorNumbers.slice(2, 4), 16);
    let b = parseInt(colorNumbers.slice(4, 6), 16);
    return { r, g, b };
  }
}
