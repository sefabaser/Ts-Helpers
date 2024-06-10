export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export class ColorHelper {
  static get black(): RGBColor {
    return { r: 0, g: 0, b: 0 };
  }

  static get white(): RGBColor {
    return { r: 255, g: 255, b: 255 };
  }

  static get red(): RGBColor {
    return { r: 255, g: 0, b: 0 };
  }

  static get green(): RGBColor {
    return { r: 0, g: 255, b: 0 };
  }

  static get blue(): RGBColor {
    return { r: 0, g: 0, b: 255 };
  }

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

  static normalize(color: RGBColor): RGBColor {
    return { r: color.r / 255, g: color.g / 255, b: color.b / 255 };
  }

  private static colorNumbersToRGBColor(colorNumbers: string): RGBColor {
    let r = parseInt(colorNumbers.slice(0, 2), 16);
    let g = parseInt(colorNumbers.slice(2, 4), 16);
    let b = parseInt(colorNumbers.slice(4, 6), 16);
    return { r, g, b };
  }
}
