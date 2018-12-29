import { ThunkAction } from "redux-thunk";
import { AppState } from "@headless/store";
import { actions as ticketListActions, SprintTicket, BacklogTicket, ClosedTicket } from "../";
import { AnyAction } from "redux";
import { getRemoteDB } from "@headless/database/pouch";

export default function fetchTickets(): ThunkAction<void, AppState, void, AnyAction> {
    return async function (dispatch) {
        try {
            const db = await getRemoteDB();
            const tickets = await db.getTickets();

            const backlogTickets = tickets.filter(ticket => {
                return !ticket.sprint && !ticket.closed;
            }) as BacklogTicket[];

            const sprintTickets = tickets.filter(ticket => {
                return ticket.sprint;
            }) as SprintTicket[];

            const closedTickets = tickets.filter(ticket => {
                return !ticket.sprint && ticket.closed;
            }) as ClosedTicket[];

            dispatch(ticketListActions.set({
                backlogTickets,
                sprintTickets,
                closedTickets
            }));
        } catch (e) {
            console.log('error fetching tickets');
        }
    };
}
