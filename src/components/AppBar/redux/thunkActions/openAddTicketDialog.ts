
import { AppThunkAction } from "@headless/store";
import openAddTicketDialog from '@components/TicketList/redux/thunkActions/openAddTicketDialog';

export default function(): AppThunkAction {
    return function (dispatch, getState) {
        dispatch(openAddTicketDialog());
    };
}
