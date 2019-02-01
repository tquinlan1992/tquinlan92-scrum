import { thunkAction } from './';
import { mockStore, expectActionWithPayload } from '../../../../utils/testUtils';
import { simpleActions } from './simpleActions';

const store = mockStore({});

describe('when thunkActions is called', () => {
    it('it should', () => {
        store.dispatch(thunkAction());
        
        const dispatchedActions = store.getActions();
        
        const [ action1 ] = dispatchedActions;
        
        expectActionWithPayload(action1, simpleActions.reset, null);

    })
})