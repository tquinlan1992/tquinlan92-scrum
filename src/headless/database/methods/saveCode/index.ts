import { v4 as uuid } from "uuid";
import { TicketPouchDb, DocTypes, Code } from "../../PouchWrapper";

export function saveCode(db: TicketPouchDb) {
    return async ({ newCode, _id }: {newCode: string, _id: string;}) => {
        try {
            const response = await db.find({
                selector: { 
                    _id: {
                        $in: [_id]
                    }
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
                    code: newCode
                });
            }
        } catch (e) {
            throw new Error('error adding ticket');
        }
    }
}