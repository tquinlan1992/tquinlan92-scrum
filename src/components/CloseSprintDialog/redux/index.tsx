import { makeSimpleReducer } from 'tquinlan92-typescript-redux-utils';
import { closeSprintDialogThunkActions } from './thunkActions';

export interface CloseSprintDialogState {
    sprintName: string;
}

const initialState = {
    sprintName: ''
};

const { actions: simpleActions, reducer } = makeSimpleReducer<CloseSprintDialogState>('AddTicketDialog', initialState);

export const closeSprintDialogActions = {
    ...simpleActions,
    ...closeSprintDialogThunkActions
};

export {reducer as closeSprintDialogReducer };
