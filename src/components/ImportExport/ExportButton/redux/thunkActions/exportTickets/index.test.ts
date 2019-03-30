import { mockPouch, getMockStore, expectCalledOnceWith } from '@src/utils/testUtils';
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
        return jest.fn()
});
const exportFromJson = require('export-from-json');

const store = getMockStore({});

describe('when thunkActions is called', () => {
    it('it should', async () => {
        await store.dispatch(exportTickets());
        
        expectCalledOnceWith(db.getTickets);

        expectCalledOnceWith(exportFromJson, {
            fileName: 'tickets',
            exportType: 'json',
            data: [{title: 'test'}]
        });
    })
})