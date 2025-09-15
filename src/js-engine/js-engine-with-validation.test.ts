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

  test('calling a function that is not JSEngine function', () => {
    @AutoValidate()
    class Functions {
      gameOver(): void {}
    }

    let functions = new Functions();

    let jsEngine = new JSEngine(functions, {});
    expect(() => jsEngine.execute('gameOver()')).toThrow(
      '"gameOver(...)" is not a JSEngine function, it cannot be called during the executions.'
    );
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

  test('validation after duplication, calling a function that is not JSEngine function', () => {
    @AutoValidate()
    class Functions {
      gameOver(): void {}
    }

    let functions = new Functions();

    let jsEngine = new JSEngine(functions, {});
    let copy = jsEngine.duplicate();
    expect(() => copy.execute('gameOver()')).toThrow(
      '"gameOver(...)" is not a JSEngine function, it cannot be called during the executions.'
    );
  });

  test('validation after duplication, invalid function call', () => {
    @AutoValidate()
    class Functions {
      @JSEngineFunction()
      gameOver(): void {}
    }

    let functions = new Functions();

    let jsEngine = new JSEngine(functions, {});
    let copy = jsEngine.duplicate();
    expect(() => copy.execute('gameOver("a", 2)')).toThrow(
      'Unexpected argument has sent to gameOver. Expected: 0, Received: 2'
    );
  });

  test('validation after double duplication, calling a function that is not JSEngine function', () => {
    @AutoValidate()
    class Functions {
      gameOver(): void {}

      constructor(public a: number) {}
    }

    let functions = new Functions(1);

    let jsEngine = new JSEngine(functions, {});
    let copy = jsEngine.duplicate().duplicate();
    expect(() => copy.execute('gameOver()')).toThrow(
      '"gameOver(...)" is not a JSEngine function, it cannot be called during the executions.'
    );
  });

  test('validation after double duplication, invalid function call', () => {
    @AutoValidate()
    class Functions {
      @JSEngineFunction()
      gameOver(): void {}

      constructor(public a: number) {}
    }

    let functions = new Functions(1);

    let jsEngine = new JSEngine(functions, {});
    let copy = jsEngine.duplicate().duplicate();
    expect(() => copy.execute('gameOver("a", 2)')).toThrow(
      'Unexpected argument has sent to gameOver. Expected: 0, Received: 2'
    );
  });
});
