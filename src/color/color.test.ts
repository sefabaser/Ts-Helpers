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
      expect(color).toEqual({ r: 0, g: 1, b: 0 });
    });

    test('sample 2', () => {
      let color = ColorHelper.normalize({ r: 28, g: 204, b: 162 });
      expect(color).toEqual({ r: 0.10980392156862745, g: 0.8, b: 0.6352941176470588 });
    });
  });
});
