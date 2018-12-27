import { ThunkAction } from "redux-thunk";
import { AppStateCore } from "@headless/store";
import { AnyAction } from "redux";
import { actions as ticketListActions } from '@components/TicketList/redux';
import { getRemoteDB } from "@headless/database/pouch";

export default function(): ThunkAction<void, AppStateCore, void, AnyAction> {
    return async function (dispatch, getState) {
        const state = getState();
        try {
            const db = await getRemoteDB();
            await db.addTicket(state.core.addTicket);
            await dispatch(ticketListActions.fetchTickets());
        } catch (e) {
            console.log('error adding ticket');
            throw e;
        }
    };
}
