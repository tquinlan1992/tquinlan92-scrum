import { AppThunkAction } from "@headless/store";
import { ticketListActions } from '../../';
import { closeSprintDialogActions } from '@components/CloseSprintDialog/redux';

export function openCloseSprintDialog(): AppThunkAction {
    return function (dispatch, getState) {
        dispatch(ticketListActions.set({showCloseSprintDialog: true}));
        dispatch(closeSprintDialogActions.reset(null));
    };
}
