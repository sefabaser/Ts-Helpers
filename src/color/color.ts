import { NumberHelper } from '../number-helper/number-helper';

export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export interface NormalizedColor {
  red: number;
  green: number;
  blue: number;
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

  static get yellow(): RGBColor {
    return { r: 255, g: 255, b: 0 };
  }

  static get cyan(): RGBColor {
    return { r: 0, g: 255, b: 255 };
  }

  static get magenta(): RGBColor {
    return { r: 255, g: 0, b: 255 };
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

  static rgbToHex(color: RGBColor): number {
    // biome-ignore lint/suspicious/noBitwiseOperators: accepted
    return (color.r << 16) + (color.g << 8) + color.b;
  }

  static normalize(color: RGBColor): NormalizedColor {
    return { red: color.r / 255, green: color.g / 255, blue: color.b / 255 };
  }

  static addNumber(color: RGBColor, number: number): RGBColor {
    return {
      r: NumberHelper.clamp(color.r + number, 0, 255),
      g: NumberHelper.clamp(color.g + number, 0, 255),
      b: NumberHelper.clamp(color.b + number, 0, 255)
    };
  }

  static multiplyNumber(color: RGBColor, number: number): RGBColor {
    return {
      r: NumberHelper.clamp(color.r * number, 0, 255),
      g: NumberHelper.clamp(color.g * number, 0, 255),
      b: NumberHelper.clamp(color.b * number, 0, 255)
    };
  }

  private static colorNumbersToRGBColor(colorNumbers: string): RGBColor {
    let r = parseInt(colorNumbers.slice(0, 2), 16);
    let g = parseInt(colorNumbers.slice(2, 4), 16);
    let b = parseInt(colorNumbers.slice(4, 6), 16);
    return { r, g, b };
  }
}
