import { v4 as uuid } from "uuid";
import { TicketPouchDb } from "../../PouchWrapper";

export function getTicketById(db: TicketPouchDb) {
    return async (id: string) => {
        try {
            return await db.get(id);
        } catch (e) {
            throw new Error('error adding ticket');
        }
    }
}