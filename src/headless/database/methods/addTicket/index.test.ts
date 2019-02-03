import { addTicket } from './';
import { Ticket } from '../../PouchWrapper';
import { getMemoryPouchDb } from '../../../../utils/testUtils';




describe('when dbMethod is called', () => {
    describe('with no error', () => {
        it('should work as expected', async () => {
            const db = await getMemoryPouchDb();
            const method = await addTicket(db);
            const response = await method({
                    title: 'ticketTitle'
            } as Ticket);
            expect(response.ok).toEqual(true)
            const newTicket = await db.get(response.id);
            expect(newTicket).toMatchObject({
                title: 'ticketTitle'
            });
        })
    })
});