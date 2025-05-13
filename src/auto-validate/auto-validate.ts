import Joi from 'joi';
import 'reflect-metadata';

import { MetaDataHelper } from '../meta-data-helper/meta-data.helper';

const FunctionParameterSchemasKey = 'AutoValidateFunctionParameterSchemas';
const PropertySchemaKey = 'AutoValidatePropertySchema';

export function Schema(schema: Joi.Schema) {
  return function (target: object, propertyKey: string | symbol, parameterIndex?: number): void {
    if (parameterIndex !== undefined) {
      // Function parameter decorator
      let existingSchemas = Reflect.getOwnMetadata(FunctionParameterSchemasKey, target, propertyKey) || [];
      existingSchemas[parameterIndex] = schema;
      Reflect.defineMetadata(FunctionParameterSchemasKey, existingSchemas, target, propertyKey);
    } else {
      // Property decorator
      Reflect.defineMetadata(PropertySchemaKey, schema, target, propertyKey);
    }
  };
}

function doesExists(target: any, property: string): boolean {
  return Object.prototype.hasOwnProperty.call(target, property) || target[property] !== undefined;
}

function doesSchemaAllowUndefined<T extends new (...args: any[]) => object>(constructor: T, property: string): boolean {
  let schema = Reflect.getOwnMetadata(PropertySchemaKey, constructor.prototype, property);
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
              throw new Error(`The property "${property}" does not exist.`);
            }

            // Function parameter validation
            let originalFunction = target[property];
            if (typeof originalFunction === 'function') {
              let wrappedFunction = function (...functionArgs: any[]): void {
                let schemas =
                  Reflect.getOwnMetadata(FunctionParameterSchemasKey, constructor.prototype, property) ||
                  Reflect.getMetadata(FunctionParameterSchemasKey, constructor.prototype, property);
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
                    if (functionArgumentSchema) {
                      let { error } = functionArgumentSchema.validate(functionArgs[index]);
                      if (error) {
                        throw new Error(
                          `Validation failed for argument at position ${index + 1} in ${property}: ${error.message}`
                        );
                      }
                    }
                  });
                }

                // @ts-ignore
                // Use the "proxy" object instead of "target". So the "this" keyword will target the proxy not the original object in function decorators.
                return originalFunction.apply(this, functionArgs);
              };

              MetaDataHelper.carryMetaDataOfFunction(originalFunction, wrappedFunction);
              return wrappedFunction;
            } else {
              return target[property];
            }
          },
          set(target: any, property: string, value: any) {
            let schema = Reflect.getOwnMetadata(PropertySchemaKey, constructor.prototype, property);
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
                throw new Error(`The property "${property}" does not exist.`);
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
              throw new Error(`The property "${property}" does not exist.`);
            }

            delete target[property];
            return true;
          }
        });
      }
    };
  };
}
