/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export class Comparator {
  static isFunction(fn: any): fn is (...args: any[]) => any {
    return typeof fn === 'function';
  }

  static isInstanceOf<T>(a: any, b: new (...args: any[]) => T): a is T {
    return a instanceof b;
  }

  static isObject(a: any): a is { [key: string]: any } {
    return !!a && typeof a === 'object';
  }

  static isString(a: any): a is string {
    return typeof a === 'string';
  }

  static isDate(a: any): a is Date {
    return a instanceof Date && !isNaN(a.getTime());
  }

  static isInteger(a: any): boolean {
    return Number.isInteger(a);
  }

  static isNumber(a: any): a is number {
    return !isNaN(a) && typeof a === 'number';
  }

  static isBoolean(a: any): a is boolean {
    return typeof a === 'boolean';
  }

  static isArray(a: any): a is any[] {
    return Array.isArray(a);
  }

  static isSet(a: any): a is Set<any> {
    return a instanceof Set;
  }

  static isMap(a: any): a is Map<any, any> {
    return a instanceof Map;
  }

  static isEnum(value: any, enumType: any): value is { [key: string]: any } {
    return Object.values(enumType).includes(value);
  }

  static isEmptyObject(obj: any): obj is { [key: string]: any } {
    return Comparator.isObject(obj) && Object.keys(obj).length === 0;
  }

  static hasProperty(obj: any, property: string): boolean {
    if (Comparator.isObject(obj)) {
      return property in obj;
    } else {
      return false;
    }
  }

  static isEqual(a: any, b: any): boolean {
    if (a === b) {
      return true;
    } else if (Comparator.isArray(a) || Comparator.isArray(b)) {
      if (Comparator.isArray(a) && Comparator.isArray(b) && a.length === b.length) {
        let equal = true;

        for (let index in a) {
          if (!Comparator.isEqual(a[index], b[index])) {
            equal = false;
          }
        }

        return equal;
      } else {
        return false;
      }
    } else if (Comparator.isSet(a) || Comparator.isSet(b)) {
      if (Comparator.isSet(a) && Comparator.isSet(b) && a.size === b.size) {
        let equal = true;

        let arrayA = Array.from(a);
        let arrayB = Array.from(b);

        if (arrayA.length > 0) {
          if (!Comparator.isObject(arrayA[0])) {
            if (!Comparator.isObject(arrayB[0])) {
              a.forEach((item: any) => {
                if (!b.has(item)) {
                  equal = false;
                }
              });
            } else {
              equal = false;
            }
          }

          if (equal) {
            arrayA.sort();
            arrayB.sort();
            equal = Comparator.isEqual(arrayA, arrayB);
          }
        }

        return equal;
      } else {
        return false;
      }
    } else if (Comparator.isMap(a) || Comparator.isMap(b)) {
      if (Comparator.isMap(a) && Comparator.isMap(b) && a.size === b.size) {
        let equal = true;

        a.forEach((value: boolean, key: string) => {
          if (!Comparator.isEqual(value, b.get(key))) {
            equal = false;
          }
        });

        return equal;
      } else {
        return false;
      }
    } else if (Comparator.isDate(a) && Comparator.isDate(b)) {
      return a.getTime() === b.getTime();
    } else if (Comparator.isObject(a) && Comparator.isObject(b)) {
      if (Object.keys(a).length === Object.keys(b).length) {
        let equal = true;

        for (let index in a) {
          if (!Comparator.isEqual(a[index], b[index])) {
            equal = false;
          }
        }

        return equal;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
