import { ThunkAction } from "redux-thunk";
import { AppState } from "@headless/store";
import { AnyAction } from "redux";
import { addTicketDialogActions } from '@components/AddTicketDialog/redux';

export function openAddTicketDialog(): ThunkAction<void, AppState, void, AnyAction> {
    return function (dispatch) {
        dispatch(addTicketDialogActions.reset(null));
        dispatch(addTicketDialogActions.set({ open: true }));
    };
}
