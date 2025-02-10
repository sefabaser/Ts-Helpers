import Joi from 'joi';
import { describe, expect, test } from 'vitest';

import { AutoValidate, Schema } from './auto-validate';

describe('AutoValidate', () => {
  describe('Variables', () => {
    describe('Get', () => {
      test('sample 1 - not decorated', () => {
        @AutoValidate()
        class Variables {
          name: string = 'initial';
        }

        let variables = new Variables();

        expect(variables.name).toEqual('initial');
      });

      test('sample 2 - decorated', () => {
        @AutoValidate()
        class Variables {
          @Schema(Joi.string().min(2).max(50).required()) name: string = 'initial';
        }

        let variables = new Variables();

        expect(variables.name).toEqual('initial');
      });

      test('sample 3 - getting not existing variable', () => {
        @AutoValidate()
        class Variables {
          @Schema(Joi.string().min(2).max(50).required()) name: string = 'initial';
        }

        let variables = new Variables();

        expect(() => (variables as any).new).toThrow('The property "new" do not exists.');
      });
    });

    describe('Set', () => {
      test('sample 1 - not decorated variable', () => {
        @AutoValidate()
        class Variables {
          notDecorated = 1;
        }

        let variables = new Variables();
        variables.notDecorated = 2;

        expect(variables.notDecorated).toEqual(2);
      });

      test('sample 2 - matching schema', () => {
        @AutoValidate()
        class Variables {
          @Schema(Joi.string().min(2).max(50).required()) name: string = 'initial';
        }

        let variables = new Variables();
        variables.name = 'new';

        expect(variables.name).toEqual('new');
      });

      test('sample 3 - not matching schema', () => {
        @AutoValidate()
        class Variables {
          @Schema(Joi.string().min(2).max(50).required()) name: string = 'initial';
        }

        let variables = new Variables();

        expect(() => (variables.name = 'a')).toThrow(
          'Validation failed for property "name": "value" length must be at least 2 characters long'
        );
      });

      test('sample 4 - not existing variable', () => {
        @AutoValidate()
        class Variables {
          @Schema(Joi.string().min(2).max(50).required()) name: string = 'initial';
        }

        let variables = new Variables();

        expect(() => ((variables as any).new = 'a')).toThrow('The property "new" do not exists.');
      });
    });
  });

  describe('Functions', () => {
    describe('Base cases', () => {
      test('sample 1 - not decorated empty function', () => {
        @AutoValidate()
        class Functions {
          sayHello(): void {}
        }

        let functions = new Functions();

        expect(functions.sayHello()).toEqual(undefined);
      });

      test('sample 2 - not decorated with argument', () => {
        @AutoValidate()
        class Functions {
          sayHello(name: string): string {
            return `Hello, ${name}!`;
          }
        }

        let functions = new Functions();

        expect(functions.sayHello('John')).toEqual('Hello, John!');
      });

      test('sample 3 - decorated', () => {
        @AutoValidate()
        class Functions {
          sayHello(@Schema(Joi.string().min(2).max(50).required()) name: string): string {
            return `Hello, ${name}!`;
          }
        }

        let functions = new Functions();

        expect(functions.sayHello('John')).toEqual('Hello, John!');
      });

      test('sample 4 - not matching schema', () => {
        @AutoValidate()
        class Functions {
          sayHello(@Schema(Joi.string().min(2).max(50).required()) name: string): string {
            return `Hello, ${name}!`;
          }
        }

        let functions = new Functions();

        expect(() => functions.sayHello('a')).toThrow(
          'Validation failed for argument at position 1 in sayHello: "value" length must be at least 2 characters long'
        );
      });

      test('sample 5 - not existing function', () => {
        @AutoValidate()
        class Functions {
          sayHello(@Schema(Joi.string().min(2).max(50).required()) name: string): string {
            return `Hello, ${name}!`;
          }
        }

        let functions = new Functions();

        expect(() => (functions as any).new()).toThrow('The property "new" do not exists.');
      });

      test('sample 6 - less argument has been sent', () => {
        @AutoValidate()
        class Functions {
          sayHello(name: string): string {
            return `Hello, ${name}!`;
          }
        }

        let functions = new Functions();

        expect(() => (functions as any).sayHello()).toThrow('Missing arguments in function "sayHello". Expected: 1, received: 0');
      });

      test('sample 7 - more argument has been sent', () => {
        @AutoValidate()
        class Functions {
          sayHello(@Schema(Joi.string().min(2).max(50).required()) name: string): string {
            return `Hello, ${name}!`;
          }
        }

        let functions = new Functions();

        expect(() => (functions as any).sayHello('John', 'Hello')).toThrow(
          'Unexpected argument has sent to sayHello. Expected: 1, Received: 2'
        );
      });

      test('sample 8 - not decorated argument', () => {
        @AutoValidate()
        class Functions {
          sayHello(@Schema(Joi.string().min(2).max(50).required()) name: string, message: string): string {
            return `${message}, ${name}!`;
          }
        }

        let functions = new Functions();

        expect(functions.sayHello('John', 'Hello')).toEqual('Hello, John!');
      });
    });

    describe('Edge cases', () => {
      test('sample 1 - default argument values', () => {
        @AutoValidate()
        class Functions {
          sayHello(@Schema(Joi.string().min(2).max(50)) name: string = 'John'): string {
            return `Hello, ${name}!`;
          }
        }

        let functions = new Functions();

        expect(functions.sayHello()).toEqual('Hello, John!');
      });

      test('sample 2 - optional arguments', () => {
        @AutoValidate()
        class Functions {
          sayHello(@Schema(Joi.string().optional()) name?: string): string {
            return `Hello, ${name}!`;
          }
        }

        let functions = new Functions();

        expect(functions.sayHello()).toEqual('Hello, undefined!');
      });

      test('sample 3 - decorated after non decorated', () => {
        @AutoValidate()
        class Functions {
          sayHello(message: string, @Schema(Joi.string().min(2).max(50).required()) name: string): string {
            return `${message}, ${name}!`;
          }
        }

        let functions = new Functions();

        expect(() => functions.sayHello('Hello', 'a')).toThrow(
          'Validation failed for argument at position 2 in sayHello: "value" length must be at least 2 characters long'
        );
      });
    });
  });
});
