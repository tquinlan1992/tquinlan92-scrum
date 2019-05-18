import { createStore, applyMiddleware, AnyAction, Store, combineReducers } from "redux";
import { middleware } from './middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerReducer } from "react-router-redux";
import { AppState } from "./types";
import { makeNestedSimpleStore } from "tquinlan92-typescript-redux-utils";
import { ticketListStateInitialState, ticketListThunkActions } from "@components/TicketList/redux";
import { addTicketInitialState, addTicketThunkActions } from "@components/AddTicketDialog/redux";
import { loadingInitialState, loadingThunkActions } from "@components/Loading/redux";
import { closeSprintDialogStateInitialState, closeSprintDialogThunkActions } from "@components/CloseSprintDialog/redux";

const initialStates = {
    addTicket: addTicketInitialState,
    ticketList: ticketListStateInitialState,
    loading: loadingInitialState,
    closeSprintDialog: closeSprintDialogStateInitialState
}

const thunkActions = {
    addTicket: addTicketThunkActions,
    ticketList: ticketListThunkActions,
    loading: loadingThunkActions,
    closeSprintDialog: closeSprintDialogThunkActions
}


export const { actions: storeActions, reducers } = makeNestedSimpleStore(initialStates, thunkActions);


const appReducer = combineReducers<AppState>({
    routing: routerReducer,
    ...reducers
});

declare module 'redux' {
    export type GenericStoreEnhancer = any;
}

export interface Doc {
    edit: string;
}

export interface VoiceToCode {
    text: string;
}

const reduxStore: Store<AppState, AnyAction> = createStore<AppState, AnyAction, void, void>(appReducer, {}, composeWithDevTools<any, {}>(applyMiddleware(...middleware)));

export { reduxStore };
