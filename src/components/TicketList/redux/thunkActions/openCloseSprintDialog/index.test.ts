import { openCloseSprintDialog } from '.';
import { mockStore, expectActionWithPayload } from '../../../../utils/testUtils';
import { ticketListActions } from '../../';
import { closeSprintDialogActions } from '../../../../CloseSprintDialog/redux';

const store = mockStore({});

describe('when openCloseSprintDialog is called', () => {
    it('it should', () => {
        store.dispatch(openCloseSprintDialog());
        
        const dispatchedActions = store.getActions();
        
        const [ action1, action2 ] = dispatchedActions;
        
        expectActionWithPayload(action1, ticketListActions.set, {showCloseSprintDialog: true});
        expectActionWithPayload(action2, closeSprintDialogActions.reset, null);
    })
})