import { ticketListThunkActions } from './thunkActions';
import { TicketListState } from '@headless/store/types';

export const ticketListStateInitialState: TicketListState = {
    tickets: [],
    sprintTickets: [],
    closedTickets: [],
    backlogTickets: [],
    showCloseSprintDialog: false
};

export { ticketListThunkActions };
