import { loadCodeOptions } from './';
import { expectActionWithPayload, getMockStore, mockPouch } from '@src/utils/testUtils';
import { selectCodeActions } from '../..';

const store = getMockStore({});

const mockGetCodes= jest.fn(() => {
    return new Promise(resolve => resolve(
        [{
            _id: '_id'
        }]
    ));
});

mockPouch({ getCodes: mockGetCodes });

describe('when thunkActions is called', () => {
    it('it should', async () => {
        await store.dispatch(loadCodeOptions());
        
        const dispatchedActions = store.getActions();
        
        const [ action1 ] = dispatchedActions;
        
        expectActionWithPayload(action1, selectCodeActions.options, [{_id: '_id'}]);

    })
})