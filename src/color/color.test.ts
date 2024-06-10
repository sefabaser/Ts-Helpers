import { describe, expect, test } from 'vitest';

import { ColorHelper } from './color';

describe('Color', () => {
  describe('hexColorToRGBColor', () => {
    test('sample 1', () => {
      let color = ColorHelper.hexColorToRGBColor(0x00ff00);
      expect(color).toEqual({ r: 0, g: 255, b: 0 });
    });

    test('sample 2', () => {
      let color = ColorHelper.hexColorToRGBColor(0x1ccca2c);
      expect(color).toEqual({ r: 28, g: 204, b: 162 });
    });
  });

  describe('stringColorToRGBColor', () => {
    test('sample 1', () => {
      let color = ColorHelper.stringColorToRGBColor('#00ff00');
      expect(color).toEqual({ r: 0, g: 255, b: 0 });
    });

    test('sample 2', () => {
      let color = ColorHelper.stringColorToRGBColor('#1ccca2c');
      expect(color).toEqual({ r: 28, g: 204, b: 162 });
    });
  });

  describe('normalize', () => {
    test('sample 1', () => {
      let color = ColorHelper.normalize({ r: 0, g: 255, b: 0 });
      expect(color).toEqual({ red: 0, green: 1, blue: 0 });
    });

    test('sample 2', () => {
      let color = ColorHelper.normalize({ r: 28, g: 204, b: 162 });
      expect(color).toEqual({ red: 0.10980392156862745, green: 0.8, blue: 0.6352941176470588 });
    });
  });
});
