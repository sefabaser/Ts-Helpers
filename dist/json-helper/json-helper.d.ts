export declare class JsonHelper {
    static deepFind(obj: any, path: string): any;
    static deepCopy<T>(target: T): T;
    static mergeMaps(map1: Map<any, any>, map2: Map<any, any>): Map<any, any>;
}
