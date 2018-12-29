import { ThunkAction } from "redux-thunk";
import { AppState } from "@headless/store";
import { AnyAction } from "redux";
import { actions as ticketListActions } from '@components/TicketList/redux';
import { getRemoteDB } from "@headless/database/pouch";

export default function(): ThunkAction<void, AppState, void, AnyAction> {
    return async function (dispatch, getState) {
        const state = getState();
        try {
            const db = await getRemoteDB();
            await db.addTicket(state.addTicket);
            await dispatch(ticketListActions.fetchTickets());
        } catch (e) {
            console.log('error adding ticket');
            throw e;
        }
    };
}
