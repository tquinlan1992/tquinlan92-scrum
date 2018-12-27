import { ThunkAction } from "redux-thunk";
import { AppStateCore } from "@headless/store";
import { AnyAction } from "redux";
import { actions as ticketListActions } from '../..';
import { actions as addTicketActions } from '@components/AddTicketDialog/redux';

export default function addTicketToSprint(): ThunkAction<void, AppStateCore, void, AnyAction> {
    return function (dispatch) {
        dispatch(addTicketActions.reset(null));
        dispatch(ticketListActions.set({ showAddTicketDialog: true }));
    };
}
