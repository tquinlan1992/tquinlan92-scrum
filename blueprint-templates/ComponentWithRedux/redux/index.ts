import { makeSimpleReducer } from 'tquinlan92-typescript-redux-utils';
import { thunkActions } from './thunkActions';

export interface State {
}

const initialState = {

};

const { actions: simpleActions, reducer } = makeSimpleReducer<State>('AddTicketDialog', initialState);

export const sampleActions = {
    ...thunkActions,
    ...simpleActions
};

export { reducer as sampleReducer };
