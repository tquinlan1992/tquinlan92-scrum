import { AppThunkAction } from "@headless/store/types";
import { storeActions } from "@headless/store";

export function openCloseSprintDialog(): AppThunkAction {
    return function (dispatch, getState) {
        dispatch(storeActions.ticketList.set({showCloseSprintDialog: true}));
        dispatch(storeActions.closeSprintDialog.reset(null));
    };
}
