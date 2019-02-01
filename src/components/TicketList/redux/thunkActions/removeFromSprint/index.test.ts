import { removeFromSprint } from './';
import { mockStore, expectActionWithPayload, expectCalledOnceWith, mockClearAll } from '../../../../utils/testUtils';

jest.mock('../../../../../headless/database/pouch', () => {
    const removeFromSprint = jest.fn();
    return {
        getRemoteDB: jest.fn(() => {
            return {
                removeFromSprint
            }
        }),
        removeFromSprint
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

describe('when removeFromSprint is called', () => {
    beforeEach(() => {
        mockClearAll([
            pouch.getRemoteDB,
            pouch.removeFromSprint,
            fetchTickets.fetchTickets
        ])
    })
    it('it should remove the ticket from the sprint if there are no errors', async () => {
        await store.dispatch(removeFromSprint('ticketId'));

        expectCalledOnceWith(pouch.getRemoteDB);

        expectCalledOnceWith(pouch.removeFromSprint, 'ticketId');

        expectCalledOnceWith(fetchTickets.fetchTickets);

    })
    it('it should only call getRemoteDB if theres an error getting the remoteDB', async () => {
        pouch.getRemoteDB = jest.fn(() => {
            throw new Error('error getting remoteDB');
        })
        try {
            await store.dispatch(removeFromSprint('ticketId'));
        } catch {
            expectCalledOnceWith(pouch.getRemoteDB);

            expect(pouch.removeFromSprint).toHaveBeenCalledTimes(0);

            expect(fetchTickets.fetchTickets).toHaveBeenCalledTimes(0);
        }
    })
})