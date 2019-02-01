import { ThunkAction } from "redux-thunk";
import { AppState } from "@headless/store";
import { ticketListActions, SprintTicket, BacklogTicket, ClosedTicket } from "../..";
import { AnyAction } from "redux";
import { getRemoteDb } from "@headless/database/pouch";
import { sortBy } from "lodash";

export function fetchTickets(): ThunkAction<void, AppState, void, AnyAction> {
    return async function (dispatch) {
        try {
            const db = await getRemoteDb();
            const tickets = await db.getTickets();

            const backlogTickets = tickets.filter(ticket => {
                return !ticket.sprint && !ticket.closed;
            }) as BacklogTicket[];

            const sortedBacklogTicketsByPriority = sortBy(backlogTickets, 'priority');

            const sprintTickets = tickets.filter(ticket => {
                return ticket.sprint;
            }) as SprintTicket[];

            const closedTickets = tickets.filter(ticket => {
                return !ticket.sprint && ticket.closed;
            }) as ClosedTicket[];

            dispatch(ticketListActions.set({
                backlogTickets: sortedBacklogTicketsByPriority,
                sprintTickets,
                closedTickets
            }));
        } catch (e) {
            console.log('error fetching tickets');
        }
    };
}
