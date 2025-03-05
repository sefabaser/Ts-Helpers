import { describe, expect, test } from 'vitest';

import { AutoValidate } from '../auto-validate/auto-validate';
import { JSEngine, JSEngineFunction } from './js-engine';

describe('JSEngine and AutoValidate', () => {
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

  test('valid function call', () => {
    @AutoValidate()
    class Functions {
      @JSEngineFunction()
      gameOver(): void {}
    }

    let functions = new Functions();

    let jsEngine = new JSEngine(functions, {});
    jsEngine.execute('gameOver()');
  });

  test('invalid function call', () => {
    @AutoValidate()
    class Functions {
      @JSEngineFunction()
      gameOver(): void {}
    }

    let functions = new Functions();

    let jsEngine = new JSEngine(functions, {});
    expect(() => jsEngine.execute('gameOver("a", 2)')).toThrow(
      'Unexpected argument has sent to gameOver. Expected: 0, Received: 2'
    );
  });
});
