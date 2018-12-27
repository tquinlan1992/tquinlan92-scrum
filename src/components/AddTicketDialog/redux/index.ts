import { makeSimpleReducer } from 'tquinlan92-typescript-redux-utils';
import thunkActions from './thunkActions';

export interface AddTicketState {
    storyPoint: null | number;
    description: string;
    title: string;
}

const initialState = {
    storyPoint: null,
    description: '',
    title: ''
};

const { actions: simpleActions, reducer } = makeSimpleReducer<AddTicketState>('AddTicketDialog', initialState);

export const actions = {
    ...simpleActions,
    ...thunkActions
};

export default reducer;
