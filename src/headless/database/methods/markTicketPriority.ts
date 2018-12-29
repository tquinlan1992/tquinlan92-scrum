import { TicketPouchDb } from "../PouchWrapper";

export function markTicketPriority(db: TicketPouchDb) {
    return async ({id, priority}: {id: string; priority?: number;}) => {
        try {
            const ticketDoc = await db.get(id);
            return db.put({
                ...ticketDoc,
                priority
            });
        } catch (e) {
            throw new Error('error including ticket');
        }
    }
}