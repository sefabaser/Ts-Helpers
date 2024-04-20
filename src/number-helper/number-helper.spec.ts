import { NumberHelper } from './number-helper';

describe(`Number Helper: `, () => {
  describe(`EnsurePositiveZero: `, () => {
    it('sample 1', () => {
      expect(NumberHelper.ensurePositiveZero(0)).toEqual(0);
    });

    it('sample 2', () => {
      expect(NumberHelper.ensurePositiveZero(1)).toEqual(1);
    });

    it('sample 3', () => {
      expect(NumberHelper.ensurePositiveZero(-1)).toEqual(-1);
    });

    it('sample 3', () => {
      expect(NumberHelper.ensurePositiveZero(-0)).toEqual(0);
    });
  });

  describe(`RemoveUnderflow: `, () => {
    it('sample 1', () => {
      expect(NumberHelper.removeUnderflow(0)).toEqual(0);
    });

    it('sample 2', () => {
      expect(NumberHelper.removeUnderflow(1)).toEqual(1);
    });

    it('sample 3', () => {
      expect(NumberHelper.removeUnderflow(-1)).toEqual(-1);
    });

    it('sample 4', () => {
      expect(NumberHelper.removeUnderflow(0.0000000000000001)).toEqual(0);
    });

    it('sample 5', () => {
      expect(NumberHelper.removeUnderflow(-0.0000000000000001)).toEqual(0);
    });

    it('sample 6', () => {
      expect(NumberHelper.removeUnderflow(1.2000000000000002)).toEqual(1.2);
    });
  });

  describe(`Clamp: `, () => {
    it('sample 1', () => {
      expect(NumberHelper.clamp(0, 0, 1)).toEqual(0);
    });

    it('sample 2', () => {
      expect(NumberHelper.clamp(1, 0, 1)).toEqual(1);
    });

    it('sample 3', () => {
      expect(NumberHelper.clamp(-1, 0, 1)).toEqual(0);
    });

    it('sample 4', () => {
      expect(NumberHelper.clamp(2, 0, 1)).toEqual(1);
    });

    it('sample 5', () => {
      expect(NumberHelper.clamp(0.5, 0, 1)).toEqual(0.5);
    });
  });
});
