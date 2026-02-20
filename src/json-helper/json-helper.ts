import { Comparator } from '../comparator/comparator';
import { MapDifference } from '.';

export const DEEP_COPYABLE_SYMBOL = '_deepCopyable';

export class JsonHelper {
  static deepFind(obj: any, path: string): any {
    if (!path) {
      return obj;
    } else {
      while (path.indexOf('[') >= 0) {
        let startIndex = path.indexOf('[');
        let endIndex = path.indexOf(']');

        if (endIndex === -1) {
          return undefined;
        } else {
          path = `${path.substring(0, endIndex)}${path.substring(endIndex + 1)}`;
          path = `${path.substring(0, startIndex)}.${path.substring(startIndex + 1)}`;
        }
      }

      let paths = path.split('.');
      let current = obj;

      paths.forEach(currentPath => {
        current = (current && current[currentPath]) || undefined;
      });

      return current;
    }
  }

  static deepCopy<T>(
    instance: T,
    options?: {
      skipDeepCopyableSymbol?: boolean;
    }
  ): T {
    try {
      // biome-ignore lint: allowed null
      if (!Comparator.isObject(instance) || instance === null) {
        return instance;
      }

      if (Array.isArray(instance)) {
        return instance.map(item => this.deepCopy(item, options)) as T;
      }

      if (instance instanceof Set) {
        return new Set([...instance].map(item => this.deepCopy(item, options))) as T;
      }

      if (instance instanceof Map) {
        return new Map([...instance].map(([key, value]) => [this.deepCopy(key, options), this.deepCopy(value, options)])) as T;
      }

      if (typeof instance === 'object') {
        let deepCopyableSymbol = options?.skipDeepCopyableSymbol ? undefined : (instance as any)[DEEP_COPYABLE_SYMBOL];
        if (deepCopyableSymbol) {
          if (typeof deepCopyableSymbol === 'function') {
            return deepCopyableSymbol.call(instance) as T;
          } else {
            throw new Error('Deep copy attempt on object with invalid deep copy function!');
          }
        } else {
          let clone = Object.create(Object.getPrototypeOf(instance));

          for (let key of Object.keys(instance)) {
            let value = (instance as any)[key];
            (clone as any)[key] = this.deepCopy(value, options);
          }
          return clone;
        }
      }

      throw new Error(
        `Comparator: all types are exhausted but couldn't found a fitting one. Type: "${typeof instance}", value: "${instance}"`
      );
    } catch (e) {
      if (e instanceof RangeError) {
        throw new Error('Deep copy attempt on circularly dependent object!');
      } else {
        throw e;
      }
    }
  }

  static deepCompare(item1: any, item2: any): boolean {
    return Comparator.isEqual(item1, item2);
  }

  static mergeMaps<T, K>(map1: Map<T, K>, map2: Map<T, K>): Map<T, K> {
    return new Map([...Array.from(map1.entries()), ...Array.from(map2.entries())]);
  }

  static differenceMaps<T, K>(map1: Map<T, K>, map2: Map<T, K>): Map<T, MapDifference<T, K>> {
    let result = new Map<T, MapDifference<T, K>>();
    map1.forEach((value: K, key: T) => {
      let value2 = map2.get(key);
      if (value2) {
        if (value2 === value) {
          result.set(key, { state: 'same', key, value1: value, value2: value2 });
        } else {
          result.set(key, { state: 'different', key, value1: value, value2: value2 });
        }
      } else {
        result.set(key, { state: 'minus', key, value1: value, value2: undefined });
      }
    });
    map2.forEach((value: K, key: T) => {
      let value1 = map1.get(key);
      if (!value1) {
        result.set(key, { state: 'plus', key, value1: undefined, value2: value });
      }
    });
    return result;
  }

  static stringify(obj: any): string {
    return JSON.stringify(obj, () => {
      let seen = new WeakSet();
      return (key: any, value: any) => {
        // biome-ignore lint:all
        if (typeof value === 'object' && value !== null) {
          if (seen.has(value)) {
            return;
          }
          seen.add(value);
        }
        return value;
      };
    });
  }

  static getSubset<T>(obj: T, properties: string[]): Partial<T> {
    if (!Comparator.isObject(obj)) {
      throw new Error(`JsonHelper.getSubset: 'object' type is expected! Type received: '${typeof obj}'`);
    }

    let subset = {};
    properties.forEach(key => {
      // @ts-ignore
      subset[key] = obj[key];
    });
    return subset;
  }

  static arrayToObject<T extends { [key: string]: any }>(
    array: T[],
    keyPath: string,
    options?: {
      transformFunction?: (item: T) => any;
      removeKey?: boolean;
    }
  ): { [key: string]: any } {
    if (keyPath.length === 0) {
      throw new Error(`JsonHelper.arrayToObject: keyPath is empty!`);
    }

    let obj = {};
    array.forEach(item => {
      let key = this.deepFind(item, keyPath);
      if (key === undefined) {
        throw new Error(`JsonHelper.arrayToObject: key '${keyPath}' not found in item '${JSON.stringify(item)}'`);
      }
      if (!Comparator.isString(key)) {
        throw new Error(`JsonHelper.arrayToObject: key '${keyPath}: ${key}' is not a string!`);
      }

      let outputItem = item;
      if (options?.transformFunction) {
        outputItem = options.transformFunction(item);
      }

      if (options?.removeKey) {
        let parentObject: any;
        let keyToRemove: string;

        if (keyPath.indexOf('.') >= 0) {
          let parentKeyPath = keyPath.substring(0, keyPath.lastIndexOf('.'));
          parentObject = this.deepFind(outputItem, parentKeyPath);
          keyToRemove = keyPath.substring(keyPath.lastIndexOf('.') + 1);
        } else {
          parentObject = outputItem;
          keyToRemove = keyPath;
        }

        if (!parentObject) {
          throw new Error(
            `JsonHelper.arrayToObject: parent object not found for keyPath '${keyPath}', object: ${JSON.stringify(outputItem)}`
          );
        }

        delete parentObject[keyToRemove];
      }

      // @ts-ignore
      obj[key] = outputItem;
    });
    return obj;
  }

  static mapToObject<T extends string | number | symbol, K>(
    map: Map<T, K>,
    options?: {
      transformFunction?: (item: T) => K;
    }
  ): Record<T, K> {
    let obj: Record<T, K> = {} as Record<T, K>;
    map.forEach((value, key) => {
      if (options?.transformFunction) {
        obj[key] = options.transformFunction(key);
      } else {
        obj[key] = value;
      }
    });
    return obj;
  }

  static objectToMap<T extends string | number | symbol, K>(object: Record<T, K>): Map<T, K> {
    return new Map(Object.entries(object) as [T, K][]);
  }
}
