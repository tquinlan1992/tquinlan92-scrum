import { deleteTicket } from './';
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
            const method = await deleteTicket(db);
            await method('id1');
            try {
                await db.get('id1');
            } catch(e) {
                expect(JSON.parse(e)).toEqual({
                    "message": "missing", 
                    "name": "not_found", 
                    "reason": "deleted", 
                    "status": 404
                });
            }
        })
    })
});