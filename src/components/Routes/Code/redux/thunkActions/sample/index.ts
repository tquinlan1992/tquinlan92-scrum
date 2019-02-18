import { AppThunkAction } from "@headless/store";

export function sample(): AppThunkAction {
    return async (dispatch, getState) => {
        const state = getState();
        state;
    };
}