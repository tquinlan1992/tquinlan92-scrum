import { AppThunkAction } from "@headless/store";
import { getRemoteDb } from "@headless/database/pouch";
import { ticketListActions, BacklogTicket } from '../../';
import { sortBy } from "lodash";

export function updatePriorities(newTickets: BacklogTicket[]): AppThunkAction {
    return async function (dispatch) {
        try {
            const newTicketsOrderedByPriority = sortBy(newTickets, 'priority');
            dispatch(ticketListActions.set({backlogTickets: newTicketsOrderedByPriority}));
            const db = await getRemoteDb();
            newTickets.forEach(async ({_id, priority}) =>{
                await db.markTicketPriority({id: _id, priority});
            });
        } catch (e) {
            console.log('error updating ticket priorities');
            throw e;
        }
    };
}
