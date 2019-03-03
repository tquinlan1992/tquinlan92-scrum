import { makeSimpleReducer } from 'tquinlan92-typescript-redux-utils';
import { codeThunkActions } from './thunkActions';

export interface EditCodeState {
    code: string;
    _id: string;
}

export const codeInitialState = {
    code: '',
    _id: ''
};

const { actions: simpleActions, reducer } = makeSimpleReducer<EditCodeState>('Code', codeInitialState);

export const codeActions = {
    ...simpleActions,
    ...codeThunkActions
};

export { reducer as editCodeStateReducer };
