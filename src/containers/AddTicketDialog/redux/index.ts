import { thunkActions as addTicketThunkActions } from './thunkActions';
import { AddTicketState } from '@headless/store/types';
import { mergeStateWithActions } from 'tquinlan92-typescript-redux-utils';

export const initialState: AddTicketState = {
    storyPoint: null,
    description: '',
    title: '',
    open: false,
    editId: ''
};

export const addTicketInitialState = mergeStateWithActions(initialState);

export { addTicketThunkActions };