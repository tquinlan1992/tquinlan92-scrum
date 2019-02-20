import { makeSimpleReducer } from 'tquinlan92-typescript-redux-utils';
import { codeThunkActions } from './thunkActions';

export interface CodeState {
    code: string;
}

const initialState = {
    code: ''
};

const { actions: simpleActions, reducer } = makeSimpleReducer<CodeState>('Code', initialState);

export const codeActions = {
    ...simpleActions,
    ...codeThunkActions
};

export { reducer as codeStateReducer };
