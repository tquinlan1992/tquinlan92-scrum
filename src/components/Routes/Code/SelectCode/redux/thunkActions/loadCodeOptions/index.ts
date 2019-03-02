import { AppThunkAction } from "@headless/store";
import { getRemoteDb } from "@headless/database/pouch";
import { selectCodeActions } from "../..";

export function loadCodeOptions(): AppThunkAction {
    return async (dispatch) => {
        const db = await getRemoteDb();
        const codes = await db.getCodes();
        const options = codes.map( ({name, _id}) => ({
            name,
            _id
        }));
        dispatch(selectCodeActions.options(options));
    };
}