import { markTicketPriority } from './';
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
            const method = await markTicketPriority(db);
            await method({id: 'id1', priority: 2});
            const newTicket1 = await db.get('id1');
            expect(newTicket1).toMatchObject({
                _id: 'id1',
                title: 'title1',
                priority: 2
            })
            db.destroy();
        })
    })
});