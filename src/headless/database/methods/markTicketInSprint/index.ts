import { TicketPouchDb } from "../../PouchWrapper";

export function markTicketInSprint(db: TicketPouchDb) {
    return async function ({id, sprint}: {id: string, sprint: boolean}) {
        try {
            const ticketDoc = await db.get(id);
            return db.put({
                ...ticketDoc,
                sprint
            });
        } catch (e) {
            throw new Error('error including ticket');
        }
    }
}