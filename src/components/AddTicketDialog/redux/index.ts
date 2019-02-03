import { makeSimpleReducer } from 'tquinlan92-typescript-redux-utils';
import { thunkActions } from './thunkActions';

export interface AddTicketState {
    storyPoint: null | number;
    description: string;
    title: string;
    open: boolean;
}

const initialState: AddTicketState  = {
    storyPoint: null,
    description: '',
    title: '',
    open: false
};

const { actions: simpleActions, reducer } = makeSimpleReducer<AddTicketState>('AddTicketDialog', initialState);

export const addTicketDialogActions = {
    ...simpleActions,
    ...thunkActions
};

export { reducer as addTicketDialogReducer };
