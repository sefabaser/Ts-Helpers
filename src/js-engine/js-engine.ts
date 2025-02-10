const ReservedWords = new Set(['Boolean']);

export class JSEngine<FunctionsType extends object> {
  readonly variables: { [key: string]: any } = {};
  private functions: FunctionsType;

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
          throw new Error(`JSEngine: Cannot set a value to the property "${property}". It is already in use as a function.`);
        } else {
          this.variables[property] = value;
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

  constructor(functions: FunctionsType, variables: { [key: string]: any }) {
    this.validateArguments(functions, variables);
    this.variables = variables;
    this.functions = functions;
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
