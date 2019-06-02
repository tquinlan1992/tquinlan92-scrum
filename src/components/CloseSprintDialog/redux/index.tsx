import { closeSprintDialogThunkActions } from './thunkActions';
import { CloseSprintDialogState } from '@headless/store/types';
import { mergeStateWithActions } from 'tquinlan92-typescript-redux-utils';

export const initialState: CloseSprintDialogState = {
    sprintName: ''
};

export const closeSprintDialogStateInitialState = mergeStateWithActions(initialState);

export const redux = {
    initialState: closeSprintDialogStateInitialState
}

export { closeSprintDialogThunkActions };
