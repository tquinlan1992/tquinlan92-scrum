import { AppThunkAction } from "@headless/store";
import { getRemoteDb } from "@headless/database/pouch";
import { codeActions } from "../..";

export function loadCode(): AppThunkAction {
    return async (dispatch) => {
        const db = await getRemoteDb();
        const codeDoc = await db.getCode();
        const newCode = codeDoc ? codeDoc.code : ''
        dispatch(codeActions.code(newCode));
    };
}