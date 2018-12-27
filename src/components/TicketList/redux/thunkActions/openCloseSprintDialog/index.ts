import { AppThunkAction } from "@headless/store";
import { actions as ticketListActions } from '../../';
import { actions as closeSprintDialogActions } from '@components/CloseSprintDialog/redux';

export default function openCloseSprintDialog(): AppThunkAction {
    return function (dispatch, getState) {
        dispatch(ticketListActions.set({showCloseSprintDialog: true}));
        dispatch(closeSprintDialogActions.reset(null));
    };
}
