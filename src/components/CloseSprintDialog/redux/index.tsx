import { makeSimpleReducer } from 'tquinlan92-typescript-redux-utils';
import thunkActions from './thunkActions';

export interface State {
    sprintName: string;
}

const initialState = {
    sprintName: ''
};

const { actions: simpleActions, reducer } = makeSimpleReducer<State>('AddTicketDialog', initialState);

export const actions = {
    ...simpleActions,
    ...thunkActions
};

export default reducer;
