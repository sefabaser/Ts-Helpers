import Joi from 'joi';
import 'reflect-metadata';

export function Schema(schema: Joi.Schema) {
  return function (target: object, propertyKey: string | symbol, parameterIndex?: number): void {
    if (parameterIndex !== undefined) {
      // Method parameter decorator
      let existingSchemas = Reflect.getOwnMetadata('schemas', target, propertyKey) || [];
      existingSchemas[parameterIndex] = schema;
      Reflect.defineMetadata('schemas', existingSchemas, target, propertyKey);
    } else {
      // Property decorator
      Reflect.defineMetadata('propertySchema', schema, target, propertyKey);
    }
  };
}

function doesExists(target: any, property: string): boolean {
  return Object.prototype.hasOwnProperty.call(target, property) || target[property] !== undefined;
}

export function AutoValidate() {
  return function <T extends new (...args: any[]) => object>(constructor: T): T {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args);

        return new Proxy(this, {
          get(target: any, property: string) {
            if (!doesExists(target, property)) {
              throw new Error(`The property "${property}" do not exists.`);
            }

            // Function parameter validation
            let originalFunction = target[property];
            if (typeof originalFunction === 'function') {
              return function (...functionArgs: any[]) {
                let schemas = Reflect.getOwnMetadata('schemas', constructor.prototype, property);
                if (originalFunction.length < functionArgs.length) {
                  throw new Error(
                    `Unexpected argument has sent to ${property}. Expected: ${originalFunction.length}, Received: ${functionArgs.length}`
                  );
                } else {
                  let requiredArgumentCount = schemas
                    ? schemas.filter((schema: Joi.Schema) => schema._flags.presence === 'required').length
                    : originalFunction.length;
                  if (requiredArgumentCount > functionArgs.length) {
                    throw new Error(
                      `Missing arguments in function "${property}". Expected: ${originalFunction.length}, received: ${functionArgs.length}`
                    );
                  }
                }

                if (schemas) {
                  schemas.forEach((functionArgumentSchema: Joi.Schema, index: number) => {
                    let { error } = functionArgumentSchema.validate(functionArgs[index]);
                    if (error) {
                      throw new Error(`Validation failed for argument at position ${index + 1} in ${property}: ${error.message}`);
                    }
                  });
                }

                return originalFunction.apply(target, functionArgs);
              };
            }

            return target[property];
          },
          set(target: any, property: string, value: any) {
            if (!doesExists(target, property)) {
              throw new Error(`The property "${property}" do not exists.`);
            }

            let schema = Reflect.getOwnMetadata('propertySchema', constructor.prototype, property);
            if (schema) {
              let { error } = schema.validate(value);
              if (error) {
                throw new Error(`Validation failed for property "${property}": ${error.message}`);
              }
            }

            target[property] = value;
            return true;
          }
        });
      }
    };
  };
}
