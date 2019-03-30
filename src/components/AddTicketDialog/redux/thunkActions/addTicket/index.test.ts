import { mockPouch, getMockStore, expectCalledOnceWith } from '../../../../../utils/testUtils';

const mockAddTicket = jest.fn(() => {
    return new Promise(resolve => resolve());
});

const pouch = mockPouch({ addTicket: mockAddTicket });

import { addTicket } from './';

const store = getMockStore({
    addTicket: {
        storyPoint: 3,
        description: 'description',
        title: 'title'
    }
});

describe('when thunkActions is called', () => {
    it('it should', async () => {
        await store.dispatch(addTicket());


        expectCalledOnceWith(pouch.getRemoteDb);
        expectCalledOnceWith(mockAddTicket, {
            storyPoint: 3,
            description: 'description',
            title: 'title'
        });

    })
})