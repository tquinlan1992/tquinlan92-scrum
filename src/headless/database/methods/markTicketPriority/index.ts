import { TicketPouchDb } from "../../PouchWrapper";
import { Tickets } from '@headless/database/PouchWrapper';

export function markTicketPriority(db: TicketPouchDb) {
    return async (docs: Tickets) => {
        try {
            await db.bulkDocs(docs)
        } catch (e) {
            throw new Error('error including ticket');
        }
    }
}