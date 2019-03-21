import { TicketPouchDb, DocTypes, Code } from "../../PouchWrapper";

export function getCode(db: TicketPouchDb) {
    return async (_id: string) => {
        try {
            const response = await db.find({
                selector: { 
                    _id: {
                        $in: [_id]
                    }
                 }
            });
            const codeDoc = response.docs[0];
            return codeDoc as Code | undefined;
        } catch (e) {
            throw new Error('error adding ticket');
        }
    }
}