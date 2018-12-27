import thunkActions from './thunkActions';
import { Ticket } from '@database/PouchWrapper';
import { makeSimpleReducer } from 'tquinlan92-typescript-redux-utils';

export type Tickets = Ticket[];

export interface ClosedTicket extends Ticket {
    closed: true;
    sprint: false;
} 

export interface SprintTicket extends Ticket {
    sprint: true;
}

export interface BacklogTicket extends Ticket {
    sprint: false;
    closed: false;
}

export interface TicketListState {
    showAddTicketDialog: boolean;
    tickets: Ticket[];
    sprintTickets: SprintTicket[];
    closedTickets: ClosedTicket[];
    backlogTickets: BacklogTicket[];
    showCloseSprintDialog: boolean;
}

const initialState = {
    showAddTicketDialog: false,
    tickets: [],
    sprintTickets: [],
    closedTickets: [],
    backlogTickets: [],
    showCloseSprintDialog: false
};

const { actions: simpleActions, reducer } = makeSimpleReducer<TicketListState>('TicketList', initialState);

export const actions = {
    ...simpleActions,
    ...thunkActions
};

export default reducer;
