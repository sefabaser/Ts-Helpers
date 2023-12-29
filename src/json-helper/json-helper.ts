/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Comparator } from '../comparator/comparator';

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

  static deepCopy<T>(target: T): T {
    try {
      // eslint-disable-next-line no-null/no-null
      if (target === null) {
        return target;
      }

      if (target instanceof Date) {
        return new Date(target.getTime()) as any;
      }

      if (target instanceof Array) {
        let targetClone = [] as any[];
        (target as any[]).forEach(v => {
          targetClone.push(v);
        });
        return targetClone.map((n: any) => JsonHelper.deepCopy<any>(n)) as any;
      }

      if (target instanceof Set) {
        let targetClone = new Set<any>();
        (target as Set<any>).forEach(v => {
          targetClone.add(JsonHelper.deepCopy<any>(v));
        });
        return targetClone as any;
      }

      if (target instanceof Map) {
        let targetClone = new Map<any, any>();
        (target as Map<any, any>).forEach((v, k) => {
          targetClone.set(k, JsonHelper.deepCopy<any>(v));
        });
        return targetClone as any;
      }

      if (typeof target === 'object') {
        let targetClone = { ...(target as { [key: string]: any }) } as { [key: string]: any };
        Object.keys(targetClone).forEach(k => {
          targetClone[k] = JsonHelper.deepCopy<any>(targetClone[k]);
        });
        return targetClone as T;
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

  static mergeMaps(map1: Map<any, any>, map2: Map<any, any>): Map<any, any> {
    return new Map([...Array.from(map1.entries()), ...Array.from(map2.entries())]);
  }

  static stringify(obj: any): string {
    return JSON.stringify(obj, () => {
      let seen = new WeakSet();
      return (key: any, value: any) => {
        // eslint-disable-next-line no-null/no-null
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
