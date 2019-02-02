import  { loadingThunkActions } from './thunkActions';
import { makeSimpleReducer } from 'tquinlan92-typescript-redux-utils';

export type LoadingState = {
    value: boolean
};

const initialState = {
    value: true
};

const { actions: simpleActions, reducer } = makeSimpleReducer<LoadingState>('Loading', initialState);

export const actions = {
    ...simpleActions,
    ...loadingThunkActions
};

export { reducer as loadingReducer };
