import { makeSimpleReducer } from 'tquinlan92-typescript-redux-utils';
import { sampleThunkActions } from './thunkActions';

export interface CreateCodeState {
    code: string;
}

export const createNewÇodeInitialState = {
    code: ''
};

const { actions: simpleActions, reducer } = makeSimpleReducer<CreateCodeState>('AddTicketDialog', createNewÇodeInitialState);

export const createCodeActions = {
    ...simpleActions,
    ...sampleThunkActions
};

export { reducer as createCodeReducer };
