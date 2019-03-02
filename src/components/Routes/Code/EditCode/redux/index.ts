import { makeSimpleReducer } from 'tquinlan92-typescript-redux-utils';
import { codeThunkActions } from './thunkActions';

export interface EditCodeState {
    code: string;
}

export const codeInitialState = {
    code: ''
};

const { actions: simpleActions, reducer } = makeSimpleReducer<EditCodeState>('Code', codeInitialState);

export const codeActions = {
    ...simpleActions,
    ...codeThunkActions
};

export { reducer as editCodeStateReducer };
