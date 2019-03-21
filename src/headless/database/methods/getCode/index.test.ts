import { getCode } from './';
import { getMemoryPouchDb } from '@src/utils/testUtils';
import { Code } from '../../PouchWrapper';

describe('when dbMethod is called', () => {
    describe('with no error', () => {
        it('should work as expected', async () => {
            const db = await getMemoryPouchDb([
                {
                    _id: 'id1',
                    code: 'code'
                } as Code
            ]);
            const method = await getCode(db);
            await method('id1');
            const newTicket1 = await db.get('id1');
            expect(newTicket1).toMatchObject({
                _id: 'id1',
                code: 'code'
            });
        })
    })
});