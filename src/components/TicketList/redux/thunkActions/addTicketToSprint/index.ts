import { ThunkAction } from "redux-thunk";
import { AppState } from "@headless/store";
import { AnyAction } from "redux";
import { getRemoteDb } from "@headless/database/pouch";

export function addTicketToSprint(id: string): ThunkAction<void, AppState, void, AnyAction> {
    return async function (dispatch) {
        try {
            const db = await getRemoteDb();
            await db.markTicketInSprint({id, sprint: true});
        } catch (e) {
            console.log('error adding ticket');
            throw e;
        }
    };
}
