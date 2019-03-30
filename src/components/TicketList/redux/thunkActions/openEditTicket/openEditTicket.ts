import { ThunkAction } from "redux-thunk";
import { AppState } from "@headless/store";
import { AnyAction } from "redux";
import { addTicketDialogActions } from '@components/AddTicketDialog/redux';
import { ticketListActions } from "../..";
import { getRemoteDb } from "@headless/database/pouch";

export function openEditTask(id: string): ThunkAction<void, AppState, void, AnyAction> {
    return async (dispatch) => {
        dispatch(ticketListActions.openAddTicketDialog());
        const db = await getRemoteDb();
        const taskData = await db.getTicketById(id);
        const { storyPoint, description, title, _id, _rev } = taskData;
        dispatch(addTicketDialogActions.set({ 
            storyPoint,
            description,
            title,
            editId: _id
         }));
    };
}
