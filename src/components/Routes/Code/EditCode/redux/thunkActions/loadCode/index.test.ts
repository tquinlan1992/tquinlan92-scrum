import { loadCode } from './';
import { expectActionWithPayload, getMockStore, mockPouch, expectCalledOnceWith } from '@src/utils/testUtils';
import { editCodeActions } from '../..';

const mockGetCode = jest.fn(() => {
    return new Promise(resolve => resolve(
        {
            code: 'code'
        }
    ));
});

mockPouch({ getCode: mockGetCode });

const store = getMockStore({});

jest.mock('@src/headless/database/pouch', () => {
    return {

    }
})

describe('when loadCode is called', () => {
    it('it should call load code from db and set code', async () => {
        await store.dispatch(loadCode('id'));
        
        const dispatchedActions = store.getActions();
        
        const [ action1 ] = dispatchedActions;
        
        expectCalledOnceWith(mockGetCode, 'id');

        expectActionWithPayload(action1, editCodeActions.set, {code: 'code', _id: 'id'});

    })
})