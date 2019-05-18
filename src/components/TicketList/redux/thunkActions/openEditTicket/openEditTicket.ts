import { ThunkAction } from "redux-thunk";
import { AppState } from "@headless/store/types";
import { AnyAction } from "redux";
import { getRemoteDb } from "@headless/database/pouch";
import { storeActions } from "@headless/store";

export function openEditTask(id: string): ThunkAction<void, AppState, void, AnyAction> {
    return async (dispatch) => {
        dispatch(storeActions.ticketList.openAddTicketDialog());
        const db = await getRemoteDb();
        const taskData = await db.getTicketById(id);
        const { storyPoint, description, title, _id, _rev } = taskData;
        dispatch(storeActions.addTicket.set({ 
            storyPoint,
            description,
            title,
            editId: _id
         }));
    };
}
