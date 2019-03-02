import { makeSimpleReducer } from 'tquinlan92-typescript-redux-utils';
import { sampleThunkActions } from './thunkActions';

export interface CreateNewCodeState {
}

export const createNewÇodeInitialState = {

};

const { actions: simpleActions, reducer } = makeSimpleReducer<CreateNewCodeState>('AddTicketDialog', createNewÇodeInitialState);

export const createNewCodeActions = {
    ...simpleActions,
    ...sampleThunkActions
};

export { reducer as createNewCodeReducer };
