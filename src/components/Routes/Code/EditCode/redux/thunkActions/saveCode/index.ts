import { AppThunkAction } from "@headless/store";
import { codeActions } from "../..";
import { getRemoteDb } from "@headless/database/pouch";

export function saveCode(newCode: string): AppThunkAction {
    return async (dispatch, getState) => {
        dispatch(codeActions.code(newCode));
        const state = getState();
        const _id = state.codeState.editCode._id
        const db = await getRemoteDb();
        await db.saveCode({newCode, _id});
    };
}