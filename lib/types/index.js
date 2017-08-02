// tslint:disable-next-line:no_unused-variable
import { TypeFlags } from "./type-flags"
// tslint:disable-next-line:no_unused-variable
import { map } from "./complex-types/map"
import { array } from "./complex-types/array"
import { identifier } from "./utility-types/identifier"
// tslint:disable-next-line:no_unused-variable
import { model, compose } from "./complex-types/object"
import { reference } from "./utility-types/reference"
import { union } from "./utility-types/union"
import { optional } from "./utility-types/optional"
import { literal } from "./utility-types/literal"
import { maybe } from "./utility-types/maybe"
import { refinement } from "./utility-types/refinement"
import { frozen } from "./utility-types/frozen"
import { boolean, DatePrimitive, number, string, undefinedType, nullType } from "./primitives"
import { late } from "./utility-types/late"
import { enumeration } from "./utility-types/enumeration"
export { TypeFlags }
export var types = {
    enumeration: enumeration,
    model: model,
    compose: compose,
    reference: reference,
    union: union,
    optional: optional,
    literal: literal,
    maybe: maybe,
    refinement: refinement,
    string: string,
    boolean: boolean,
    number: number,
    Date: DatePrimitive,
    map: map,
    array: array,
    frozen: frozen,
    identifier: identifier,
    late: late,
    undefined: undefinedType,
    null: nullType
}
//# sourceMappingURL=index.js.map
