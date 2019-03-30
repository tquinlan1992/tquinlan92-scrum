import { Ticket, Docs } from '../headless/database/PouchWrapper';
import pouchDBMemoryAdapter from 'pouchdb-adapter-memory';
import PouchDB from 'pouchdb-browser';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AnyAction, isType, ActionCreator } from 'typescript-fsa';
import { AppState } from '../headless/store';
import { DeepPartial } from 'ts-essentials';

const pouchdbFind = require('pouchdb-find');
PouchDB.plugin(pouchDBMemoryAdapter);
PouchDB.plugin(pouchdbFind);

export async function getMemoryPouchDb(docs?: Array<Docs['Ticket']>) {
    const db = new PouchDB<Docs['Ticket']>('mydb', { adapter: 'memory' });
    if (docs) {
        docs.forEach(async doc => {
            try {
            await db.put(doc);
            } catch(e) {
                console.log('e', e);
            }
        })
    }
    return db;
}



export function mockPouchDB() {
    jest.mock('@headless/database/pouch', () => {
        return {};
    });
}

export function mockPouch(dbMethods: object) {
    jest.mock('@headless/database/pouch', () => {
        return {

        }
    })
    const mockPouchRequire = require('@headless/database/pouch');
    const mockGetRemoteDb = jest.fn(() => {
        return new Promise(resolve => {
            resolve(dbMethods);
        })
    });
    Object.assign(
        mockPouchRequire, 
        {
            getRemoteDb: mockGetRemoteDb 
        }, 
        dbMethods
    )
    return mockPouchRequire;
}

export function getAnyJestFn() {
    return jest.fn() as any;
}

interface AnyActionPayload extends AnyAction {
    payload: any;
}

export function expectActionWithPayload(actionToTest: AnyActionPayload, expectedActionCreator: ActionCreator<any>, expectedPayload?: any) {
    expect(isType(actionToTest, expectedActionCreator)).toBe(true);
    expect(actionToTest.payload).toEqual(expectedPayload);
}


const middlewares = [thunk];
export const mockStore = configureStore<Partial<AppState>, any>(middlewares);

export function getMockState(state: DeepPartial<AppState>) {
    return state as AppState;
}

export function getMockStore(state: DeepPartial<AppState>) {
    return mockStore(state as AppState);
}

export function expectCalledOnceWith(mockFunction: jest.Mock<{}>, calledWith?: any) {
    expect(mockFunction).toHaveBeenCalledTimes(1);
    const expectedParams = calledWith ? [calledWith] : [];
    expect(mockFunction.mock.calls[0]).toMatchObject(expectedParams);
}

export function mockClearAll(mockFunctions: jest.Mock<{}>[]) {
    mockFunctions.forEach(mockFunction => {
        mockFunction.mockClear();
    })
}

export function getPartialState(appState: DeepPartial<AppState>) {
    return appState as AppState;
}