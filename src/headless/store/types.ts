import { Ticket } from "@headless/database/PouchWrapper";
import { RouterState } from "react-router-redux";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";

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

export type LoadingState = {
    value: boolean
};

export interface AddTicketState {
    storyPoint: null | number;
    description: string;
    title: string;
    open: boolean;
    editId: string;
}

export interface TicketListState {
    tickets: Ticket[];
    sprintTickets: SprintTicket[];
    closedTickets: ClosedTicket[];
    backlogTickets: BacklogTicket[];
    showCloseSprintDialog: boolean;
}

export interface CloseSprintDialogState {
    sprintName: string;
}

export interface AddTicketState {
    storyPoint: null | number;
    description: string;
    title: string;
}


export interface AppState {
    routing: RouterState;
    ticketList: TicketListState;
    addTicket: AddTicketState;
    loading: LoadingState;
    closeSprintDialog: CloseSprintDialogState;
}

export type AppThunkAction = ThunkAction<void, AppState, void, AnyAction>;
