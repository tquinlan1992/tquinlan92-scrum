import { saveCode } from './';
import { expectActionWithPayload, getMockStore } from '@src/utils/testUtils';
import { mockPouch } from '@utils/testUtils';
import { codeActions } from '../..';

const store = getMockStore({});

const mockSaveCode = jest.fn(() => {
    return new Promise(resolve => resolve(
        {
            code: 'code'
        }
    ));
});

const pouch = mockPouch({ getCode: mockSaveCode });

describe('when thunkActions is called', () => {
    it('it should', () => {
        store.dispatch(saveCode('new code'));
        
        const dispatchedActions = store.getActions();
        
        const [ action1 ] = dispatchedActions;
        
        expectActionWithPayload(action1, codeActions.code, 'new code');

    })
})