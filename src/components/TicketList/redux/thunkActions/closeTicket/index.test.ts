import { closeTicket } from './';
import { mockStore, expectActionWithPayload, mockClearAll, expectCalledOnceWith } from '../../../../utils/testUtils';

const store = mockStore({});

jest.mock('../../../../../headless/database/pouch', () => {
    const closeTicket = jest.fn();
    return {
        getRemoteDB: jest.fn(() => {
            return {
                closeTicket
            }
        }),
        closeTicket
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

describe('when closeTicket is called', () => {
    beforeEach(() => {
        mockClearAll([
            pouch.getRemoteDB,
            pouch.closeTicket,
            fetchTickets.fetchTickets
        ])
    })
    it('it should close the ticket if no errors', async () => {
        await store.dispatch(closeTicket('ticketId'));

        expectCalledOnceWith(pouch.getRemoteDB);

        expectCalledOnceWith(pouch.closeTicket, 'ticketId');

        expectCalledOnceWith(fetchTickets.fetchTickets);

    })
    it('it should only call getRemoteDB if theres an error getting the remoteDB', async () => {
        pouch.getRemoteDB = jest.fn(() => {
            throw new Error('error getting remoteDB');
        })
        try {
            await store.dispatch(closeTicket('ticketId'));
        } catch {
            expectCalledOnceWith(pouch.getRemoteDB);

            expect(pouch.closeTicket).toHaveBeenCalledTimes(0);

            expect(fetchTickets.fetchTickets).toHaveBeenCalledTimes(0);
        }
    })
})