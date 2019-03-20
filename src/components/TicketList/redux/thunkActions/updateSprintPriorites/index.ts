import { AppThunkAction } from "@headless/store";
import { getRemoteDb } from "@headless/database/pouch";
import { ticketListActions, SprintTicket } from '../../';

export function updateSprintPriorities(newTickets: SprintTicket[], newTicketToAddToSprintId?: string): AppThunkAction {
    return async function (dispatch) {
        try {
            dispatch(ticketListActions.set({sprintTickets: newTickets}));
            let newTicketsWithSprintTicket = newTickets;
            if (newTicketToAddToSprintId) {
                newTicketsWithSprintTicket = newTickets.map(newTicket => {
                    if (newTicket._id === newTicketToAddToSprintId) {
                        return {
                            ...newTicket,
                            sprint: true
                        }
                    } else {
                        return newTicket
                    }
                }) as SprintTicket[];
            }
            const db = await getRemoteDb();
            await db.markTicketPriority(newTicketsWithSprintTicket);
        } catch (e) {
            console.log('error updating ticket priorities');
            throw e;
        }
    };
}
