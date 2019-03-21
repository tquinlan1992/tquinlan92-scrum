import { markTicketPriority } from './';
import { Ticket } from '../../PouchWrapper';
import { getMemoryPouchDb } from '../../../../utils/testUtils';


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
            const ticket1 = await db.get('id1');
            await method([{_id: 'id1', priority: 2, _rev: ticket1._rev, title: 'title1'} as Ticket]);
            const newTicket1 = await db.get('id1');
            expect(newTicket1).toMatchObject({
                _id: 'id1',
                title: 'title1',
                priority: 2
            })
        })
    })
});