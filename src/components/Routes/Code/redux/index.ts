import { EditCodeState, editCodeStateReducer } from '../EditCode/redux';
import { combineReducers } from 'redux';
import { SelectCodeState, selectCodeReducer } from '../SelectCode/redux/index';

export interface RootCodeState {
    editCode: EditCodeState;
    selectCode: SelectCodeState;
}

export const rootCodeReducer = combineReducers({
    editCode: editCodeStateReducer,
    selectCode: selectCodeReducer
})
