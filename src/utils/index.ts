import * as _ from 'lodash';

type PropsMap<M, K extends keyof M> = {[P in K]: M[P]};

export function pick<M extends object, K extends keyof M>(obj: M, ...props: K[]): PropsMap<M, K> {
    // @ts-ignore: TS2352: Type 'PartialDeep<M>' cannot be converted to type 'PropsMap<M, K>'.
    return _.pick<M>(obj, props) as PropsMap<M, K>;
}

export type Diff<T extends string, U extends string> = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];
export type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;
