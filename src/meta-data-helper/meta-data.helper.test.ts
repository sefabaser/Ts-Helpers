import { describe, expect, it } from 'vitest';

import { MetaDataHelper } from './meta-data.helper';

import 'reflect-metadata';

describe('MetaDataHelper', () => {
  it('should copy metadata from one object to another', () => {
    class Source {}
    class Target {}

    Reflect.defineMetadata('testKey', 'testValue', Source);
    MetaDataHelper.carryMetaData(Source, Target);

    expect(Reflect.getMetadata('testKey', Target)).toBe('testValue');
  });

  it('should copy metadata from one function to another', () => {
    class Foo {
      test(a: string, b: number): void {}
    }

    let instance = new Foo();
    Reflect.defineMetadata('testKey', 'testValue', instance.test);

    // Replace the function with a new function
    let originalFunction = instance.test;
    instance.test = function (...args: any[]) {
      return originalFunction.apply(this, args);
    };

    MetaDataHelper.carryMetaDataOfFunction(originalFunction, instance.test);

    expect(Reflect.getMetadata('testKey', instance.test)).toBe('testValue');
    expect(instance.test.length).toBe(2);
  });
});
