import { describe, expect, test } from 'vitest';

import { AutoValidate } from '../auto-validate/auto-validate';
import { JSEngine } from './js-engine';

describe('JSEngine and AutoValidate', () => {
  describe('Edge Cases', () => {
    test('assigning different type to a variable', () => {
      @AutoValidate()
      class Variables {
        a = 'initial';
      }

      let jsEngine = new JSEngine({}, new Variables());
      jsEngine.execute('a = "a"');

      expect(() => {
        jsEngine.execute('a = 1');
      }).toThrowError('Cannot change the type of the property "a". Current type "string", value type "number".');
    });
  });

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
