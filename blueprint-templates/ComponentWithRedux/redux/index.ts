import { makeSimpleReducer } from 'tquinlan92-typescript-redux-utils';
import { sampleThunkActions } from './thunkActions';

export interface State {
}

const initialState = {

};

const { actions: simpleActions, reducer } = makeSimpleReducer<State>('AddTicketDialog', initialState);

export const sampleActions = {
    ...simpleActions,
    ...sampleThunkActions
};

export { reducer as sampleReducer };
