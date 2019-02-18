import { makeSimpleReducer } from 'tquinlan92-typescript-redux-utils';
import { sampleThunkActions } from './thunkActions';

export interface CodeState {
    code: string;
}

const initialState = {
    code: ''
};

const { actions: simpleActions, reducer } = makeSimpleReducer<CodeState>('Code', initialState);

export const codeActions = {
    ...simpleActions,
    ...sampleThunkActions
};

export { reducer as codeStateReducer };
