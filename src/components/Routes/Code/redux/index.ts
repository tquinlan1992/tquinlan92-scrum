import { EditCodeState, editCodeStateReducer } from '../EditCode/redux';
import { combineReducers } from 'redux';

export interface RootCodeState {
    editCode: EditCodeState;
}

export const rootCodeReducer = combineReducers({
    editCode: editCodeStateReducer
})
