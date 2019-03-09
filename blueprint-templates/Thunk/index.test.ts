import { thunkAction } from './';
import { expectActionWithPayload, getMockStore } from '@src/utils/testUtils';
import { simpleActions } from '../..';;

describe('when thunkActions is called', () => {
    it('it should', async () => {
        const store = getMockStore({});

        await store.dispatch(thunkAction());
        
        const dispatchedActions = store.getActions();
        
        const [ action1 ] = dispatchedActions;
        
        expectActionWithPayload(action1, simpleActions.reset, null);

    })
})