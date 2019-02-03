import { removeFromSprint } from './';
import { Ticket } from '../../PouchWrapper';
import { getMemoryPouchDb } from '../../../../utils/testUtils';




describe('when removeFromSprint is called', () => {
    describe('with no error', () => {
        it('should put the new document with sprint false', async () => {
            const db = await getMemoryPouchDb([
                {
                    _id: 'ticketId',
                    title: 'ticket',
                    sprint: true
                } as Ticket
            ]);
            const removeFromSprintMethod = await removeFromSprint(db);
            await removeFromSprintMethod('ticketId');
            const newTicket = await db.get('ticketId');
            expect(newTicket).toMatchObject({
                _id: 'ticketId',
                title: 'ticket',
                sprint: false
            })
        })
    })
});