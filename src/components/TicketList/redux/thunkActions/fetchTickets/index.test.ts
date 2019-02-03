import { fetchTickets } from '.';
import { ticketListActions } from "../..";
import { mockStore, expectActionWithPayload } from '../../../../../utils/testUtils';

jest.mock('../../../../../headless/database/pouch', () => {
    const getTickets = jest.fn(() => {
        return new Promise(resolve => {
            resolve ([
                {
                    name: 'backlog'
                },
                {
                    name: 'backlog',
                    sprint: true
                },
                {
                    name: 'closed',
                    closed: true
                }
            ])
        })
    });
    return {
        getRemoteDb: jest.fn(() => {
            return {
                getTickets
            }
        }),
        getTickets
    }
})

const store = mockStore({});

describe('when thunkActions is called', () => {
    it('it should', async () => {
        await store.dispatch(fetchTickets());
        
        const dispatchedActions = store.getActions();
        
        const [ action1 ] = dispatchedActions;
        
        expectActionWithPayload(action1, ticketListActions.set, {
            backlogTickets: [{
                name: 'backlog'
            }],
            sprintTickets: [{
                name: 'backlog',
                sprint: true
            }],
            closedTickets: [{
                name: 'closed',
                closed: true
            }]
        });

    })
})