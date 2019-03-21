import { AppThunkAction } from "@headless/store";
import { getRemoteDb } from "@headless/database/pouch";
import { ticketListActions, BacklogTicket } from '../../';

export function updatePriorities(newTickets: BacklogTicket[], newTicketIdToAddToBacklog?: string): AppThunkAction {
    return async function (dispatch) {
        try {
            dispatch(ticketListActions.set({backlogTickets: newTickets}));
            let newTicketsWithBacklogTicket = newTickets;
            if (newTicketIdToAddToBacklog) {
                newTicketsWithBacklogTicket = newTickets.map(newTicket => {
                    if (newTicket._id === newTicketIdToAddToBacklog) {
                        return {
                            ...newTicket,
                            sprint: false
                        }
                    } else {
                        return newTicket
                    }
                }) as BacklogTicket[];
            }
            const db = await getRemoteDb();
            await db.markTicketPriority(newTicketsWithBacklogTicket);
        } catch (e) {
            console.log('error updating ticket priorities');
            throw e;
        }
    };
}
