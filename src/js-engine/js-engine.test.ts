import { describe, expect, test } from 'vitest';

import { JSEngine } from './js-engine';

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

  describe('Conditions', () => {
    test('sample 1', () => {
      let storyEngine = new JSEngine({}, { a: undefined });

      expect(storyEngine.conditionCheck('a == 1')).toEqual(false);

      storyEngine.execute('a = 1');

      expect(storyEngine.conditionCheck('a == 1')).toEqual(true);
      expect(storyEngine.conditionCheck('a == 2')).toEqual(false);
    });

    test('sample 2', () => {
      let storyEngine = new JSEngine({}, { a: undefined, b: undefined });

      storyEngine.execute('a = 1');
      storyEngine.execute('b = true');

      expect(storyEngine.conditionCheck('a == 1 && b')).toEqual(true);
      expect(storyEngine.conditionCheck('a == 1 || b')).toEqual(true);
    });
  });

  describe('Function Calls', () => {
    test('sample 1', () => {
      let functions = {
        test: () => 1
      };

      let storyEngine = new JSEngine(functions, { a: undefined });

      storyEngine.execute('a = test()');

      expect(storyEngine.variables.a).toEqual(1);
    });

    test('sample 2', () => {
      let functions = {
        test: (param: number) => param
      };

      let storyEngine = new JSEngine(functions, { a: undefined });

      storyEngine.execute('a = test(1)');

      expect(storyEngine.variables.a).toEqual(1);
    });

    test('sample 3', () => {
      let functions = {
        test: (param1: number, param2: number) => param1 + param2
      };

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
      let functions = {
        a: 1,
        test: () => functions.a++
      };

      let storyEngine = new JSEngine(functions, {});
      let copy = storyEngine.duplicate();

      storyEngine.execute('test()');

      expect(storyEngine.functions.a).toEqual(2);
      expect(copy.functions.a).toEqual(1);
    });
  });

  describe('Error Cases', () => {
    test('reserved word cannot be used - function', () => {
      expect(() => new JSEngine({ Boolean: () => undefined }, {})).toThrow(
        'JSEngine: Reserved word "Boolean" cannot be used as a function.'
      );
    });

    test('reserved word cannot be usedn - variable', () => {
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
  });
});
