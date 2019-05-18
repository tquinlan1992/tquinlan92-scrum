import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
// import { ticketListActions } from '@components/TicketList/redux';
import { getRemoteDb } from "@headless/database/pouch";
import { pick } from 'lodash';
import { Ticket } from '@headless/database/PouchWrapper';
import { AppState } from "@headless/store/types";

export function addTicket(): ThunkAction<void, AppState, void, AnyAction> {
    return async function (dispatch, getState) {
        const state = getState();
        try {
            const db = await getRemoteDb();
            const { editId } = state.addTicket;
            if (editId) {
                const newTask = pick(state.addTicket, '_id', 'storyPoint', 'description', 'title') as Ticket;
                await db.editTask({
                    ...newTask,
                    _id: editId
                })
            } else {
                await db.addTicket(state.addTicket);
            }
            // await dispatch(ticketListActions.fetchTickets());
        } catch (e) {
            console.log('error adding ticket');
            throw e;
        }
    };
}
