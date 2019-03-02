import { v4 as uuid } from "uuid";
import { TicketPouchDb, DocTypes, Code } from "../../PouchWrapper";

export function saveCode(db: TicketPouchDb) {
    return async ({newCode, name }: {newCode: string; name: string;}) => {
        try {
            const response = await db.find({
                selector: { 
                    type: DocTypes.code
                 }
            });
            const codeDoc = response.docs[0];
            if (codeDoc) {
                await db.put({
                    ...codeDoc,
                    code: newCode
                })
            } else { 
                await db.put<Code>({
                    _id: uuid(),
                    type: DocTypes.code,
                    code: newCode,
                    name
                });
            }
        } catch (e) {
            throw new Error('error adding ticket');
        }
    }
}