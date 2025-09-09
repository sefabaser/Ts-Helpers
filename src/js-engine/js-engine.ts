import { Comparator } from '../comparator/comparator';
import { JsonHelper } from '../json-helper/json-helper';
import { MetaDataHelper } from '../meta-data-helper/meta-data.helper';
import { JSVariableType } from '../utility-types/utility-types';

import 'reflect-metadata';

const ReservedWords = new Set(['Boolean', 'Number', 'String']);

const JSEngineExecutionFlag = 'jsEngineExecutionFlag';
const JSEngineFunctionFlag = 'JSEngineFunctionFlag';

export function JSEngineFunction() {
  return function (_: unknown, propertyKey: string, descriptor: PropertyDescriptor): void {
    let originalFunction = descriptor.value;
    JSEngine.setAsJSEngineFunction(originalFunction);

    descriptor.value = function (...args: any[]) {
      let hasFlag = Reflect.getOwnMetadata(JSEngineExecutionFlag, this);
      if (hasFlag) {
        return originalFunction.apply(this, args);
      } else {
        throw new Error(`"${String(propertyKey)}(...)" can only be usable by JSEngine.`);
      }
    };

    MetaDataHelper.carryMetaDataOfFunction(originalFunction, descriptor.value);
  };
}

export class JSEngine<FunctionsType extends object> {
  static isJSEngineFunction(fn: (...args: any[]) => any): boolean {
    return Comparator.isFunction(fn) ? Reflect.getOwnMetadata(JSEngineFunctionFlag, fn) === true : false;
  }

  static setAsJSEngineFunction(fn: (...args: any[]) => any): void {
    Reflect.defineMetadata(JSEngineFunctionFlag, true, fn);
  }

  readonly variables: { [key: string]: any } = {};
  readonly functions: FunctionsType;

  globalNameSpace: Map<string, JSVariableType> | undefined;

  private readonly variablesProxy = new Proxy(
    {},
    {
      get: (_: any, property: string) => {
        if (typeof property === 'symbol') {
          return undefined;
        } else if (property === 'Boolean') {
          return Boolean;
        } else if (property === 'Number') {
          return Number;
        } else if (property === 'String') {
          return String;
        } else if (typeof (this.functions as any)[property] === 'function') {
          if (!JSEngine.isJSEngineFunction((this.functions as any)[property])) {
            throw new Error(
              `"${property}(...)" is not a JSEngine function, it cannot be called during the executions.`
            );
          }

          return (...args: any[]) => (this.functions as any)[property](...args);
        } else if (Object.hasOwn(this.variables, property)) {
          return this.variables[property];
        }
      },
      set: (_: any, property: string, value: any) => {
        if (ReservedWords.has(property)) {
          throw new Error(`JSEngine: Reserved word "${property}" cannot be assigned.`);
        } else if (Object.prototype.hasOwnProperty.call(this.functions, property)) {
          throw new Error(
            `JSEngine: Cannot set a value to the property "${property}". It is already in use as a function.`
          );
        } else if (
          this.globalNameSpace &&
          this.globalNameSpace.has(property) &&
          typeof value !== this.globalNameSpace.get(property)
        ) {
          throw new Error(
            `JSEngine: Type mismatch during variable set. The type of "${property}" is "${typeof value}", and it is tried to set to "${this.globalNameSpace.get(
              property
            )}".`
          );
        } else {
          this.variables[property] = value;
          if (this.globalNameSpace) {
            this.globalNameSpace.set(property, typeof value);
          }
          return true;
        }
      },
      has() {
        return true;
      },
      deleteProperty: (_: any, property: string): boolean => {
        if (ReservedWords.has(property)) {
          throw new Error(`JSEngine: Reserved word "${property}" cannot be deleted.`);
        } else {
          delete this.variables[property];
          return true;
        }
      }
    }
  );

  constructor(
    functions: FunctionsType,
    variables: { [key: string]: any },
    globalNameSpace?: Map<string, JSVariableType>
  ) {
    this.validateArguments(functions, variables);
    this.variables = variables;
    this.functions = functions;
    this.globalNameSpace = globalNameSpace;
  }

  execute(code: string): void {
    Reflect.defineMetadata(JSEngineExecutionFlag, true, this.functions);

    let fn = new Function(
      'vars',
      `
      with (vars) {
        ${code};
      }
    `
    );

    try {
      fn(this.variablesProxy);
    } catch (e) {
      this.reThrowError(e);
    }

    Reflect.defineMetadata(JSEngineExecutionFlag, false, this.functions);
  }

  boolean(expression: string): boolean {
    Reflect.defineMetadata(JSEngineExecutionFlag, true, this.functions);

    let result: boolean;
    try {
      let fn = new Function(
        'vars',
        `
        with (vars) {
          return Boolean(${expression});
        }
      `
      );
      result = fn(this.variablesProxy);
    } catch (e) {
      this.reThrowError(e);
      return false;
    }

    Reflect.defineMetadata(JSEngineExecutionFlag, false, this.functions);
    return result;
  }

  number(expression: string): number {
    Reflect.defineMetadata(JSEngineExecutionFlag, true, this.functions);

    let result: number;
    try {
      let fn = new Function(
        'vars',
        `
        with (vars) {
          return Number(${expression});
        }
      `
      );
      result = fn(this.variablesProxy);
    } catch (e) {
      this.reThrowError(e);
      return 0;
    }

    Reflect.defineMetadata(JSEngineExecutionFlag, false, this.functions);
    return result;
  }

  string(expression: string): string {
    Reflect.defineMetadata(JSEngineExecutionFlag, true, this.functions);

    let result: string;
    try {
      let fn = new Function(
        'vars',
        `
        with (vars) {
          return String(\`${expression}\`);
        }
      `
      );
      result = fn(this.variablesProxy);
    } catch (e) {
      this.reThrowError(e);
      return '';
    }

    Reflect.defineMetadata(JSEngineExecutionFlag, false, this.functions);
    return result;
  }

  duplicate(): JSEngine<FunctionsType> {
    let variables = JsonHelper.deepCopy(this.variables);
    let functions = JsonHelper.deepCopy(this.functions);
    return new JSEngine(functions, variables, this.globalNameSpace);
  }

  private validateArguments(functions: FunctionsType, variables: { [key: string]: any }): void {
    ReservedWords.forEach(reservedWord => {
      if (Object.hasOwn(variables, reservedWord)) {
        throw new Error(`JSEngine: Reserved word "${reservedWord}" cannot be used as a variable.`);
      }
      if (Object.hasOwn(functions, reservedWord)) {
        throw new Error(`JSEngine: Reserved word "${reservedWord}" cannot be used as a function.`);
      }
    });

    Object.getOwnPropertyNames(functions).forEach(functionName => {
      if (Object.prototype.hasOwnProperty.call(variables, functionName)) {
        throw new Error(`JSEngine: Reserved word "${functionName}" cannot be used as a variable.`);
      }
    });
  }

  private reThrowError(e: unknown): void {
    if (e instanceof Error) {
      e.message = e.message.replace(/^.*Error: /, '');
      throw e; // Preserve original stack trace
    } else {
      throw new Error(`${e}`.replace(/^.*Error: /, ''));
    }
  }
}
