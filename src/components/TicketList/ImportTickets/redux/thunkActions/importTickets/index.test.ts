import { mockPouch, getMockStore, expectCalledOnceWith } from '../../../../../../utils/testUtils';

const pouch = mockPouch({
    importTickets: jest.fn()
})


import { importTickets } from './';
import { Ticket } from '../../../../../../headless/database/PouchWrapper';

const store = getMockStore({});

describe('when thunkActions is called', () => {
    it('it should', async () => {
        const tickets = [{
            _id: 'id1',
            title: 'title1'
        } as Ticket];
        await store.dispatch(importTickets(tickets));

        expectCalledOnceWith(pouch.getRemoteDb);
        expectCalledOnceWith(pouch.importTickets, tickets);

    })
})