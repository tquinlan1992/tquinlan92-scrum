import { loadCode } from './';
import { expectActionWithPayload, getMockStore, mockPouch, expectCalledOnceWith } from '@src/utils/testUtils';
import { codeActions } from '../..';

const mockGetCode = jest.fn(() => {
    return new Promise(resolve => resolve(
        {
            code: 'code'
        }
    ));
});

mockPouch({ getCode: mockGetCode });

const store = getMockStore({});

jest.mock('@headless/database/pouch', () => {
    return {

    }
})

describe('when loadCode is called', () => {
    it('it should call load code from db and set code', async () => {
        await store.dispatch(loadCode());
        
        const dispatchedActions = store.getActions();
        
        const [ action1 ] = dispatchedActions;
        
        expectCalledOnceWith(mockGetCode);

        expectActionWithPayload(action1, codeActions.code, 'code');

    })
})