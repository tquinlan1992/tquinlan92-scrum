import { ticketListThunkActions } from './thunkActions';
import { TicketListState } from '@headless/store/types';
import { mergeStateWithActions } from 'tquinlan92-typescript-redux-utils';

export const initialState: TicketListState = {
    tickets: [],
    sprintTickets: [],
    closedTickets: [],
    backlogTickets: [],
    showCloseSprintDialog: false
};

export const ticketListStateInitialState = mergeStateWithActions(initialState);

export { ticketListThunkActions };
