import { ThunkAction } from "redux-thunk";
import { AppState } from "@headless/store";
import { AnyAction } from "redux";
import { ticketListActions } from '@components/TicketList/redux';
import { getRemoteDb } from "@headless/database/pouch";

export function addTicket(): ThunkAction<void, AppState, void, AnyAction> {
    return async function (dispatch, getState) {
        const state = getState();
        try {
            const db = await getRemoteDb();
            await db.addTicket(state.addTicket);
            await dispatch(ticketListActions.fetchTickets());
        } catch (e) {
            console.log('error adding ticket');
            throw e;
        }
    };
}
