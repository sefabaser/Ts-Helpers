import { Comparator } from '../comparator/comparator';

export class JsonHelper {
  static deepFind(obj: any, path: string) {
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

  static deepCopy<T>(target: T): T {
    try {
      if (target === null) {
        return target;
      }

      if (target instanceof Date) {
        return new Date(target.getTime()) as any;
      }

      if (target instanceof Array) {
        const cp = [] as any[];
        (target as any[]).forEach(v => {
          cp.push(v);
        });
        return cp.map((n: any) => JsonHelper.deepCopy<any>(n)) as any;
      }

      if (target instanceof Set) {
        const cp = new Set<any>();
        (target as Set<any>).forEach(v => {
          cp.add(JsonHelper.deepCopy<any>(v));
        });
        return cp as any;
      }

      if (target instanceof Map) {
        const cp = new Map<any, any>();
        (target as Map<any, any>).forEach((v, k) => {
          cp.set(k, JsonHelper.deepCopy<any>(v));
        });
        return cp as any;
      }

      if (typeof target === 'object' && target !== {}) {
        const cp = { ...(target as { [key: string]: any }) } as { [key: string]: any };
        Object.keys(cp).forEach(k => {
          cp[k] = JsonHelper.deepCopy<any>(cp[k]);
        });
        return cp as T;
      }
      return target;
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

  static mergeMaps(map1: Map<any, any>, map2: Map<any, any>) {
    return new Map([...Array.from(map1.entries()), ...Array.from(map2.entries())]);
  }

  static stringify(obj: any) {
    return JSON.stringify(obj, () => {
      const seen = new WeakSet();
      return (key: any, value: any) => {
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
}
