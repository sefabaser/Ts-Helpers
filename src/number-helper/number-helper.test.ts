import { describe, expect,test } from 'vitest';

import { NumberHelper } from './number-helper';

describe(`Number Helper: `, () => {
  describe(`EnsurePositiveZero: `, () => {
    test('sample 1', () => {
      expect(NumberHelper.ensurePositiveZero(0)).toEqual(0);
    });

    test('sample 2', () => {
      expect(NumberHelper.ensurePositiveZero(1)).toEqual(1);
    });

    test('sample 3', () => {
      expect(NumberHelper.ensurePositiveZero(-1)).toEqual(-1);
    });

    test('sample 3', () => {
      expect(NumberHelper.ensurePositiveZero(-0)).toEqual(0);
    });
  });

  describe(`RemoveUnderflow: `, () => {
    test('sample 1', () => {
      expect(NumberHelper.removeUnderflow(0)).toEqual(0);
    });

    test('sample 2', () => {
      expect(NumberHelper.removeUnderflow(1)).toEqual(1);
    });

    test('sample 3', () => {
      expect(NumberHelper.removeUnderflow(-1)).toEqual(-1);
    });

    test('sample 4', () => {
      expect(NumberHelper.removeUnderflow(0.0000000000000001)).toEqual(0);
    });

    test('sample 5', () => {
      expect(NumberHelper.removeUnderflow(-0.0000000000000001)).toEqual(0);
    });

    test('sample 6', () => {
      expect(NumberHelper.removeUnderflow(1.2000000000000002)).toEqual(1.2);
    });
  });

  describe(`ToFloatString: `, () => {
    test('sample 1', () => {
      expect(NumberHelper.toFloatString(0)).toEqual('0.0');
    });

    test('sample 2', () => {
      expect(NumberHelper.toFloatString(1)).toEqual('1.0');
    });

    test('sample 3', () => {
      expect(NumberHelper.toFloatString(-1)).toEqual('-1.0');
    });

    test('sample 4', () => {
      expect(NumberHelper.toFloatString(0.5)).toEqual('0.5');
    });

    test('sample 5', () => {
      expect(NumberHelper.toFloatString(1.5)).toEqual('1.5');
    });

    test('sample 6', () => {
      expect(NumberHelper.toFloatString(-1.5)).toEqual('-1.5');
    });
  });

  describe(`ToLimitedFixed: `, () => {
    test('sample 1', () => {
      expect(NumberHelper.toLimitedFixed(0)).toEqual('0');
    });

    test('sample 2', () => {
      expect(NumberHelper.toLimitedFixed(1.1)).toEqual('1.1');
    });

    test('sample 3', () => {
      expect(NumberHelper.toLimitedFixed(1.12)).toEqual('1.12');
    });

    test('sample 4', () => {
      expect(NumberHelper.toLimitedFixed(1.123)).toEqual('1.12');
    });

    test('sample 5', () => {
      expect(NumberHelper.toLimitedFixed(1.123)).toEqual('1.12');
    });

    test('sample 6', () => {
      expect(NumberHelper.toLimitedFixed(1.127)).toEqual('1.13');
    });

    test('sample 7', () => {
      expect(NumberHelper.toLimitedFixed(1.12, 1)).toEqual('1.1');
    });

    test('sample 8', () => {
      expect(NumberHelper.toLimitedFixed(1.17, 1)).toEqual('1.2');
    });
  });

  describe(`Clamp: `, () => {
    test('sample 1', () => {
      expect(NumberHelper.clamp(0, 0, 1)).toEqual(0);
    });

    test('sample 2', () => {
      expect(NumberHelper.clamp(1, 0, 1)).toEqual(1);
    });

    test('sample 3', () => {
      expect(NumberHelper.clamp(-1, 0, 1)).toEqual(0);
    });

    test('sample 4', () => {
      expect(NumberHelper.clamp(2, 0, 1)).toEqual(1);
    });

    test('sample 5', () => {
      expect(NumberHelper.clamp(0.5, 0, 1)).toEqual(0.5);
    });

    test('sample 6', () => {
      expect(NumberHelper.clamp(1, 0.5, 0)).toEqual(0.5);
    });
  });

  describe(`PascalTriangleRow: `, () => {
    test('sample 1', () => {
      expect(NumberHelper.pascalTriangleRow(0)).toEqual([1]);
    });

    test('sample 2', () => {
      expect(NumberHelper.pascalTriangleRow(1)).toEqual([1, 1]);
    });

    test('sample 3', () => {
      expect(NumberHelper.pascalTriangleRow(2)).toEqual([1, 2, 1]);
    });

    test('sample 4', () => {
      expect(NumberHelper.pascalTriangleRow(3)).toEqual([1, 3, 3, 1]);
    });

    test('sample 5', () => {
      expect(NumberHelper.pascalTriangleRow(4)).toEqual([1, 4, 6, 4, 1]);
    });

    test('sample 6', () => {
      expect(NumberHelper.pascalTriangleRow(5)).toEqual([1, 5, 10, 10, 5, 1]);
    });

    test('sample 7', () => {
      expect(NumberHelper.pascalTriangleRow(6)).toEqual([1, 6, 15, 20, 15, 6, 1]);
    });
  });
});
