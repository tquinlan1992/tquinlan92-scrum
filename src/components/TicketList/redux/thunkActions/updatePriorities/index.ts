import { AppThunkAction } from "@headless/store";
import { getRemoteDB } from "@headless/database/pouch";
import { actions as ticketListActions, BacklogTicket } from '../../';

export default function updatePriorities(newTickets: BacklogTicket[]): AppThunkAction {
    return async function (dispatch) {
        try {
            dispatch(ticketListActions.set({backlogTickets: newTickets}));
            const db = await getRemoteDB();
            newTickets.forEach(async ({_id, priority}) =>{
                await db.markTicketPriority({id: _id, priority});
            });
        } catch (e) {
            console.log('error updating ticket priorities');
            throw e;
        }
    };
}
