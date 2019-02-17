import { mockPouch, getMockStore, expectCalledOnceWith } from '../../../../../../../utils/testUtils';
const mockGetTickets = jest.fn(() => {
    return new Promise(resolve => {
        resolve([{title: 'test'}]);
    })
})
const db = mockPouch({
    getTickets: mockGetTickets
})

import { exportTickets } from './';

jest.mock('export-from-json', () => {
    return {
        default: jest.fn()
    }
});
const exportFromJson = require('export-from-json');

const store = getMockStore({});

describe('when thunkActions is called', () => {
    it('it should', async () => {
        await store.dispatch(exportTickets());
        
        expectCalledOnceWith(db.getTickets);

        expectCalledOnceWith(exportFromJson.default, {
            fileName: 'tickets',
            exportType: 'json',
            data: [{title: 'test'}]
        });
    })
})