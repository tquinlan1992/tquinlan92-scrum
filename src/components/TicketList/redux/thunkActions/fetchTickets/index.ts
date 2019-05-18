import { ThunkAction } from "redux-thunk";
import { AppState, BacklogTicket, SprintTicket, ClosedTicket } from "@headless/store/types";
import { AnyAction } from "redux";
import { getRemoteDb } from "@headless/database/pouch";
import { sortBy } from "lodash";
import { storeActions } from "@headless/store";

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

            const sortedSprintTicketsByPriority = sortBy(sprintTickets, 'priority');

            const closedTickets = tickets.filter(ticket => {
                return !ticket.sprint && ticket.closed;
            }) as ClosedTicket[];

            dispatch(storeActions.ticketList.set({
                backlogTickets: sortedBacklogTicketsByPriority,
                sprintTickets: sortedSprintTicketsByPriority,
                closedTickets
            }));
        } catch (e) {
            console.log('error fetching tickets');
        }
    };
}
