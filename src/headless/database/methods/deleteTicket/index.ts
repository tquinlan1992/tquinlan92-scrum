import { TicketPouchDb } from "../../PouchWrapper";

export function deleteTicket(db: TicketPouchDb) {

    return async (id: string) => {
        try {
            const ticketDoc = await db.get(id);
            return db.put({
                ...ticketDoc,
                _deleted: true
            });
        } catch (e) {
            throw new Error('error deleting ticket');
        }
    }
}