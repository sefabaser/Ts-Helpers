import { JsonHelper } from '../json-helper/json-helper';
import { VariableTypes } from '../utility-types/utility-types';

const ReservedWords = new Set(['Boolean']);

export class JSEngine<FunctionsType extends object> {
  readonly variables: { [key: string]: any } = {};
  readonly functions: FunctionsType;
  readonly globalNameSpace: Map<string, VariableTypes> | undefined = new Map();

  private readonly variablesProxy = new Proxy(
    {},
    {
      get: (_: any, property: string) => {
        if (typeof property === 'symbol') {
          return undefined;
        } else if (property === 'Boolean') {
          return Boolean;
        } else if (typeof (this.functions as any)[property] === 'function') {
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
    globalNameSpace?: Map<string, VariableTypes>
  ) {
    this.validateArguments(functions, variables);
    this.variables = variables;
    this.functions = functions;
    this.globalNameSpace = globalNameSpace;
  }

  execute(code: string): void {
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
      throw new Error(`${e}`.replace('Error: ', ''));
    }
  }

  conditionCheck(expression: string): boolean {
    try {
      let fn = new Function(
        'vars',
        `
        with (vars) {
          return Boolean(${expression});
        }
      `
      );
      return fn(this.variablesProxy);
    } catch (e) {
      throw new Error(`${e}`.replace('Error: ', ''));
    }
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
}
