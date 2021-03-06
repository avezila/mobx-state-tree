export declare const EMPTY_ARRAY: ReadonlyArray<never>
export declare type IDisposer = () => void
export declare function fail(message?: string): never
export declare function identity<T>(_: T): T
export declare function nothing(): null
export declare function noop(): void
export declare function isArray(val: any): boolean
export declare function asArray<T>(val: undefined | null | T | T[]): T[]
export declare function extend<A, B>(a: A, b: B): A & B
export declare function extend<A, B, C>(a: A, b: B, c: C): A & B & C
export declare function extend<A, B, C, D>(a: A, b: B, c: C, d: D): A & B & C & D
export declare function extend(a: any, ...b: any[]): any
export declare function extendKeepGetter<A, B>(a: A, b: B): A & B
export declare function extendKeepGetter<A, B, C>(a: A, b: B, c: C): A & B & C
export declare function extendKeepGetter<A, B, C, D>(a: A, b: B, c: C, d: D): A & B & C & D
export declare function extendKeepGetter(a: any, ...b: any[]): any
export declare function isPlainObject(value: any): boolean
export declare function isMutable(value: any): boolean
export declare function isPrimitive(value: any): boolean
export declare function isGeneratorFunction(value: any): boolean
export declare function freeze<T>(value: T): T
export declare function deepFreeze<T>(value: T): T
export declare function isSerializable(value: any): boolean
export declare function addHiddenFinalProp(object: any, propName: string, value: any): void
export declare function addHiddenWritableProp(object: any, propName: string, value: any): void
export declare function addReadOnlyProp(object: any, propName: string, value: any): void
export declare function registerEventHandler(handlers: Function[], handler: Function): IDisposer
export declare function hasOwnProperty(object: Object, propName: string): any
export declare function argsToArray(args: IArguments): any[]
