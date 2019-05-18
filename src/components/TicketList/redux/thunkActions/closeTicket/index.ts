import { ThunkAction } from "redux-thunk";
import { AppState } from "@headless/store/types";
import { AnyAction } from "redux";
import { fetchTickets } from "../fetchTickets";
import { getRemoteDb } from "@headless/database/pouch";

export function closeTicket(id: string): ThunkAction<void, AppState, void, AnyAction> {
    return async function (dispatch) {
        try {
            const db = await getRemoteDb();
            await db.closeTicket(id);
            await dispatch(fetchTickets());
        } catch (e) {
            console.log('error closing ticket');
            throw e;
        }
    };
}
