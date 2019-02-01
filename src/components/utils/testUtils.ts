import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AnyAction, isType, ActionCreator } from 'typescript-fsa';
import { AppState } from '../../headless/store';

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
export const mockStore = configureStore(middlewares);

export function getMockStore(state: Partial<AppState>) {
    return mockStore(state);
}

export function expectCalledOnceWith(mockFunction: jest.Mock<{}>, calledWith?: any) {
    expect(mockFunction).toHaveBeenCalledTimes(1);
    const expectedParams = calledWith ? [calledWith] : [];
    expect(mockFunction.mock.calls[0]).toEqual(expectedParams);
}

export function mockClearAll(mockFunctions: jest.Mock<{}>[]) {
    mockFunctions.forEach(mockFunction => {
        mockFunction.mockClear();
    })
}