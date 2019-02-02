import { closeTicket } from './';
import { getMemoryPouchDb } from '../../../utils/testUtils';
import { Ticket } from '../../PouchWrapper';




describe('when dbMethod is called', () => {
    describe('with no error', () => {
        it('should work as expected', async () => {
            const db = await getMemoryPouchDb([
                {
                    _id: 'ticketId',
                    title: 'ticket',
                    closed: false
                } as Ticket
            ]);
            const method = await closeTicket(db);
            await method('ticketId');
            const newTicket = await db.get('ticketId');
            expect(newTicket).toMatchObject({
                _id: 'ticketId',
                title: 'ticket',
                closed: true
            })
            db.destroy();
        })
    })
});