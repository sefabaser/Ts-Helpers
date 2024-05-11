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
});
