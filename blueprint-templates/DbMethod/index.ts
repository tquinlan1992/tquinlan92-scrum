import { v4 as uuid } from "uuid";
import { TicketPouchDb } from "../../PouchWrapper";

export function addTicket(db: TicketPouchDb) {
    return async () => {
        try {
            return await db.put({ _id: uuid(), deleted: false });
        } catch (e) {
            throw new Error('error adding ticket');
        }
    }
}