import { openAddTicketDialog } from './';
import { mockStore, expectActionWithPayload } from '../../../../utils/testUtils';
import { addTicketDialogActions } from '../../../../AddTicketDialog/redux';
import { ticketListActions } from '../..';

const store = mockStore({});

describe('when openAddTicketDialog is called', () => {
    it('should reset the dialog and then open the dialog', () => {
        store.dispatch(openAddTicketDialog());
        
        const dispatchedActions = store.getActions();
        
        const [ action1, action2 ] = dispatchedActions;
        
        expectActionWithPayload(action1, addTicketDialogActions.reset, null);
        expectActionWithPayload(action2, ticketListActions.set, {"showAddTicketDialog": true});

    })
})