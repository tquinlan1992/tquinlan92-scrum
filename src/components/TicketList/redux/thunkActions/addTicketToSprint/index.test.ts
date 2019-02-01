import { addTicketToSprint } from './';
import { mockStore, expectActionWithPayload, expectCalledOnceWith, mockClearAll } from '../../../../utils/testUtils';

jest.mock('../../../../../headless/database/pouch', () => {
    const markTicketInSprint = jest.fn();
    return {
        getRemoteDB: jest.fn(() => {
            return {
                markTicketInSprint
            }
        }),
        markTicketInSprint
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

describe('when addTicketToSprint is called', () => {
    beforeEach(() => {
        mockClearAll([
            pouch.getRemoteDB,
            pouch.markTicketInSprint,
            fetchTickets.fetchTickets
        ])
    })
    it('it should add the ticket if no errors', async () => {
        await store.dispatch(addTicketToSprint('ticketId'));

        expectCalledOnceWith(pouch.getRemoteDB);

        expectCalledOnceWith(pouch.markTicketInSprint, 'ticketId');

        expectCalledOnceWith(fetchTickets.fetchTickets);

    })
    it('it should only call getRemoteDB if theres an error getting the remoteDB', async () => {
        pouch.getRemoteDB = jest.fn(() => {
            throw new Error('error getting remoteDB');
        })
        try {
            await store.dispatch(addTicketToSprint('ticketId'));
        } catch {
            expectCalledOnceWith(pouch.getRemoteDB);

            expect(pouch.markTicketInSprint).toHaveBeenCalledTimes(0);

            expect(fetchTickets.fetchTickets).toHaveBeenCalledTimes(0);
        }
    })
})