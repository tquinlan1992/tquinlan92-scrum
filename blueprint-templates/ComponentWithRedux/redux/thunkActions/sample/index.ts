import { AppThunkAction } from "@headless/store";

export function sample(): AppThunkAction {
    return async function (dispatch, getState) {
        const state = getState();
    };
}