import { AppThunkAction } from "@headless/store";
import { getRemoteDb } from "@headless/database/pouch";
import { selectCodeActions } from "../..";
import { editCodeActions } from "@components/Routes/Code/EditCode/redux";

export function loadCodeOptions(): AppThunkAction {
    return async (dispatch) => {
        const db = await getRemoteDb();
        const codes = await db.getCodes();
        dispatch(selectCodeActions.options(codes));
        const firstCodeOption = codes[0];
        if (firstCodeOption) {
            dispatch(editCodeActions.loadCode(firstCodeOption._id));
        }
    };
}