import { describe, expect, test } from 'vitest';

import { AutoValidate } from '../auto-validate/auto-validate';
import { JSEngine, JSEngineFunction } from './js-engine';

describe('JSEngine Decorators', () => {
  test('decorated functions should be able to be called by js engine', () => {
    let fooHasBeenCalled = false;

    class Functions {
      @JSEngineFunction()
      foo(): void {
        fooHasBeenCalled = true;
      }
    }

    let jsEngine = new JSEngine(new Functions(), {});
    jsEngine.execute('foo()');

    expect(fooHasBeenCalled).toEqual(true);
  });

  test('decorated functions should not be able to be called by manual calls', () => {
    let fooHasBeenCalled = false;

    class Functions {
      @JSEngineFunction()
      foo(): void {
        fooHasBeenCalled = true;
      }
    }
    let functions = new Functions();

    new JSEngine(functions, {});

    expect(() => {
      functions.foo();
    }).toThrowError('"foo(...)" can only be usable by JSEngine.');
    expect(fooHasBeenCalled).toEqual(false);
  });

  test('non decorated functions should not be able to be called by js engine', () => {
    let fooHasBeenCalled = false;

    class Functions {
      foo(): void {
        fooHasBeenCalled = true;
      }
    }

    let jsEngine = new JSEngine(new Functions(), {});
    expect(() => {
      jsEngine.execute('foo()');
    }).toThrowError('"foo(...)" is not a JSEngine function, it cannot be called during the executions.');
    expect(fooHasBeenCalled).toEqual(false);
  });

  test('decorated functions should be able to use together with AutoValidate', () => {
    let fooHasBeenCalled = false;

    @AutoValidate()
    class Functions {
      @JSEngineFunction()
      foo(): void {
        fooHasBeenCalled = true;
      }
    }

    let jsEngine = new JSEngine(new Functions(), {});
    jsEngine.execute('foo()');

    expect(fooHasBeenCalled).toEqual(true);
  });
});
