import { AppThunkAction } from "@headless/store/types";
import { getRemoteDb } from "@headless/database/pouch";
import { fetchTickets } from "@components/TicketList/redux/thunkActions/fetchTickets";

function closeSprintTickets(sprintName: string): AppThunkAction {
    return async function (dispatch, getState) {
        try {
            const db = await getRemoteDb();
            const state = getState();
            const closedSprintTickets = state.ticketList.sprintTickets.filter(sprintTicket => {
                return sprintTicket.closed;
            });
            const ids = closedSprintTickets.map(ticket => {
                return ticket._id;
            });
            await db.closeTicketsWithSprintID({ids, sprintName});
            return;
        } catch (e) {
            console.log('error closing sprint');
            throw e;
        }
    };
}

export function closeSprint(): AppThunkAction {
    return async function (dispatch, getState) {
        try {
            const state = getState();
            const sprintName = state.closeSprintDialog.sprintName;
            await dispatch(closeSprintTickets(sprintName));
            await dispatch(fetchTickets());
        } catch (e) {
            console.log('error closing sprint');
            throw e;
        }
    };
}
