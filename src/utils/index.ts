import * as _ from 'lodash';
import { connect, MapStateToPropsParam, MergeProps } from 'react-redux';
import { AppState } from '@headless/store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { history } from '@src/headless/store/middleware/router';

type PropsMap<M, K extends keyof M> = {[P in K]: M[P]};

export function pick<M extends object, K extends keyof M>(obj: M, ...props: K[]): PropsMap<M, K> {
    // @ts-ignore: TS2352: Type 'PartialDeep<M>' cannot be converted to type 'PropsMap<M, K>'.
    return _.pick<M>(obj, props) as PropsMap<M, K>;
}

export type Diff<T extends string, U extends string> = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];

export type AppStateThunkDispatch = ThunkDispatch<AppState, undefined, AnyAction>;

type CreateStylesReturnTheme<C extends string> = Record<C, CSSProperties>;

type GetThemeCallback<C extends string> = (theme: Theme) => CreateStylesReturnTheme<C>;

export function getTheme<C extends string>(getThemeCallback: GetThemeCallback<C>) {
    return (theme: Theme) => getThemeCallback(theme);
}

export function navigateTo(path: string) {
    history.push(path)
}
