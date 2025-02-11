import Joi from 'joi';
import 'reflect-metadata';

export function Schema(schema: Joi.Schema) {
  return function (target: object, propertyKey: string | symbol, parameterIndex?: number): void {
    if (parameterIndex !== undefined) {
      // Function parameter decorator
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

function doesSchemaAllowUndefined<T extends new (...args: any[]) => object>(constructor: T, property: string): boolean {
  let schema = Reflect.getOwnMetadata('propertySchema', constructor.prototype, property);
  if (schema) {
    let { error } = schema.validate(undefined);
    if (!error) {
      return true;
    }
  }

  return false;
}

export function AutoValidate(options?: {
  allowNewProperties?: boolean;
  allowReadingNonExistantProperties?: boolean;
  allowUnsettingProperties?: boolean;
  allowTypeChanges?: boolean;
}) {
  return function <T extends new (...args: any[]) => object>(constructor: T): T {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args);

        return new Proxy(this, {
          get(target: any, property: string) {
            if (
              !options?.allowReadingNonExistantProperties &&
              !doesExists(target, property) &&
              !doesSchemaAllowUndefined(constructor, property)
            ) {
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
                      throw new Error(
                        `Validation failed for argument at position ${index + 1} in ${property}: ${error.message}`
                      );
                    }
                  });
                }

                return originalFunction.apply(target, functionArgs);
              };
            }

            return target[property];
          },
          set(target: any, property: string, value: any) {
            let schema = Reflect.getOwnMetadata('propertySchema', constructor.prototype, property);
            let validatedBySchema = false;
            if (schema) {
              let { error } = schema.validate(value);
              if (error) {
                throw new Error(`Validation failed for property "${property}": ${error.message}`);
              } else {
                validatedBySchema = true;
              }
            }

            if (!validatedBySchema) {
              if (doesExists(target, property)) {
                if (
                  !options?.allowTypeChanges &&
                  !(options?.allowUnsettingProperties && value === undefined) &&
                  typeof target[property] !== typeof value
                ) {
                  throw new Error(
                    `Cannot change the type of the property "${property}". Current type "${typeof target[
                      property
                    ]}", value type "${typeof value}".`
                  );
                }
              } else if (!options?.allowNewProperties) {
                throw new Error(`The property "${property}" do not exists.`);
              }
            }

            target[property] = value;
            return true;
          },
          deleteProperty(target: any, property: string) {
            if (doesExists(target, property)) {
              if (!options?.allowUnsettingProperties && !doesSchemaAllowUndefined(constructor, property)) {
                throw new Error(`Cannot unset the property "${property}".`);
              }
            } else {
              throw new Error(`The property "${property}" do not exists.`);
            }

            delete target[property];
            return true;
          }
        });
      }
    };
  };
}
