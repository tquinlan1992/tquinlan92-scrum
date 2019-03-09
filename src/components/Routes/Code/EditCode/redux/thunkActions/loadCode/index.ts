import { AppThunkAction } from "@headless/store";
import { getRemoteDb } from "@headless/database/pouch";
import { editCodeActions } from "../..";

export function loadCode(id: string): AppThunkAction {
    return async (dispatch) => {
        const db = await getRemoteDb();
        const codeDoc = await db.getCode(id);
        const newCode = codeDoc ? codeDoc.code : '';
        dispatch(editCodeActions.set({code: newCode, _id: id}));
    };
}