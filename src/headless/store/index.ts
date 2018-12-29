import { createStore, applyMiddleware, AnyAction, Store, combineReducers } from "redux";
import middleware from './middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerReducer, RouterState } from "react-router-redux";
import { TicketListState } from '@components/TicketList/redux';
import addTicket, { AddTicketState } from '@components/AddTicketDialog/redux';
import loading, { LoadingState } from '@components/Loading/redux';
import { AppState } from '../store';
import ticketList from '../../components/TicketList/redux';
import { ThunkAction } from "redux-thunk";
import closeSprintDialog, { State as CloseSprintDialogState } from '@components/CloseSprintDialog/redux';

const appReducer = combineReducers<AppState>({
    routing: routerReducer,
    addTicket,
    ticketList,
    loading,
    closeSprintDialog
});

declare module 'redux' {
    export type GenericStoreEnhancer = any;
}

export type AppThunkAction = ThunkAction<void, AppState, void, AnyAction>;

export interface Doc {
    edit: string;
}

export interface VoiceToCode {
    text: string;
}

export interface AddTicketState {
    storyPoint: null | number;
    description: string;
    title: string;
}

export interface AppState {
    routing: RouterState;
    ticketList: TicketListState;
    addTicket: AddTicketState;
    loading: LoadingState;
    closeSprintDialog: CloseSprintDialogState;
}

const reduxStore: Store<AppState, AnyAction> = createStore<AppState, AnyAction, void, void>(appReducer, {}, composeWithDevTools<any, {}>(applyMiddleware(...middleware)));

export default reduxStore;
