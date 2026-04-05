import { beforeEach, describe, test } from 'vitest';

import type { Comparator as ComparatorType } from '../index';
import { UnitTestHelper } from '../unit-test-helper/unit-test.helper';

describe.skipIf(!process.env.MANUAL)('Performance Tests', () => {
  let Comparator: typeof ComparatorType;

  beforeEach(async () => {
    let imports = await import('../../dist/index');
    Comparator = imports.Comparator as any;
  });

  test('isNumber', async () => {
    await UnitTestHelper.testPerformance(
      () => {
        Comparator.isNumber(2);
        Comparator.isNumber(2);
        Comparator.isNumber(2);
        Comparator.isNumber(2);
        Comparator.isNumber(2);
        Comparator.isNumber(2);
        Comparator.isNumber(2);
        Comparator.isNumber(2);
        Comparator.isNumber(2);
        Comparator.isNumber(2);
      },
      { repetationCount: 10000000 }
    );
    // 15.432099999999991
  }, 60000);

  test('isInteger', async () => {
    await UnitTestHelper.testPerformance(
      () => {
        Comparator.isInteger(2);
        Comparator.isInteger(2);
        Comparator.isInteger(2);
        Comparator.isInteger(2);
        Comparator.isInteger(2);
        Comparator.isInteger(2);
        Comparator.isInteger(2);
        Comparator.isInteger(2);
        Comparator.isInteger(2);
        Comparator.isInteger(2);
      },
      { repetationCount: 10000000 }
    );
    // 15.616999999999905
  }, 60000);
});
