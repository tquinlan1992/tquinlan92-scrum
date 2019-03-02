import { AppThunkAction } from "@headless/store";
import { codeActions } from "../..";
import { getRemoteDb } from "@headless/database/pouch";

export function saveCode(newCode: string): AppThunkAction {
    return async (dispatch) => {
        dispatch(codeActions.code(newCode));
        const db = await getRemoteDb();
        await db.saveCode({newCode, name: 'first code'});
    };
}