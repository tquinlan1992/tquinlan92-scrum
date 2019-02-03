import { closeTicketsWithSprintID } from './';
import { Ticket } from '../../PouchWrapper';
import { getMemoryPouchDb } from '../../../../utils/testUtils';




describe('when dbMethod is called', () => {
    describe('with no error', () => {
        it('should work as expected', async () => {
            const db = await getMemoryPouchDb([
                {
                    _id: 'id1',
                    title: 'title1'
                } as Ticket,
                {
                    _id: 'id2',
                    title: 'title2'
                } as Ticket
            ]);
            const method = await closeTicketsWithSprintID(db);
            const ids = [
                'id1',
                'id2'
            ];
            const sprintName = 'sprintName';
            await method({ids, sprintName});
            const newTicket1 = await db.get('id1');
            expect(newTicket1).toMatchObject({
                _id: 'id1',
                title: 'title1',
                sprintName: 'sprintName'
            });
            const newTicket2 = await db.get('id2');
            expect(newTicket2).toMatchObject({
                _id: 'id2',
                title: 'title2',
                sprintName: 'sprintName'
            });
        })
    })
});