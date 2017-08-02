import { IType, Type } from "../type"
import { TypeFlags } from "../type-flags"
import { IContext, IValidationResult } from "../type-checker"
import { Node } from "../../core"
export declare type ITypeDispatcher = (snapshot: any) => IType<any, any>
export declare class Union extends Type<any, any> {
    readonly dispatcher: ITypeDispatcher | null
    readonly types: IType<any, any>[]
    readonly flags: TypeFlags
    constructor(name: string, types: IType<any, any>[], dispatcher: ITypeDispatcher | null)
    isAssignableFrom(type: IType<any, any>): boolean
    describe(): string
    instantiate(parent: Node, subpath: string, environment: any, value: any): Node
    reconcile(current: Node, newValue: any): Node
    determineType(value: any): IType<any, any>
    isValidSnapshot(value: any, context: IContext): IValidationResult
}
export declare function union<SA, SB, TA, TB>(
    dispatch: ITypeDispatcher,
    A: IType<SA, TA>,
    B: IType<SB, TB>
): IType<SA | SB, TA | TB>
export declare function union<SA, SB, TA, TB>(
    A: IType<SA, TA>,
    B: IType<SB, TB>
): IType<SA | SB, TA | TB>
export declare function union<SA, SB, SC, TA, TB, TC>(
    dispatch: ITypeDispatcher,
    A: IType<SA, TA>,
    B: IType<SB, TB>,
    C: IType<SC, TC>
): IType<SA | SB | SC, TA | TB | TC>
export declare function union<SA, SB, SC, TA, TB, TC>(
    A: IType<SA, TA>,
    B: IType<SB, TB>,
    C: IType<SC, TC>
): IType<SA | SB | SC, TA | TB | TC>
export declare function union<SA, SB, SC, SD, TA, TB, TC, TD>(
    dispatch: ITypeDispatcher,
    A: IType<SA, TA>,
    B: IType<SB, TB>,
    C: IType<SC, TC>,
    D: IType<SD, TD>
): IType<SA | SB | SC | SD, TA | TB | TC | TD>
export declare function union<SA, SB, SC, SD, TA, TB, TC, TD>(
    A: IType<SA, TA>,
    B: IType<SB, TB>,
    C: IType<SC, TC>,
    D: IType<SD, TD>
): IType<SA | SB | SC | SD, TA | TB | TC | TD>
export declare function union<SA, SB, SC, SD, SE, TA, TB, TC, TD, TE>(
    dispatch: ITypeDispatcher,
    A: IType<SA, TA>,
    B: IType<SB, TB>,
    C: IType<SC, TC>,
    D: IType<SD, TD>,
    E: IType<SE, TE>
): IType<SA | SB | SC | SD | SE, TA | TB | TC | TD | TE>
export declare function union<SA, SB, SC, SD, SE, TA, TB, TC, TD, TE>(
    A: IType<SA, TA>,
    B: IType<SB, TB>,
    C: IType<SC, TC>,
    D: IType<SD, TD>,
    E: IType<SE, TE>
): IType<SA | SB | SC | SD | SE, TA | TB | TC | TD | TE>
export declare function union<SA, SB, SC, SD, SE, SF, TA, TB, TC, TD, TE, TF>(
    dispatch: ITypeDispatcher,
    A: IType<SA, TA>,
    B: IType<SB, TB>,
    C: IType<SC, TC>,
    D: IType<SD, TD>,
    E: IType<SE, TE>,
    F: IType<SF, TF>
): IType<SA | SB | SC | SD | SE | SF, TA | TB | TC | TD | TE | TF>
export declare function union<SA, SB, SC, SD, SE, SF, TA, TB, TC, TD, TE, TF>(
    A: IType<SA, TA>,
    B: IType<SB, TB>,
    C: IType<SC, TC>,
    D: IType<SD, TD>,
    E: IType<SE, TE>,
    F: IType<SF, TF>
): IType<SA | SB | SC | SD | SE | SF, TA | TB | TC | TD | TE | TF>
export declare function union<SA, SB, SC, SD, SE, SF, SG, TA, TB, TC, TD, TE, TF, TG>(
    dispatch: ITypeDispatcher,
    A: IType<SA, TA>,
    B: IType<SB, TB>,
    C: IType<SC, TC>,
    D: IType<SD, TD>,
    E: IType<SE, TE>,
    F: IType<SF, TF>,
    G: IType<SG, TG>
): IType<SA | SB | SC | SD | SE | SF | SG, TA | TB | TC | TD | TE | TF | TG>
export declare function union<SA, SB, SC, SD, SE, SF, SG, TA, TB, TC, TD, TE, TF, TG>(
    A: IType<SA, TA>,
    B: IType<SB, TB>,
    C: IType<SC, TC>,
    D: IType<SD, TD>,
    E: IType<SE, TE>,
    F: IType<SF, TF>,
    G: IType<SG, TG>
): IType<SA | SB | SC | SD | SE | SF | SG, TA | TB | TC | TD | TE | TF | TG>
export declare function union<SA, SB, SC, SD, SE, SF, SG, SH, TA, TB, TC, TD, TE, TF, TG, TH>(
    dispatch: ITypeDispatcher,
    A: IType<SA, TA>,
    B: IType<SB, TB>,
    C: IType<SC, TC>,
    D: IType<SD, TD>,
    E: IType<SE, TE>,
    F: IType<SF, TF>,
    G: IType<SG, TG>,
    H: IType<SH, TH>
): IType<SA | SB | SC | SD | SE | SF | SG | SH, TA | TB | TC | TD | TE | TF | TG | TH>
export declare function union<SA, SB, SC, SD, SE, SF, SG, SH, TA, TB, TC, TD, TE, TF, TG, TH>(
    A: IType<SA, TA>,
    B: IType<SB, TB>,
    C: IType<SC, TC>,
    D: IType<SD, TD>,
    E: IType<SE, TE>,
    F: IType<SF, TF>,
    G: IType<SG, TG>,
    H: IType<SH, TH>
): IType<SA | SB | SC | SD | SE | SF | SG | SH, TA | TB | TC | TD | TE | TF | TG | TH>
export declare function union<
    SA,
    SB,
    SC,
    SD,
    SE,
    SF,
    SG,
    SH,
    SI,
    TA,
    TB,
    TC,
    TD,
    TE,
    TF,
    TG,
    TH,
    TI
>(
    dispatch: ITypeDispatcher,
    A: IType<SA, TA>,
    B: IType<SB, TB>,
    C: IType<SC, TC>,
    D: IType<SD, TD>,
    E: IType<SE, TE>,
    F: IType<SF, TF>,
    G: IType<SG, TG>,
    H: IType<SH, TH>,
    I: IType<SI, TI>
): IType<SA | SB | SC | SD | SE | SF | SG | SH | SI, TA | TB | TC | TD | TE | TF | TG | TH | TI>
export declare function union<
    SA,
    SB,
    SC,
    SD,
    SE,
    SF,
    SG,
    SH,
    SI,
    TA,
    TB,
    TC,
    TD,
    TE,
    TF,
    TG,
    TH,
    TI
>(
    A: IType<SA, TA>,
    B: IType<SB, TB>,
    C: IType<SC, TC>,
    D: IType<SD, TD>,
    E: IType<SE, TE>,
    F: IType<SF, TF>,
    G: IType<SG, TG>,
    H: IType<SH, TH>,
    I: IType<SI, TI>
): IType<SA | SB | SC | SD | SE | SF | SG | SH | SI, TA | TB | TC | TD | TE | TF | TG | TH | TI>
export declare function union<
    SA,
    SB,
    SC,
    SD,
    SE,
    SF,
    SG,
    SH,
    SI,
    SJ,
    TA,
    TB,
    TC,
    TD,
    TE,
    TF,
    TG,
    TH,
    TI,
    TJ
>(
    dispatch: ITypeDispatcher,
    A: IType<SA, TA>,
    B: IType<SB, TB>,
    C: IType<SC, TC>,
    D: IType<SD, TD>,
    E: IType<SE, TE>,
    F: IType<SF, TF>,
    G: IType<SG, TG>,
    H: IType<SH, TH>,
    I: IType<SI, TI>,
    J: IType<SJ, TJ>
): IType<
    SA | SB | SC | SD | SE | SF | SG | SH | SI | SJ,
    TA | TB | TC | TD | TE | TF | TG | TH | TI | TJ
>
export declare function union<
    SA,
    SB,
    SC,
    SD,
    SE,
    SF,
    SG,
    SH,
    SI,
    SJ,
    TA,
    TB,
    TC,
    TD,
    TE,
    TF,
    TG,
    TH,
    TI,
    TJ
>(
    A: IType<SA, TA>,
    B: IType<SB, TB>,
    C: IType<SC, TC>,
    D: IType<SD, TD>,
    E: IType<SE, TE>,
    F: IType<SF, TF>,
    G: IType<SG, TG>,
    H: IType<SH, TH>,
    I: IType<SI, TI>,
    J: IType<SJ, TJ>
): IType<
    SA | SB | SC | SD | SE | SF | SG | SH | SI | SJ,
    TA | TB | TC | TD | TE | TF | TG | TH | TI | TJ
>
export declare function union(...types: IType<any, any>[]): IType<any, any>
export declare function union(
    dispatchOrType: ITypeDispatcher | IType<any, any>,
    ...otherTypes: IType<any, any>[]
): IType<any, any>
