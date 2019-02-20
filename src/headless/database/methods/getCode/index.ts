import { TicketPouchDb, DocTypes, Code } from "../../PouchWrapper";

export function getCode(db: TicketPouchDb) {
    return async () => {
        try {
            const response = await db.find({
                selector: { 
                    type: DocTypes.code
                 }
            });
            const codeDoc = response.docs[0];
            return codeDoc as Code | undefined;
        } catch (e) {
            throw new Error('error adding ticket');
        }
    }
}