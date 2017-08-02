import { IType, IComplexType } from "./type"
import { CoreType } from "./primitives"
import { IExtendedObservableMap } from "./complex-types/map"
import { ObjectType } from "./complex-types/object"
import { IdentifierType } from "./utility-types/identifier"
import { ReferenceType } from "./utility-types/reference"
import { Refinement } from "./utility-types/refinement"
import { Union } from "./utility-types/union"
import { OptionalValue } from "./utility-types/optional"
import { Frozen } from "./utility-types/frozen"
import { Late } from "./utility-types/late"
import { Literal } from "./utility-types/literal"
import { IObservableArray } from "mobx"
export declare enum TypeFlags {
    String = 1,
    Number = 2,
    Boolean = 4,
    Date = 8,
    Literal = 16,
    Array = 32,
    Map = 64,
    Object = 128,
    Frozen = 256,
    Optional = 512,
    Reference = 1024,
    Identifier = 2048,
    Late = 4096,
    Refinement = 8192,
    Union = 16384,
    Null = 32768,
    Undefined = 65536
}
export declare function isType(value: any): value is IType<any, any>
export declare function isPrimitiveType(type: any): type is CoreType<any, any>
export declare function isArrayType<S, T>(type: any): type is IComplexType<S[], IObservableArray<T>>
export declare function isMapType<S, T>(
    type: any
): type is IComplexType<
    {
        [key: string]: S
    },
    IExtendedObservableMap<T>
>
export declare function isObjectType(type: any): type is ObjectType
export declare function isFrozenType(type: any): type is Frozen<any>
export declare function isIdentifierType(type: any): type is IdentifierType<any>
export declare function isLateType(type: any): type is Late<any, any>
export declare function isLiteralType(type: any): type is Literal<any>
export declare function isOptionalType(type: any): type is OptionalValue<any, any>
export declare function isReferenceType(type: any): type is ReferenceType<any>
export declare function isRefinementType(type: any): type is Refinement<any, any>
export declare function isUnionType(type: any): type is Union
