export declare class Comparator {
    static isFunction(fn: any): boolean;
    static isObject(a: any): boolean;
    static isString(a: any): boolean;
    static isDate(a: any): boolean;
    static isInteger(a: any): boolean;
    static isNumber(a: any): boolean;
    static isBoolean(a: any): boolean;
    static isArray(a: any): boolean;
    static isSet(a: any): boolean;
    static isMap(a: any): boolean;
    static isEnum(value: any, enumType: any): boolean;
    static isEmptyObject(obj: any): boolean;
    static isEqual(a: any, b: any): boolean;
}
