import { AppThunkAction } from "@headless/store";
import { editCodeActions } from "../..";
import { getRemoteDb } from "@headless/database/pouch";

export function saveCode(newCode: string): AppThunkAction {
    return async (dispatch, getState) => {
        dispatch(editCodeActions.code(newCode));
        const state = getState();
        const _id = state.codeState.editCode._id
        const db = await getRemoteDb();
        await db.saveCode({newCode, _id});
    };
}