/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export class Comparator {
  static isFunction(fn: any): boolean {
    return typeof fn === 'function';
  }

  static isObject(a: any): boolean {
    return !!a && typeof a === 'object';
  }

  static isObservable(a: any): boolean {
    return Comparator.isObject(a) && !!a._subscribe;
  }

  static isString(a: any): boolean {
    return typeof a === 'string';
  }

  static isDate(a: any): boolean {
    return a instanceof Date && !isNaN(a.getTime());
  }

  static isInteger(a: any): boolean {
    return Number.isInteger(a);
  }

  static isNumber(a: any): boolean {
    return !isNaN(a) && typeof a === 'number';
  }

  static isBoolean(a: any): boolean {
    return typeof a === 'boolean';
  }

  static isArray(a: any): boolean {
    return Array.isArray(a);
  }

  static isSet(a: any): boolean {
    return a instanceof Set;
  }

  static isMap(a: any): boolean {
    return a instanceof Map;
  }

  static isEnum(value: any, enumType: any): boolean {
    return Object.values(enumType).includes(value);
  }

  static isEmptyObject(obj: any): boolean {
    return Comparator.isObject(obj) && Object.keys(obj).length === 0;
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

        a.forEach((item: any) => {
          if (!b.has(item)) {
            // TODO: this needs to do deep check
            equal = false;
          }
        });

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
      return (<Date>a).getTime() === (<Date>b).getTime();
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
