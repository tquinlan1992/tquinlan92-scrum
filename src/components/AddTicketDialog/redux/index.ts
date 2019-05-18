import { thunkActions as addTicketThunkActions } from './thunkActions';
import { AddTicketState } from '@headless/store/types';

export const addTicketInitialState: AddTicketState = {
    storyPoint: null,
    description: '',
    title: '',
    open: false,
    editId: ''
};

export { addTicketThunkActions };