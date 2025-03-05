import 'reflect-metadata';

export class MetaDataHelper {
  static carryMetaData(from: object, to: object): void {
    // Copy reflect metadata
    let metadataKeys = Reflect.getMetadataKeys(from);
    for (let key of metadataKeys) {
      let metadataValue = Reflect.getMetadata(key, from);
      Reflect.defineMetadata(key, metadataValue, to);
    }
  }

  static carryMetaDataOfFunction(from: (...args: any[]) => any, to: (...args: any[]) => any): void {
    MetaDataHelper.carryMetaData(from, to);

    // Copy function length
    Object.defineProperty(to, 'length', {
      value: from.length,
      writable: false
    });
  }
}
