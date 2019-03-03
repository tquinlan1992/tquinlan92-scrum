import * as _ from 'lodash';
import { connect, MapStateToPropsParam, MergeProps } from 'react-redux';
import { AppState } from '@headless/store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

type PropsMap<M, K extends keyof M> = {[P in K]: M[P]};

export function pick<M extends object, K extends keyof M>(obj: M, ...props: K[]): PropsMap<M, K> {
    // @ts-ignore: TS2352: Type 'PartialDeep<M>' cannot be converted to type 'PropsMap<M, K>'.
    return _.pick<M>(obj, props) as PropsMap<M, K>;
}

export type Diff<T extends string, U extends string> = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];

export type AppStateThunkDispatch = ThunkDispatch<AppState, undefined, AnyAction>;
