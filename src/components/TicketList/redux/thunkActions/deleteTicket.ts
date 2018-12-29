import { ThunkAction } from "redux-thunk";
import { AppState } from "@headless/store";
import { AnyAction } from "redux";
import fetchTickets from "./fetchTickets";
import { getRemoteDB } from "@headless/database/pouch";

export default function deleteTicket(id: string): ThunkAction<void, AppState, void, AnyAction> {
    return async function (dispatch) {
        try {
            const db = await getRemoteDB();
            await db.deleteTicket(id);
            await dispatch(fetchTickets());
        } catch (e) {
            console.log('error deleting ticket');
            throw e;
        }
    };
}
