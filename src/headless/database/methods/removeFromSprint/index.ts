import { TicketPouchDb } from "../../PouchWrapper";

export function removeFromSprint(db: TicketPouchDb) {
    return async (id: string) => {
        try {
            const ticketDoc = await db.get(id);
            return db.put({
                ...ticketDoc,
                sprint: false
            });
        } catch (e) {
            throw new Error('error closing ticket');
        }
    }
}