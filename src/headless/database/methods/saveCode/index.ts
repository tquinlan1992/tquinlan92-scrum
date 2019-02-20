import { v4 as uuid } from "uuid";
import { TicketPouchDb, DocTypes } from "../../PouchWrapper";

export function saveCode(db: TicketPouchDb) {
    return async (newCode: string) => {
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
                await db.put({
                    _id: uuid(),
                    type: DocTypes.code,
                    code: newCode
                });
            }
        } catch (e) {
            throw new Error('error adding ticket');
        }
    }
}