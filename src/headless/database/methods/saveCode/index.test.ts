import { saveCode } from './';
import { getMemoryPouchDb } from '@src/utils/testUtils';
import { DocTypes, Docs } from '../../PouchWrapper';

describe('when dbMethod is called', () => {
    describe('with no error', () => {
        it('should work as expected', async () => {
            const db = await getMemoryPouchDb([
                {
                    _id: 'id1',
                    type: DocTypes.code,
                    code: 'code'
                } as Docs['Code']
            ]);
            const method = await saveCode(db);
            await method('newCode');
            const newTicket1 = await db.get('id1');
            expect(newTicket1).toMatchObject({
                _id: 'id1',
                type: DocTypes.code,
                code: 'newCode'
            });
        })
    })
});