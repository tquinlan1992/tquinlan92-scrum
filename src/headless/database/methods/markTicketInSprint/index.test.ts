import { markTicketInSprint } from './';
import { Ticket } from '../../PouchWrapper';
import { getMemoryPouchDb } from '../../../../utils/testUtils';




describe('when dbMethod is called', () => {
    describe('with no error', () => {
        it('should work as expected', async () => {
            const db = await getMemoryPouchDb([
                {
                    _id: 'id1',
                    title: 'title1',

                } as Ticket
            ]);
            const method = await markTicketInSprint(db);
            await method({id: 'id1', sprint: true});
            const newTicket1 = await db.get('id1');
            expect(newTicket1).toMatchObject({
                _id: 'id1',
                title: 'title1',
                sprint: true
            })
        })
    })
});