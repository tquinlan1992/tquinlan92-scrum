import { ThunkAction } from "redux-thunk";
import { AppStateCore } from "@headless/store";
import { AnyAction } from "redux";
import fetchTickets from "./fetchTickets";
import { getRemoteDB } from "@headless/database/pouch";

export default function closeTicket(id: string): ThunkAction<void, AppStateCore, void, AnyAction> {
    return async function (dispatch) {
        try {
            const db = await getRemoteDB();
            await db.closeTicket(id);
            await dispatch(fetchTickets());
        } catch (e) {
            console.log('error closing ticket');
            throw e;
        }
    };
}
