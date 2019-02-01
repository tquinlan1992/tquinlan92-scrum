import { mockPouch } from '../../../../../utils/testUtils';
import { getMockStore, expectCalledOnceWith } from '../../../../utils/testUtils';

const mockAddTicket = jest.fn(() => {
    return new Promise(resolve => resolve());
});

const pouch = mockPouch({ addTicket: mockAddTicket });
import { addTicket } from './';


jest.mock('../../../../TicketList/redux', () => {
    return {
        ticketListActions: {
            fetchTickets: jest.fn(() => {
                return () => { }
            })
        }
    }
})
const ticketListActions = require('../../../../TicketList/redux');

const store = getMockStore({
    addTicket: {
        storyPoint: 3,
        description: 'description',
        title: 'title'
    }
});

describe('when thunkActions is called', () => {
    it('it should', async () => {
        await store.dispatch(addTicket());

        const dispatchedActions = store.getActions();

        expectCalledOnceWith(pouch.getRemoteDb);
        expectCalledOnceWith(mockAddTicket, {
            storyPoint: 3,
            description: 'description',
            title: 'title'
        });
        expectCalledOnceWith(ticketListActions.ticketListActions.fetchTickets)

    })
})