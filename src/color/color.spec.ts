import { ColorHelper } from './color';

describe('Color', () => {
  describe('hexColorToRGBColor', () => {
    it('sample 1', () => {
      let color = ColorHelper.hexColorToRGBColor(0x00ff00);
      expect(color).toEqual({ r: 0, g: 1, b: 0 });
    });

    it('sample 2', () => {
      let color = ColorHelper.hexColorToRGBColor(0x1ccca2c);
      expect(color).toEqual({ r: 0.10980392156862745, g: 0.8, b: 0.6352941176470588 });
    });
  });

  describe('stringColorToRGBColor', () => {
    it('sample 1', () => {
      let color = ColorHelper.stringColorToRGBColor('#00ff00');
      expect(color).toEqual({ r: 0, g: 1, b: 0 });
    });

    it('sample 2', () => {
      let color = ColorHelper.stringColorToRGBColor('#1ccca2c');
      expect(color).toEqual({ r: 0.10980392156862745, g: 0.8, b: 0.6352941176470588 });
    });
  });
});
