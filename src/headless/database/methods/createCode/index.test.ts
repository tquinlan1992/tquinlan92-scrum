import { createCode } from './';
import { getMemoryPouchDb } from '@src/utils/testUtils';
import { DocTypes, Docs } from '../../PouchWrapper';

describe('when dbMethod is called', () => {
    describe('with no error', () => {
        it('should work as expected', async () => {
            const db = await getMemoryPouchDb([

            ]);
            const method = await createCode(db);
            await method({newCode: 'newCode', name: 'newCodeName'});
            const newTicket1 = await db.get('newCodeName');
            expect(newTicket1).toMatchObject({
                _id: 'newCodeName',
                type: DocTypes.code,
                code: 'newCode'
            });
        })
    })
});