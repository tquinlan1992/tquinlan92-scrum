import { removeFromSprint } from './';
import { mockStore, expectActionWithPayload, expectCalledOnceWith, mockClearAll } from '../../../../utils/testUtils';

jest.mock('../../../../../headless/database/pouch', () => {
    const removeFromSprint = jest.fn();
    return {
        getRemoteDb: jest.fn(() => {
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
            pouch.getRemoteDb,
            pouch.removeFromSprint,
            fetchTickets.fetchTickets
        ])
    })
    it('it should remove the ticket from the sprint if there are no errors', async () => {
        await store.dispatch(removeFromSprint('ticketId'));

        expectCalledOnceWith(pouch.getRemoteDb);

        expectCalledOnceWith(pouch.removeFromSprint, 'ticketId');

        expectCalledOnceWith(fetchTickets.fetchTickets);

    })
    it('it should only call getRemoteDb if theres an error getting the remoteDB', async () => {
        pouch.getRemoteDb = jest.fn(() => {
            throw new Error('error getting remoteDB');
        })
        try {
            await store.dispatch(removeFromSprint('ticketId'));
        } catch {
            expectCalledOnceWith(pouch.getRemoteDb);

            expect(pouch.removeFromSprint).toHaveBeenCalledTimes(0);

            expect(fetchTickets.fetchTickets).toHaveBeenCalledTimes(0);
        }
    })
})