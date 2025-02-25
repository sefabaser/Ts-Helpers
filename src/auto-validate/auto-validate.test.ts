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

        expect(() => (variables as any).new).toThrow('The property "new" does not exist.');
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

      test('sample 4 - setting not existing properties', () => {
        @AutoValidate()
        class Variables {}

        let variables = new Variables();

        expect(() => ((variables as any).new = 'a')).toThrow('The property "new" does not exist.');
      });

      test('sample 5 - reading not existing properties', () => {
        @AutoValidate()
        class Variables {}

        let variables = new Variables();

        expect(() => (variables as any).new).toThrow('The property "new" does not exist.');
      });

      test('sample 6 - setting different type', () => {
        @AutoValidate()
        class Variables {
          name: string = 'initial';
        }

        let variables = new Variables();

        expect(() => ((variables as any).name = 1)).toThrow(
          'Cannot change the type of the property "name". Current type "string", value type "number".'
        );
      });

      test('sample 7 - setting undefined to optional property', () => {
        @AutoValidate()
        class Variables {
          @Schema(Joi.string().min(2).max(50).optional()) name: string | undefined = 'initial';
        }

        let variables = new Variables();
        variables.name = undefined;

        expect(variables.name).toEqual(undefined);
      });

      test('sample 8 - reading not existing optional property', () => {
        @AutoValidate()
        class Variables {
          @Schema(Joi.string().min(2).max(50).optional()) name: string | undefined;
        }

        let variables = new Variables();

        expect(variables.name).toEqual(undefined);
      });

      test('sample 9 - deleting optional property', () => {
        @AutoValidate()
        class Variables {
          @Schema(Joi.string().min(2).max(50).optional()) name: string = 'initial';
        }

        let variables = new Variables();
        delete (variables as any).name;

        expect(variables.name).toEqual(undefined);
      });
    });

    describe('Options', () => {
      test('sample 1 - setting new properties', () => {
        @AutoValidate({ allowNewProperties: true })
        class Variables {}

        let variables = new Variables();
        (variables as any).name = 'new';

        expect((variables as any).name).toEqual('new');
      });

      test('sample 2 - reading not existing properties', () => {
        @AutoValidate({ allowReadingNonExistantProperties: true })
        class Variables {}

        let variables = new Variables();

        expect((variables as any).new).toEqual(undefined);
      });

      test('sample 3 - setting undefined to existing properties', () => {
        @AutoValidate({ allowUnsettingProperties: true })
        class Variables {
          name = 'initial';
        }

        let variables = new Variables();
        (variables as any).name = undefined;

        expect((variables as any).name).toEqual(undefined);
      });

      test('sample 4 - deleting an existing properties', () => {
        @AutoValidate({ allowUnsettingProperties: true, allowReadingNonExistantProperties: true })
        class Variables {
          name = 'initial';
        }

        let variables = new Variables();
        delete (variables as any).name;

        expect((variables as any).name).toEqual(undefined);
      });

      test('sample 5 - type change', () => {
        @AutoValidate({ allowTypeChanges: true })
        class Variables {
          name = 'initial';
        }

        let variables = new Variables();
        (variables as any).name = 1;

        expect((variables as any).name).toEqual(1);
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

        expect(() => (functions as any).new()).toThrow('The property "new" does not exist.');
      });

      test('sample 6 - less argument has been sent', () => {
        @AutoValidate()
        class Functions {
          sayHello(name: string): string {
            return `Hello, ${name}!`;
          }
        }

        let functions = new Functions();

        expect(() => (functions as any).sayHello()).toThrow(
          'Missing arguments in function "sayHello". Expected: 1, received: 0'
        );
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

      test('sample 4- should preserve metadata on properties', () => {
        function ActionBeforeTesting() {
          return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            let originalMethod = descriptor.value;

            descriptor.value = function (...args: any[]) {
              let hasFlag = Reflect.getOwnMetadata('actionsBeforeTesting', this);
              if (hasFlag) {
                return originalMethod.apply(this, args);
              } else {
                throw new Error(`Flag not found.`);
              }
            };

            Object.defineProperty(descriptor.value, 'length', {
              value: originalMethod.length,
              writable: false
            });
          };
        }

        @AutoValidate({ allowNewProperties: true })
        class EventSimulator {
          @ActionBeforeTesting()
          setPlayerShipSubSystemType(): void {}
        }

        let instance = new EventSimulator();
        Reflect.defineMetadata('actionsBeforeTesting', true, instance);

        expect(() => instance.setPlayerShipSubSystemType()).not.toThrow();
      });
    });
  });
});
