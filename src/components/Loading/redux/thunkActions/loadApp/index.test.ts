import { loadApp } from './';
import { mockStore, expectActionWithPayload, getMockStore, expectCalledOnceWith } from '../../../../utils/testUtils';
import * as fetchMock from 'fetch-mock';
import { actions as loadingActions } from '../../../../Loading/redux'

jest.mock('../../../../../headless/database/pouch', () => {
    return {
        setupPouch: jest.fn()
    }
});

const pouch = require('../../../../../headless/database/pouch');

jest.mock('../../../../TicketList/redux/thunkActions/fetchTickets', () => {
    return {
        fetchTickets: jest.fn(() => {
            return () => {}
        })
    }
})

const fetchTickets = require('../../../../TicketList/redux/thunkActions/fetchTickets')

const store = getMockStore({});

describe('when thunkActions is called', () => {
    it('it should', async () => {
        fetchMock.mock('/static/api.json', {
            cloudant: 'cloudant'
        });

        await store.dispatch(loadApp());

        expectCalledOnceWith(pouch.setupPouch, { remoteUrl: 'cloudant/dev' });

        expectCalledOnceWith(fetchTickets.fetchTickets);
        
        const dispatchedActions = store.getActions();
        
        const [ action1 ] = dispatchedActions;
        
        expectActionWithPayload(action1, loadingActions.set, { value: false });

    })
})