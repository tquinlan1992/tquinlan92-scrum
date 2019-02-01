import { TicketPouchDb } from "../../PouchWrapper";

export function closeTicket(db: TicketPouchDb) {
    return async (id: string) => {
        try {
            const ticketDoc = await db.get(id);
            return db.put({
                ...ticketDoc,
                closed: true
            });
        } catch (e) {
            throw new Error('error closing ticket');
        }
    }
}