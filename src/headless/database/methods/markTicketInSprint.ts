import { TicketPouchDb } from "../PouchWrapper";

export function markTicketInSprint(db: TicketPouchDb) {
    return async function (id: string) {
        try {
            const ticketDoc = await db.get(id);
            return db.put({
                ...ticketDoc,
                sprint: !ticketDoc.sprint
            });
        } catch (e) {
            throw new Error('error including ticket');
        }
    }
}