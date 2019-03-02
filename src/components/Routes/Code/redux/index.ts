import { EditCodeState, editCodeStateReducer } from '../EditCode/redux';
import { combineReducers } from 'redux';
import { CreateCodeState, createCodeReducer } from '../CreateCode/redux/index';

export interface RootCodeState {
    editCode: EditCodeState;
    createCode: CreateCodeState
}

export const rootCodeReducer = combineReducers({
    editCode: editCodeStateReducer,
    createCode: createCodeReducer
})
