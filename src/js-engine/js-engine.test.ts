import { describe, expect, test } from 'vitest';

import { JSVariableType } from '../utility-types/utility-types';
import { JSEngine, JSEngineFunction } from './js-engine';

/*
  Untested areas:
  - It is possible to assign a different type to a variable
  - Setting a variable "a.b = 2" does not hit the Proxy (if variable change events will be needed)
*/

describe('JSEngine', () => {
  describe('Assignments', () => {
    test('sample 1', () => {
      let storyEngine = new JSEngine({}, { a: undefined });

      storyEngine.execute('a = 1');

      expect(storyEngine.variables.a).toEqual(1);
    });

    test('sample 2', () => {
      let storyEngine = new JSEngine({}, { a: undefined });

      storyEngine.execute('a = 1');
      storyEngine.execute('a = 2');

      expect(storyEngine.variables.a).toEqual(2);
    });

    test('sample 3 - temporary variables', () => {
      let storyEngine = new JSEngine({}, { a: undefined });

      storyEngine.execute('let temp = 2; a = temp');

      expect(storyEngine.variables.a).toEqual(2);
      expect(Object.hasOwn(storyEngine.variables, 'temp')).toEqual(false);
    });

    test('sample 4 - new variable', () => {
      let storyEngine = new JSEngine({}, {});

      storyEngine.execute('a = 1');

      expect(storyEngine.variables.a).toEqual(1);
    });

    test('sample 4 - erasing variable', () => {
      let storyEngine = new JSEngine({}, { a: 1 });

      expect(storyEngine.variables.a).toEqual(1);

      storyEngine.execute('delete a');

      expect(storyEngine.variables.a).toEqual(undefined);
    });
  });

  describe('Boolean Evaluation', () => {
    test('sample 1', () => {
      let storyEngine = new JSEngine({}, { a: undefined });

      expect(storyEngine.boolean('a == 1')).toEqual(false);

      storyEngine.execute('a = 1');

      expect(storyEngine.boolean('a == 1')).toEqual(true);
      expect(storyEngine.boolean('a == 2')).toEqual(false);
    });

    test('sample 2', () => {
      let storyEngine = new JSEngine({}, { a: undefined, b: undefined });

      storyEngine.execute('a = 1');
      storyEngine.execute('b = true');

      expect(storyEngine.boolean('a == 1 && b')).toEqual(true);
      expect(storyEngine.boolean('a == 1 || b')).toEqual(true);
    });

    test('sample 3', () => {
      class Functions {
        @JSEngineFunction()
        foo(value: string): string {
          return 'hello ' + value;
        }
      }
      let functions = new Functions();
      let storyEngine = new JSEngine(functions, {});

      expect(storyEngine.boolean('foo("world") === "hello world"')).toEqual(true);
    });
  });

  describe('Number Evaluation', () => {
    test('basic number evaluation', () => {
      let storyEngine = new JSEngine({}, {});
      expect(storyEngine.number('42')).toEqual(42);
    });

    test('number evaluation with variables', () => {
      let storyEngine = new JSEngine({}, { x: 42 });
      expect(storyEngine.number('x')).toEqual(42);
    });

    test('number evaluation with arithmetic', () => {
      let storyEngine = new JSEngine({}, { x: 10, y: 5 });
      expect(storyEngine.number('x + y')).toEqual(15);
      expect(storyEngine.number('x - y')).toEqual(5);
      expect(storyEngine.number('x * y')).toEqual(50);
      expect(storyEngine.number('x / y')).toEqual(2);
    });

    test('number evaluation with invalid input', () => {
      let storyEngine = new JSEngine({}, {});
      expect(storyEngine.number('invalid')).toEqual(NaN);
    });

    test('number evaluation with undefined variable', () => {
      let storyEngine = new JSEngine({}, { x: undefined });
      expect(storyEngine.number('x')).toEqual(NaN);
    });

    test('number evaluation with string numbers', () => {
      let storyEngine = new JSEngine({}, { x: '42' });
      expect(storyEngine.number('x')).toEqual(42);
    });

    test('number evaluation with complex expressions', () => {
      let storyEngine = new JSEngine({}, { x: 10, y: 5, z: 2 });
      expect(storyEngine.number('(x + y) * z')).toEqual(30);
      expect(storyEngine.number('x + (y * z)')).toEqual(20);
    });

    test('number evaluation with function call', () => {
      class Functions {
        @JSEngineFunction()
        foo(): number {
          return 42;
        }
      }
      let functions = new Functions();
      let storyEngine = new JSEngine(functions, {});

      expect(storyEngine.number('foo()')).toEqual(42);
    });
  });

  describe('String Evaluation', () => {
    test('basic string evaluation', () => {
      let storyEngine = new JSEngine({}, {});
      expect(storyEngine.string('"hello"')).toEqual('"hello"');
    });

    test('string evaluation with variables', () => {
      let storyEngine = new JSEngine({}, { x: 'hello' });
      expect(storyEngine.string('${x}')).toEqual('hello');
    });

    test('string evaluation with number conversion', () => {
      let storyEngine = new JSEngine({}, { x: 42 });
      expect(storyEngine.string('${x}')).toEqual('42');
    });

    test('string evaluation with boolean conversion', () => {
      let storyEngine = new JSEngine({}, { x: true, y: false });
      expect(storyEngine.string('${x}')).toEqual('true');
      expect(storyEngine.string('${y}')).toEqual('false');
    });

    test('string evaluation with undefined variable', () => {
      let storyEngine = new JSEngine({}, { x: undefined });
      expect(storyEngine.string('${x}')).toEqual('undefined');
    });

    test('string evaluation with object', () => {
      let storyEngine = new JSEngine({}, { x: { a: 1, b: 2 } });
      expect(storyEngine.string('${x}')).toEqual('[object Object]');
    });

    test('string evaluation with array', () => {
      let storyEngine = new JSEngine({}, { x: [1, 2, 3] });
      expect(storyEngine.string('${x}')).toEqual('1,2,3');
    });

    test('string evaluation with concatenation', () => {
      let storyEngine = new JSEngine({}, { x: 'hello', y: 'world' });
      expect(storyEngine.string('${x} ${y}')).toEqual('hello world');
    });

    test('string evaluation with function call', () => {
      class Functions {
        @JSEngineFunction()
        foo(value: string): string {
          return 'hello ' + value;
        }
      }
      let functions = new Functions();
      let storyEngine = new JSEngine(functions, {});

      expect(storyEngine.string('${foo("world")}')).toEqual('hello world');
    });
  });

  describe('Function Calls', () => {
    test('sample 1', () => {
      class Functions {
        @JSEngineFunction()
        test(): number {
          return 1;
        }
      }
      let functions = new Functions();

      let storyEngine = new JSEngine(functions, { a: undefined });

      storyEngine.execute('a = test()');

      expect(storyEngine.variables.a).toEqual(1);
    });

    test('sample 2', () => {
      class Functions {
        @JSEngineFunction()
        test(param: number): number {
          return param;
        }
      }
      let functions = new Functions();

      let storyEngine = new JSEngine(functions, { a: undefined });

      storyEngine.execute('a = test(1)');

      expect(storyEngine.variables.a).toEqual(1);
    });

    test('sample 3', () => {
      class Functions {
        @JSEngineFunction()
        test(param1: number, param2: number): number {
          return param1 + param2;
        }
      }
      let functions = new Functions();

      let storyEngine = new JSEngine(functions, { a: undefined });

      storyEngine.execute('a = test(1, 2)');

      expect(storyEngine.variables.a).toEqual(3);
    });
  });

  describe('Duplicate', () => {
    test('sample 1', () => {
      let storyEngine = new JSEngine({}, { a: 1 });
      let copy = storyEngine.duplicate();

      expect(storyEngine.variables !== copy.variables).toEqual(true);
      expect(storyEngine.variables.a).toEqual(copy.variables.a);
    });

    test('sample 2', () => {
      class Functions {
        a = { b: 1 };
      }
      let functions = new Functions();

      let storyEngine = new JSEngine(functions, {});
      let copy = storyEngine.duplicate();

      expect(storyEngine.functions.a !== copy.functions.a).toEqual(true);
    });

    test('sample 3', () => {
      class Functions {
        a = 1;

        @JSEngineFunction()
        test(param1: number, param2: number): number {
          return this.a++;
        }
      }
      let functions = new Functions();

      let storyEngine = new JSEngine(functions, {});
      let copy = storyEngine.duplicate();

      storyEngine.execute('test()');

      expect(storyEngine.functions.a).toEqual(2);
      expect(copy.functions.a).toEqual(1);
    });

    test('sample 4 - Keeping the global namespace the same', () => {
      let namespace = new Map<string, JSVariableType>();
      let storyEngine = new JSEngine({}, {}, namespace);
      let copy = storyEngine.duplicate();

      storyEngine.execute('a = 1');

      expect(storyEngine.globalNameSpace!.get('a')).toEqual('number');
      expect(copy.globalNameSpace!.get('a')).toEqual('number');
    });
  });

  describe('Error Cases', () => {
    test('reserved word cannot be used - function', () => {
      expect(() => new JSEngine({ Boolean: () => undefined }, {})).toThrow(
        'JSEngine: Reserved word "Boolean" cannot be used as a function.'
      );
    });

    test('reserved word cannot be used - variable', () => {
      expect(() => new JSEngine({}, { Boolean: undefined })).toThrow(
        'JSEngine: Reserved word "Boolean" cannot be used as a variable.'
      );
    });

    test('reserved word cannot be deleted', () => {
      let storyEngine = new JSEngine({}, {});
      expect(() => storyEngine.execute('delete Boolean')).toThrow(
        'JSEngine: Reserved word "Boolean" cannot be deleted.'
      );
    });

    test('reserved word cannot be assigned', () => {
      let storyEngine = new JSEngine({}, {});
      expect(() => storyEngine.execute('Boolean = 1')).toThrow('JSEngine: Reserved word "Boolean" cannot be assigned.');
    });

    test('functions cannot be assigned', () => {
      let storyEngine = new JSEngine({ foo: () => undefined }, {});
      expect(() => storyEngine.execute('foo = 1')).toThrow(
        'JSEngine: Cannot set a value to the property "foo". It is already in use as a function.'
      );
    });

    test('variables cannot share the same name with functions', () => {
      expect(() => new JSEngine({ foo: () => undefined }, { foo: undefined })).toThrow(
        'JSEngine: Reserved word "foo" cannot be used as a variable.'
      );
    });

    test('type changes of globally defined variables', () => {
      let namespace = new Map<string, JSVariableType>();
      let engine1 = new JSEngine({}, {}, namespace);
      let engine2 = new JSEngine({}, {}, namespace);

      engine1.execute('a = 1');

      expect(() => engine2.execute('a = "str"')).toThrow(
        'JSEngine: Type mismatch during variable set. The type of "a" is "string", and it is tried to set to "number".'
      );
    });

    test('type error message', () => {
      let namespace = new Map<string, JSVariableType>();
      let engine = new JSEngine({}, { a: 1 }, namespace);

      expect(() => engine.execute('a.forEach(() => {})')).toThrowError(/^a\.forEach is not a function$/);
    });

    test('given function throws error', () => {
      let errorFunction = (): void => {
        let a = 0;
        for (let item of a as any) {
          console.log(item);
        }
      };

      class Functions {
        @JSEngineFunction()
        test(): void {
          errorFunction();
        }
      }
      let functions = new Functions();

      let storyEngine = new JSEngine(functions, {});
      try {
        storyEngine.execute('test()');
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        let error: Error = e as Error;
        expect(error.stack).toContain('errorFunction');
      }
    });
  });
});
