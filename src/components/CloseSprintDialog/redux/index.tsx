import { closeSprintDialogThunkActions } from './thunkActions';
import { CloseSprintDialogState } from '@headless/store/types';

export const closeSprintDialogStateInitialState: CloseSprintDialogState = {
    sprintName: ''
};

export const redux = {
    initialState: closeSprintDialogStateInitialState
}

export { closeSprintDialogThunkActions };
