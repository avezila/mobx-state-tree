import { IObservableArray } from "mobx"
import { IType, ISimpleType, IComplexType, ISnapshottable } from "./type"
import { TypeFlags } from "./type-flags"
import { IExtendedObservableMap } from "./complex-types/map"
import { IModelType } from "./complex-types/object"
export {
    IType,
    ISimpleType,
    IComplexType,
    IModelType,
    ISnapshottable,
    IExtendedObservableMap,
    TypeFlags
}
export declare const types: {
    enumeration: {
        <E0 extends string, E1 extends string>(name: string, options: [E0, E1]): ISimpleType<
            E0 | E1
        >
        <E0 extends string, E1 extends string>(options: [E0, E1]): ISimpleType<E0 | E1>
        <E0 extends string, E1 extends string, E2 extends string>(
            name: string,
            options: [E0, E1, E2]
        ): ISimpleType<E0 | E1 | E2>
        <E0 extends string, E1 extends string, E2 extends string>(
            options: [E0, E1, E2]
        ): ISimpleType<E0 | E1 | E2>
        <E0 extends string, E1 extends string, E2 extends string, E3 extends string>(
            name: string,
            options: [E0, E1, E2, E3]
        ): ISimpleType<E0 | E1 | E2 | E3>
        <E0 extends string, E1 extends string, E2 extends string, E3 extends string>(
            options: [E0, E1, E2, E3]
        ): ISimpleType<E0 | E1 | E2 | E3>
        <
            E0 extends string,
            E1 extends string,
            E2 extends string,
            E3 extends string,
            E4 extends string
        >(
            name: string,
            options: [E0, E1, E2, E3, E4]
        ): ISimpleType<E0 | E1 | E2 | E3 | E4>
        <
            E0 extends string,
            E1 extends string,
            E2 extends string,
            E3 extends string,
            E4 extends string
        >(
            options: [E0, E1, E2, E3, E4]
        ): ISimpleType<E0 | E1 | E2 | E3 | E4>
        <
            E0 extends string,
            E1 extends string,
            E2 extends string,
            E3 extends string,
            E4 extends string,
            E5 extends string
        >(
            name: string,
            options: [E0, E1, E2, E3, E4, E5]
        ): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5>
        <
            E0 extends string,
            E1 extends string,
            E2 extends string,
            E3 extends string,
            E4 extends string,
            E5 extends string
        >(
            options: [E0, E1, E2, E3, E4, E5]
        ): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5>
        <
            E0 extends string,
            E1 extends string,
            E2 extends string,
            E3 extends string,
            E4 extends string,
            E5 extends string,
            E6 extends string
        >(
            name: string,
            options: [E0, E1, E2, E3, E4, E5, E6]
        ): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6>
        <
            E0 extends string,
            E1 extends string,
            E2 extends string,
            E3 extends string,
            E4 extends string,
            E5 extends string,
            E6 extends string
        >(
            options: [E0, E1, E2, E3, E4, E5, E6]
        ): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6>
        <
            E0 extends string,
            E1 extends string,
            E2 extends string,
            E3 extends string,
            E4 extends string,
            E5 extends string,
            E6 extends string,
            E7 extends string
        >(
            name: string,
            options: [E0, E1, E2, E3, E4, E5, E6, E7]
        ): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7>
        <
            E0 extends string,
            E1 extends string,
            E2 extends string,
            E3 extends string,
            E4 extends string,
            E5 extends string,
            E6 extends string,
            E7 extends string
        >(
            options: [E0, E1, E2, E3, E4, E5, E6, E7]
        ): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7>
        <
            E0 extends string,
            E1 extends string,
            E2 extends string,
            E3 extends string,
            E4 extends string,
            E5 extends string,
            E6 extends string,
            E7 extends string,
            E8 extends string
        >(
            name: string,
            options: [E0, E1, E2, E3, E4, E5, E6, E7, E8]
        ): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8>
        <
            E0 extends string,
            E1 extends string,
            E2 extends string,
            E3 extends string,
            E4 extends string,
            E5 extends string,
            E6 extends string,
            E7 extends string,
            E8 extends string
        >(
            options: [E0, E1, E2, E3, E4, E5, E6, E7, E8]
        ): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8>
        <
            E0 extends string,
            E1 extends string,
            E2 extends string,
            E3 extends string,
            E4 extends string,
            E5 extends string,
            E6 extends string,
            E7 extends string,
            E8 extends string,
            E9 extends string
        >(
            name: string,
            options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9]
        ): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9>
        <
            E0 extends string,
            E1 extends string,
            E2 extends string,
            E3 extends string,
            E4 extends string,
            E5 extends string,
            E6 extends string,
            E7 extends string,
            E8 extends string,
            E9 extends string
        >(
            options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9]
        ): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9>
        <
            E0 extends string,
            E1 extends string,
            E2 extends string,
            E3 extends string,
            E4 extends string,
            E5 extends string,
            E6 extends string,
            E7 extends string,
            E8 extends string,
            E9 extends string,
            E10 extends string
        >(
            name: string,
            options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10]
        ): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10>
        <
            E0 extends string,
            E1 extends string,
            E2 extends string,
            E3 extends string,
            E4 extends string,
            E5 extends string,
            E6 extends string,
            E7 extends string,
            E8 extends string,
            E9 extends string,
            E10 extends string
        >(
            options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10]
        ): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10>
        <
            E0 extends string,
            E1 extends string,
            E2 extends string,
            E3 extends string,
            E4 extends string,
            E5 extends string,
            E6 extends string,
            E7 extends string,
            E8 extends string,
            E9 extends string,
            E10 extends string,
            E11 extends string
        >(
            name: string,
            options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11]
        ): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10 | E11>
        <
            E0 extends string,
            E1 extends string,
            E2 extends string,
            E3 extends string,
            E4 extends string,
            E5 extends string,
            E6 extends string,
            E7 extends string,
            E8 extends string,
            E9 extends string,
            E10 extends string,
            E11 extends string
        >(
            options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11]
        ): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10 | E11>
        <
            E0 extends string,
            E1 extends string,
            E2 extends string,
            E3 extends string,
            E4 extends string,
            E5 extends string,
            E6 extends string,
            E7 extends string,
            E8 extends string,
            E9 extends string,
            E10 extends string,
            E11 extends string,
            E12 extends string
        >(
            name: string,
            options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12]
        ): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10 | E11 | E12>
        <
            E0 extends string,
            E1 extends string,
            E2 extends string,
            E3 extends string,
            E4 extends string,
            E5 extends string,
            E6 extends string,
            E7 extends string,
            E8 extends string,
            E9 extends string,
            E10 extends string,
            E11 extends string,
            E12 extends string
        >(
            options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12]
        ): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10 | E11 | E12>
        <
            E0 extends string,
            E1 extends string,
            E2 extends string,
            E3 extends string,
            E4 extends string,
            E5 extends string,
            E6 extends string,
            E7 extends string,
            E8 extends string,
            E9 extends string,
            E10 extends string,
            E11 extends string,
            E12 extends string,
            E13 extends string
        >(
            name: string,
            options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13]
        ): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10 | E11 | E12 | E13>
        <
            E0 extends string,
            E1 extends string,
            E2 extends string,
            E3 extends string,
            E4 extends string,
            E5 extends string,
            E6 extends string,
            E7 extends string,
            E8 extends string,
            E9 extends string,
            E10 extends string,
            E11 extends string,
            E12 extends string,
            E13 extends string
        >(
            options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13]
        ): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10 | E11 | E12 | E13>
        <
            E0 extends string,
            E1 extends string,
            E2 extends string,
            E3 extends string,
            E4 extends string,
            E5 extends string,
            E6 extends string,
            E7 extends string,
            E8 extends string,
            E9 extends string,
            E10 extends string,
            E11 extends string,
            E12 extends string,
            E13 extends string,
            E14 extends string
        >(
            name: string,
            options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14]
        ): ISimpleType<
            E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10 | E11 | E12 | E13 | E14
        >
        <
            E0 extends string,
            E1 extends string,
            E2 extends string,
            E3 extends string,
            E4 extends string,
            E5 extends string,
            E6 extends string,
            E7 extends string,
            E8 extends string,
            E9 extends string,
            E10 extends string,
            E11 extends string,
            E12 extends string,
            E13 extends string,
            E14 extends string
        >(
            options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14]
        ): ISimpleType<
            E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10 | E11 | E12 | E13 | E14
        >
        <
            E0 extends string,
            E1 extends string,
            E2 extends string,
            E3 extends string,
            E4 extends string,
            E5 extends string,
            E6 extends string,
            E7 extends string,
            E8 extends string,
            E9 extends string,
            E10 extends string,
            E11 extends string,
            E12 extends string,
            E13 extends string,
            E14 extends string,
            E15 extends string
        >(
            name: string,
            options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14, E15]
        ): ISimpleType<
            E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10 | E11 | E12 | E13 | E14 | E15
        >
        <
            E0 extends string,
            E1 extends string,
            E2 extends string,
            E3 extends string,
            E4 extends string,
            E5 extends string,
            E6 extends string,
            E7 extends string,
            E8 extends string,
            E9 extends string,
            E10 extends string,
            E11 extends string,
            E12 extends string,
            E13 extends string,
            E14 extends string,
            E15 extends string
        >(
            options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14, E15]
        ): ISimpleType<
            E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10 | E11 | E12 | E13 | E14 | E15
        >
        <
            E0 extends string,
            E1 extends string,
            E2 extends string,
            E3 extends string,
            E4 extends string,
            E5 extends string,
            E6 extends string,
            E7 extends string,
            E8 extends string,
            E9 extends string,
            E10 extends string,
            E11 extends string,
            E12 extends string,
            E13 extends string,
            E14 extends string,
            E15 extends string,
            E16 extends string
        >(
            name: string,
            options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14, E15, E16]
        ): ISimpleType<
            | E0
            | E1
            | E2
            | E3
            | E4
            | E5
            | E6
            | E7
            | E8
            | E9
            | E10
            | E11
            | E12
            | E13
            | E14
            | E15
            | E16
        >
        <
            E0 extends string,
            E1 extends string,
            E2 extends string,
            E3 extends string,
            E4 extends string,
            E5 extends string,
            E6 extends string,
            E7 extends string,
            E8 extends string,
            E9 extends string,
            E10 extends string,
            E11 extends string,
            E12 extends string,
            E13 extends string,
            E14 extends string,
            E15 extends string,
            E16 extends string
        >(
            options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14, E15, E16]
        ): ISimpleType<
            | E0
            | E1
            | E2
            | E3
            | E4
            | E5
            | E6
            | E7
            | E8
            | E9
            | E10
            | E11
            | E12
            | E13
            | E14
            | E15
            | E16
        >
        <
            E0 extends string,
            E1 extends string,
            E2 extends string,
            E3 extends string,
            E4 extends string,
            E5 extends string,
            E6 extends string,
            E7 extends string,
            E8 extends string,
            E9 extends string,
            E10 extends string,
            E11 extends string,
            E12 extends string,
            E13 extends string,
            E14 extends string,
            E15 extends string,
            E16 extends string,
            E17 extends string
        >(
            name: string,
            options: [
                E0,
                E1,
                E2,
                E3,
                E4,
                E5,
                E6,
                E7,
                E8,
                E9,
                E10,
                E11,
                E12,
                E13,
                E14,
                E15,
                E16,
                E17
            ]
        ): ISimpleType<
            | E0
            | E1
            | E2
            | E3
            | E4
            | E5
            | E6
            | E7
            | E8
            | E9
            | E10
            | E11
            | E12
            | E13
            | E14
            | E15
            | E16
            | E17
        >
        <
            E0 extends string,
            E1 extends string,
            E2 extends string,
            E3 extends string,
            E4 extends string,
            E5 extends string,
            E6 extends string,
            E7 extends string,
            E8 extends string,
            E9 extends string,
            E10 extends string,
            E11 extends string,
            E12 extends string,
            E13 extends string,
            E14 extends string,
            E15 extends string,
            E16 extends string,
            E17 extends string
        >(
            options: [
                E0,
                E1,
                E2,
                E3,
                E4,
                E5,
                E6,
                E7,
                E8,
                E9,
                E10,
                E11,
                E12,
                E13,
                E14,
                E15,
                E16,
                E17
            ]
        ): ISimpleType<
            | E0
            | E1
            | E2
            | E3
            | E4
            | E5
            | E6
            | E7
            | E8
            | E9
            | E10
            | E11
            | E12
            | E13
            | E14
            | E15
            | E16
            | E17
        >
        <
            E0 extends string,
            E1 extends string,
            E2 extends string,
            E3 extends string,
            E4 extends string,
            E5 extends string,
            E6 extends string,
            E7 extends string,
            E8 extends string,
            E9 extends string,
            E10 extends string,
            E11 extends string,
            E12 extends string,
            E13 extends string,
            E14 extends string,
            E15 extends string,
            E16 extends string,
            E17 extends string,
            E18 extends string
        >(
            name: string,
            options: [
                E0,
                E1,
                E2,
                E3,
                E4,
                E5,
                E6,
                E7,
                E8,
                E9,
                E10,
                E11,
                E12,
                E13,
                E14,
                E15,
                E16,
                E17,
                E18
            ]
        ): ISimpleType<
            | E0
            | E1
            | E2
            | E3
            | E4
            | E5
            | E6
            | E7
            | E8
            | E9
            | E10
            | E11
            | E12
            | E13
            | E14
            | E15
            | E16
            | E17
            | E18
        >
        <
            E0 extends string,
            E1 extends string,
            E2 extends string,
            E3 extends string,
            E4 extends string,
            E5 extends string,
            E6 extends string,
            E7 extends string,
            E8 extends string,
            E9 extends string,
            E10 extends string,
            E11 extends string,
            E12 extends string,
            E13 extends string,
            E14 extends string,
            E15 extends string,
            E16 extends string,
            E17 extends string,
            E18 extends string
        >(
            options: [
                E0,
                E1,
                E2,
                E3,
                E4,
                E5,
                E6,
                E7,
                E8,
                E9,
                E10,
                E11,
                E12,
                E13,
                E14,
                E15,
                E16,
                E17,
                E18
            ]
        ): ISimpleType<
            | E0
            | E1
            | E2
            | E3
            | E4
            | E5
            | E6
            | E7
            | E8
            | E9
            | E10
            | E11
            | E12
            | E13
            | E14
            | E15
            | E16
            | E17
            | E18
        >
        (options: string[]): ISimpleType<string>
        (name: string, options: string[]): ISimpleType<string>
    }
    model: {
        <T = {}, S = {}, A = {}>(
            name: string,
            properties: { [K in keyof T]: T[K] | IType<any, T[K]> } &
                ThisType<
                    {
                        readonly $treenode?: any
                    } & T &
                        S
                >,
            volatileState: { [K in keyof S]: S[K] | ((self?: any) => S[K]) } &
                ThisType<
                    {
                        readonly $treenode?: any
                    } & T &
                        S
                >,
            operations: A &
                ThisType<
                    {
                        readonly $treenode?: any
                    } & T &
                        A &
                        S
                >
        ): IModelType<
            T & {
                readonly $treenode?: any
            },
            S,
            A
        >
        <T = {}, S = {}, A = {}>(
            name: string,
            properties: { [K in keyof T]: T[K] | IType<any, T[K]> } &
                ThisType<
                    {
                        readonly $treenode?: any
                    } & T &
                        S
                >,
            operations?:
                | (A &
                      ThisType<
                          {
                              readonly $treenode?: any
                          } & T &
                              A &
                              S
                      >)
                | undefined
        ): IModelType<
            T & {
                readonly $treenode?: any
            },
            S,
            A
        >
        <T = {}, S = {}, A = {}>(
            properties: { [K in keyof T]: T[K] | IType<any, T[K]> } &
                ThisType<
                    {
                        readonly $treenode?: any
                    } & T &
                        S
                >,
            volatileState: { [K in keyof S]: S[K] | ((self?: any) => S[K]) } &
                ThisType<
                    {
                        readonly $treenode?: any
                    } & T &
                        S
                >,
            operations: A &
                ThisType<
                    {
                        readonly $treenode?: any
                    } & T &
                        A &
                        S
                >
        ): IModelType<
            T & {
                readonly $treenode?: any
            },
            S,
            A
        >
        <T = {}, S = {}, A = {}>(
            properties: { [K in keyof T]: T[K] | IType<any, T[K]> } &
                ThisType<
                    {
                        readonly $treenode?: any
                    } & T &
                        S
                >,
            operations?:
                | (A &
                      ThisType<
                          {
                              readonly $treenode?: any
                          } & T &
                              A &
                              S
                      >)
                | undefined
        ): IModelType<
            T & {
                readonly $treenode?: any
            },
            S,
            A
        >
    }
    compose: {
        <T1, S1, A1, T2, S2, A2, T3, S3, A3>(
            t1: IModelType<T1, S1, A1>,
            t2: IModelType<T2, S2, A2>,
            t3?: IModelType<T3, S3, A3> | undefined
        ): IModelType<
            {
                readonly $treenode?: any
            } & T1 &
                T2 &
                T3,
            S1 & S2 & S3,
            A1 & A2 & A3
        >
        <T1, S1, A1, T2, S2, A2, T3, S3, A3>(
            name: string,
            t1: IModelType<T1, S1, A1>,
            t2: IModelType<T2, S2, A2>,
            t3?: IModelType<T3, S3, A3> | undefined
        ): IModelType<
            {
                readonly $treenode?: any
            } & T1 &
                T2 &
                T3,
            S1 & S2 & S3,
            A1 & A2 & A3
        >
        <BASE_T, BASE_S, BASE_A, T, S, A>(
            name: string,
            baseType: IModelType<BASE_T, BASE_S, BASE_A>,
            properties: { [K in keyof T]: T[K] | IType<any, T[K]> } &
                ThisType<
                    {
                        readonly $treenode?: any
                    } & T &
                        BASE_T
                >,
            volatileState: { [K in keyof S]: S[K] | ((self?: any) => S[K]) } &
                ThisType<
                    {
                        readonly $treenode?: any
                    } & BASE_T &
                        T &
                        BASE_S &
                        S
                >,
            operations: A & ThisType<BASE_T & T & BASE_S & S & BASE_A & A>
        ): IModelType<
            {
                readonly $treenode?: any
            } & BASE_T &
                T,
            BASE_S & S,
            BASE_A & A
        >
        <BASE_T, BASE_S, BASE_A, T, S, A>(
            name: string,
            baseType: IModelType<BASE_T, BASE_S, BASE_A>,
            properties: { [K in keyof T]: T[K] | IType<any, T[K]> } &
                ThisType<
                    {
                        readonly $treenode?: any
                    } & T &
                        BASE_T
                >,
            operations?: (A & ThisType<BASE_T & T & BASE_S & S & BASE_A & A>) | undefined
        ): IModelType<
            {
                readonly $treenode?: any
            } & BASE_T &
                T,
            BASE_S & S,
            BASE_A & A
        >
        <BASE_T, BASE_S, BASE_A, T, S, A>(
            baseType: IModelType<BASE_T, BASE_S, BASE_A>,
            properties: { [K in keyof T]: T[K] | IType<any, T[K]> } &
                ThisType<
                    {
                        readonly $treenode?: any
                    } & T &
                        BASE_T
                >,
            volatileState: { [K in keyof S]: S[K] | ((self?: any) => S[K]) } &
                ThisType<
                    {
                        readonly $treenode?: any
                    } & BASE_T &
                        T &
                        BASE_S &
                        S
                >,
            operations: A & ThisType<BASE_T & T & BASE_S & S & BASE_A & A>
        ): IModelType<
            {
                readonly $treenode?: any
            } & BASE_T &
                T,
            BASE_S & S,
            BASE_A & A
        >
        <BASE_T, BASE_S, BASE_A, T, S, A>(
            baseType: IModelType<BASE_T, BASE_S, BASE_A>,
            properties: { [K in keyof T]: T[K] | IType<any, T[K]> } &
                ThisType<
                    {
                        readonly $treenode?: any
                    } & T &
                        BASE_T
                >,
            operations?: (A & ThisType<BASE_T & T & BASE_S & S & BASE_A & A>) | undefined
        ): IModelType<
            {
                readonly $treenode?: any
            } & BASE_T &
                T,
            BASE_S & S,
            BASE_A & A
        >
    }
    reference: <T>(factory: IType<any, T>) => IType<string | number, T>
    union: {
        <SA, SB, TA, TB>(
            dispatch: (snapshot: any) => IType<any, any>,
            A: IType<SA, TA>,
            B: IType<SB, TB>
        ): IType<SA | SB, TA | TB>
        <SA, SB, TA, TB>(A: IType<SA, TA>, B: IType<SB, TB>): IType<SA | SB, TA | TB>
        <SA, SB, SC, TA, TB, TC>(
            dispatch: (snapshot: any) => IType<any, any>,
            A: IType<SA, TA>,
            B: IType<SB, TB>,
            C: IType<SC, TC>
        ): IType<SA | SB | SC, TA | TB | TC>
        <SA, SB, SC, TA, TB, TC>(A: IType<SA, TA>, B: IType<SB, TB>, C: IType<SC, TC>): IType<
            SA | SB | SC,
            TA | TB | TC
        >
        <SA, SB, SC, SD, TA, TB, TC, TD>(
            dispatch: (snapshot: any) => IType<any, any>,
            A: IType<SA, TA>,
            B: IType<SB, TB>,
            C: IType<SC, TC>,
            D: IType<SD, TD>
        ): IType<SA | SB | SC | SD, TA | TB | TC | TD>
        <SA, SB, SC, SD, TA, TB, TC, TD>(
            A: IType<SA, TA>,
            B: IType<SB, TB>,
            C: IType<SC, TC>,
            D: IType<SD, TD>
        ): IType<SA | SB | SC | SD, TA | TB | TC | TD>
        <SA, SB, SC, SD, SE, TA, TB, TC, TD, TE>(
            dispatch: (snapshot: any) => IType<any, any>,
            A: IType<SA, TA>,
            B: IType<SB, TB>,
            C: IType<SC, TC>,
            D: IType<SD, TD>,
            E: IType<SE, TE>
        ): IType<SA | SB | SC | SD | SE, TA | TB | TC | TD | TE>
        <SA, SB, SC, SD, SE, TA, TB, TC, TD, TE>(
            A: IType<SA, TA>,
            B: IType<SB, TB>,
            C: IType<SC, TC>,
            D: IType<SD, TD>,
            E: IType<SE, TE>
        ): IType<SA | SB | SC | SD | SE, TA | TB | TC | TD | TE>
        <SA, SB, SC, SD, SE, SF, TA, TB, TC, TD, TE, TF>(
            dispatch: (snapshot: any) => IType<any, any>,
            A: IType<SA, TA>,
            B: IType<SB, TB>,
            C: IType<SC, TC>,
            D: IType<SD, TD>,
            E: IType<SE, TE>,
            F: IType<SF, TF>
        ): IType<SA | SB | SC | SD | SE | SF, TA | TB | TC | TD | TE | TF>
        <SA, SB, SC, SD, SE, SF, TA, TB, TC, TD, TE, TF>(
            A: IType<SA, TA>,
            B: IType<SB, TB>,
            C: IType<SC, TC>,
            D: IType<SD, TD>,
            E: IType<SE, TE>,
            F: IType<SF, TF>
        ): IType<SA | SB | SC | SD | SE | SF, TA | TB | TC | TD | TE | TF>
        <SA, SB, SC, SD, SE, SF, SG, TA, TB, TC, TD, TE, TF, TG>(
            dispatch: (snapshot: any) => IType<any, any>,
            A: IType<SA, TA>,
            B: IType<SB, TB>,
            C: IType<SC, TC>,
            D: IType<SD, TD>,
            E: IType<SE, TE>,
            F: IType<SF, TF>,
            G: IType<SG, TG>
        ): IType<SA | SB | SC | SD | SE | SF | SG, TA | TB | TC | TD | TE | TF | TG>
        <SA, SB, SC, SD, SE, SF, SG, TA, TB, TC, TD, TE, TF, TG>(
            A: IType<SA, TA>,
            B: IType<SB, TB>,
            C: IType<SC, TC>,
            D: IType<SD, TD>,
            E: IType<SE, TE>,
            F: IType<SF, TF>,
            G: IType<SG, TG>
        ): IType<SA | SB | SC | SD | SE | SF | SG, TA | TB | TC | TD | TE | TF | TG>
        <SA, SB, SC, SD, SE, SF, SG, SH, TA, TB, TC, TD, TE, TF, TG, TH>(
            dispatch: (snapshot: any) => IType<any, any>,
            A: IType<SA, TA>,
            B: IType<SB, TB>,
            C: IType<SC, TC>,
            D: IType<SD, TD>,
            E: IType<SE, TE>,
            F: IType<SF, TF>,
            G: IType<SG, TG>,
            H: IType<SH, TH>
        ): IType<SA | SB | SC | SD | SE | SF | SG | SH, TA | TB | TC | TD | TE | TF | TG | TH>
        <SA, SB, SC, SD, SE, SF, SG, SH, TA, TB, TC, TD, TE, TF, TG, TH>(
            A: IType<SA, TA>,
            B: IType<SB, TB>,
            C: IType<SC, TC>,
            D: IType<SD, TD>,
            E: IType<SE, TE>,
            F: IType<SF, TF>,
            G: IType<SG, TG>,
            H: IType<SH, TH>
        ): IType<SA | SB | SC | SD | SE | SF | SG | SH, TA | TB | TC | TD | TE | TF | TG | TH>
        <SA, SB, SC, SD, SE, SF, SG, SH, SI, TA, TB, TC, TD, TE, TF, TG, TH, TI>(
            dispatch: (snapshot: any) => IType<any, any>,
            A: IType<SA, TA>,
            B: IType<SB, TB>,
            C: IType<SC, TC>,
            D: IType<SD, TD>,
            E: IType<SE, TE>,
            F: IType<SF, TF>,
            G: IType<SG, TG>,
            H: IType<SH, TH>,
            I: IType<SI, TI>
        ): IType<
            SA | SB | SC | SD | SE | SF | SG | SH | SI,
            TA | TB | TC | TD | TE | TF | TG | TH | TI
        >
        <SA, SB, SC, SD, SE, SF, SG, SH, SI, TA, TB, TC, TD, TE, TF, TG, TH, TI>(
            A: IType<SA, TA>,
            B: IType<SB, TB>,
            C: IType<SC, TC>,
            D: IType<SD, TD>,
            E: IType<SE, TE>,
            F: IType<SF, TF>,
            G: IType<SG, TG>,
            H: IType<SH, TH>,
            I: IType<SI, TI>
        ): IType<
            SA | SB | SC | SD | SE | SF | SG | SH | SI,
            TA | TB | TC | TD | TE | TF | TG | TH | TI
        >
        <SA, SB, SC, SD, SE, SF, SG, SH, SI, SJ, TA, TB, TC, TD, TE, TF, TG, TH, TI, TJ>(
            dispatch: (snapshot: any) => IType<any, any>,
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
        <SA, SB, SC, SD, SE, SF, SG, SH, SI, SJ, TA, TB, TC, TD, TE, TF, TG, TH, TI, TJ>(
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
        (...types: IType<any, any>[]): IType<any, any>
        (
            dispatchOrType: IType<any, any> | ((snapshot: any) => IType<any, any>),
            ...otherTypes: IType<any, any>[]
        ): IType<any, any>
    }
    optional: {
        <S, T>(type: IType<S, T>, defaultValueOrFunction: S): IType<S, T>
        <S, T>(type: IType<S, T>, defaultValueOrFunction: T): IType<S, T>
        <S, T>(type: IType<S, T>, defaultValueOrFunction: () => S): IType<S, T>
        <S, T>(type: IType<S, T>, defaultValueOrFunction: () => T): IType<S, T>
    }
    literal: <S>(value: S) => ISimpleType<S>
    maybe: <S, T>(type: IType<S, T>) => IType<S | null | undefined, T | null>
    refinement: {
        <T>(name: string, type: IType<T, T>, predicate: (snapshot: T) => boolean): IType<T, T>
        <S, T extends S, U extends S>(
            name: string,
            type: IType<S, T>,
            predicate: (snapshot: S) => snapshot is U
        ): IType<S, U>
    }
    string: ISimpleType<string>
    boolean: ISimpleType<boolean>
    number: ISimpleType<number>
    Date: IType<number, Date>
    map: <S, T>(
        subtype: IType<S, T>
    ) => IComplexType<
        {
            [key: string]: S
        },
        IExtendedObservableMap<T>
    >
    array: <S, T>(subtype: IType<S, T>) => IComplexType<S[], IObservableArray<T>>
    frozen: ISimpleType<any>
    identifier: {
        <T>(baseType: IType<T, T>): IType<T, T>
        <T>(): T
    }
    late: {
        <S = any, T = any>(type: () => IType<S, T>): IType<S, T>
        <S = any, T = any>(name: string, type: () => IType<S, T>): IType<S, T>
    }
    undefined: ISimpleType<undefined>
    null: ISimpleType<null>
}
