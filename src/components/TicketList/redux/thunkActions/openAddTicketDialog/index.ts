import { ThunkAction } from "redux-thunk";
import { AppState } from "@headless/store/types";
import { AnyAction } from "redux";
import { storeActions } from "@headless/store";

export function openAddTicketDialog(): ThunkAction<void, AppState, void, AnyAction> {
    return function (dispatch) {
        dispatch(storeActions.addTicket.resetAll());
        dispatch(storeActions.addTicket.set({ open: true }));
    };
}
