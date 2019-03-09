import { saveCode } from './';
import { expectActionWithPayload, getMockStore, expectCalledOnceWith } from '@src/utils/testUtils';
import { mockPouch } from '@src/utils/testUtils';
import { editCodeActions } from '../..';

const mockSaveCode = jest.fn(() => {
    return new Promise(resolve => resolve(
        {
            code: 'code'
        }
    ));
});

mockPouch({ saveCode: mockSaveCode });

describe('when thunkActions is called', () => {
    it('it should', async () => {
        const store = getMockStore({
            codeState: {
                editCode: {
                    _id: '_id'
                }
            }
        });

        await store.dispatch(saveCode('new code'));
        
        const dispatchedActions = store.getActions();
        
        const [ action1 ] = dispatchedActions;
        
        expectActionWithPayload(action1, editCodeActions.code, 'new code');

        expectCalledOnceWith(mockSaveCode, {newCode: 'new code', _id: '_id'});

    })
})