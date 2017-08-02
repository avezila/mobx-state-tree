export var TypeFlags
;(function(TypeFlags) {
    TypeFlags[(TypeFlags["String"] = 1)] = "String"
    TypeFlags[(TypeFlags["Number"] = 2)] = "Number"
    TypeFlags[(TypeFlags["Boolean"] = 4)] = "Boolean"
    TypeFlags[(TypeFlags["Date"] = 8)] = "Date"
    TypeFlags[(TypeFlags["Literal"] = 16)] = "Literal"
    TypeFlags[(TypeFlags["Array"] = 32)] = "Array"
    TypeFlags[(TypeFlags["Map"] = 64)] = "Map"
    TypeFlags[(TypeFlags["Object"] = 128)] = "Object"
    TypeFlags[(TypeFlags["Frozen"] = 256)] = "Frozen"
    TypeFlags[(TypeFlags["Optional"] = 512)] = "Optional"
    TypeFlags[(TypeFlags["Reference"] = 1024)] = "Reference"
    TypeFlags[(TypeFlags["Identifier"] = 2048)] = "Identifier"
    TypeFlags[(TypeFlags["Late"] = 4096)] = "Late"
    TypeFlags[(TypeFlags["Refinement"] = 8192)] = "Refinement"
    TypeFlags[(TypeFlags["Union"] = 16384)] = "Union"
    TypeFlags[(TypeFlags["Null"] = 32768)] = "Null"
    TypeFlags[(TypeFlags["Undefined"] = 65536)] = "Undefined"
})(TypeFlags || (TypeFlags = {}))
export function isType(value) {
    return typeof value === "object" && value && value.isType === true
}
export function isPrimitiveType(type) {
    return (
        isType(type) &&
        (type.flags & (TypeFlags.String | TypeFlags.Number | TypeFlags.Boolean | TypeFlags.Date)) >
            0
    )
}
export function isArrayType(type) {
    return isType(type) && (type.flags & TypeFlags.Array) > 0
}
export function isMapType(type) {
    return isType(type) && (type.flags & TypeFlags.Map) > 0
}
export function isObjectType(type) {
    return isType(type) && (type.flags & TypeFlags.Object) > 0
}
export function isFrozenType(type) {
    return isType(type) && (type.flags & TypeFlags.Frozen) > 0
}
export function isIdentifierType(type) {
    return isType(type) && (type.flags & TypeFlags.Identifier) > 0
}
export function isLateType(type) {
    return isType(type) && (type.flags & TypeFlags.Late) > 0
}
export function isLiteralType(type) {
    return isType(type) && (type.flags & TypeFlags.Literal) > 0
}
export function isOptionalType(type) {
    return isType(type) && (type.flags & TypeFlags.Optional) > 0
}
export function isReferenceType(type) {
    return (type.flags & TypeFlags.Reference) > 0
}
export function isRefinementType(type) {
    return (type.flags & TypeFlags.Refinement) > 0
}
export function isUnionType(type) {
    return (type.flags & TypeFlags.Union) > 0
}
//# sourceMappingURL=type-flags.js.map
