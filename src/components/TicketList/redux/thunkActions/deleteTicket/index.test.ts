import { deleteTicket } from './';
import { mockStore, expectActionWithPayload, expectCalledOnceWith, mockClearAll } from '../../../../utils/testUtils';

jest.mock('../../../../../headless/database/pouch', () => {
    const deleteTicket = jest.fn();
    return {
        getRemoteDb: jest.fn(() => {
            return {
                deleteTicket
            }
        }),
        deleteTicket
    }
})

const pouch = require('../../../../../headless/database/pouch');

jest.mock('../fetchTickets', () => {
    return {
        fetchTickets: jest.fn(() => {
            return () => { }
        })
    }
});

const fetchTickets = require('../fetchTickets');

const store = mockStore({});

describe('when deleteTicket is called', () => {
    beforeEach(() => {
        mockClearAll([
            pouch.getRemoteDb,
            pouch.deleteTicket,
            fetchTickets.fetchTickets
        ])
    })
    it('it should delete the ticket if no errors', async () => {
        await store.dispatch(deleteTicket('ticketId'));

        expectCalledOnceWith(pouch.getRemoteDb);

        expectCalledOnceWith(pouch.deleteTicket, 'ticketId');

        expectCalledOnceWith(fetchTickets.fetchTickets);

    })
    it('it should only call getRemoteDb if theres an error getting the remoteDB', async () => {
        pouch.getRemoteDb = jest.fn(() => {
            throw new Error('error getting remoteDB');
        })
        try {
            await store.dispatch(deleteTicket('ticketId'));
        } catch {
            expectCalledOnceWith(pouch.getRemoteDb);

            expect(pouch.deleteTicket).toHaveBeenCalledTimes(0);

            expect(fetchTickets.fetchTickets).toHaveBeenCalledTimes(0);
        }
    })
})