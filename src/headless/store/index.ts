import { middleware } from './middleware';
import { makeNestedStore, createConnectProps } from "tquinlan92-typescript-redux-utils";
import { ticketListStateInitialState, ticketListThunkActions } from "@components/TicketList/redux";
import { addTicketInitialState, addTicketThunkActions } from "@containers/AddTicketDialog/redux";
import { loadingInitialState, loadingThunkActions } from "@components/Loading/redux";
import { closeSprintDialogStateInitialState, closeSprintDialogThunkActions } from "@components/CloseSprintDialog/redux";
import { merge } from 'lodash';
import { AppState } from './types';


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


export const { actions, reducers, store } = makeNestedStore(initialStates, middleware);

export const connectProps = createConnectProps<AppState>();

export const storeActions = merge(actions, thunkActions);

declare module 'redux' {
    export type GenericStoreEnhancer = any;
}

export interface Doc {
    edit: string;
}

export interface VoiceToCode {
    text: string;
}
