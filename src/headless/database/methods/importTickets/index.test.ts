import { importTickets } from './';
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
            const method = await importTickets(db);
            await method([{ _id: 'id2', title: 'title2' } as Ticket]);
            const result = await db.allDocs({ include_docs: true });
            expect(result.rows).toMatchObject([
                {
                    doc: {
                        _id: 'id2',
                        title: 'title2'
                    }
                }
            ]);
        })
    })
});