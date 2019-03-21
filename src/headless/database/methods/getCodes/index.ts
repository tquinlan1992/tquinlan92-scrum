import { TicketPouchDb, DocTypes, Code } from "../../PouchWrapper";

export function getCodes(db: TicketPouchDb) {
    return async () => {
        try {
            const response = await db.find({
                selector: { 
                    type: DocTypes.code
                 }
            });
            const codeDoc = response.docs;
            return codeDoc as Code[];
        } catch (e) {
            throw new Error('error get code docs');
        }
    }
}