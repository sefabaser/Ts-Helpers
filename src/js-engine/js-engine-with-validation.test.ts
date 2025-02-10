import { describe, test } from 'vitest';

import { AutoValidate } from '../auto-validate/auto-validate';
import { JSEngine } from './js-engine';

describe('JSEngine and AutoValidate', () => {
  describe('Edge Cases', () => {
    test('sample 1', () => {
      @AutoValidate()
      class Functions {
        gameOver(): void {}
      }

      let functions = new Functions();

      let jsEngine = new JSEngine(functions, {});
      jsEngine.execute('gameOver()');
    });
  });
});
