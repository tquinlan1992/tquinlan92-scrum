import { makeSimpleReducer } from 'tquinlan92-typescript-redux-utils';
import { thunkActions } from './thunkActions';

interface Option {
    _id: string;
}

export interface SelectCodeState {
    options: Option[]
}

const selectCodeInititalState = {
    options: []
};

const { actions: simpleActions, reducer } = makeSimpleReducer<SelectCodeState>('SelectCodeInitialState', selectCodeInititalState);

export const selectCodeActions = {
    ...simpleActions,
    ...thunkActions
};

export { reducer as selectCodeReducer };
