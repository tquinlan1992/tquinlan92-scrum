import { getTickets } from './';
import { getMemoryPouchDb } from '../../../utils/testUtils';
import { Ticket } from '../../PouchWrapper';




describe('when dbMethod is called', () => {
    describe('with no error', () => {
        it('should work as expected', async () => {
            const db = await getMemoryPouchDb([
                {
                    _id: 'id1',
                    title: 'title1'
                } as Ticket
            ]);
            const method = await getTickets(db);
            const result = await method();
            expect(result).toMatchObject([{
                _id: 'id1',
                title: 'title1'
            }])
            await db.destroy();
        })
    })
});