import { closeSprint } from './';
import { mockStore, expectActionWithPayload, getMockStore, expectCalledOnceWith } from '../../../../utils/testUtils';

jest.mock('../../../../../headless/database/pouch', () => {
    const closeTicketsWithSprintID = jest.fn(() => {
        return new Promise(resolve => resolve());
    });
    return {
        getRemoteDb: jest.fn(() => {
            return new Promise(resolve => {
                resolve({closeTicketsWithSprintID});
            })
        }),
        closeTicketsWithSprintID
    }
})

const pouch = require('../../../../../headless/database/pouch');

jest.mock('../../../../TicketList/redux/thunkActions/fetchTickets', () => {
    return {
        fetchTickets: jest.fn(() => { return () => {} })
    }
})
const fetchTickets = require('../../../../TicketList/redux/thunkActions/fetchTickets');

const store = getMockStore({
    closeSprintDialog: {
        sprintName: 'sprintName'
    },
    ticketList: {
        sprintTickets: [
            {
                _id: 'id1',
                closed: true
            }
        ]
    }
})

describe('when thunkActions is called', () => {
    it('it should', async () => {
        await store.dispatch(closeSprint());

        expectCalledOnceWith(pouch.getRemoteDb);
        
        const ids = [
            'id1'
        ];
        const sprintName = 'sprintName';
        expectCalledOnceWith(pouch.closeTicketsWithSprintID, {ids, sprintName});

        expectCalledOnceWith(fetchTickets.fetchTickets);
    })
})