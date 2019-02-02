import { Omit } from "react-router";
import { TicketPouchDb, Ticket } from "../../PouchWrapper";
import { v4 as uuid } from "uuid";

export function addTicket(db: TicketPouchDb) {
    return async (params: Omit<Ticket, '_id' | 'deleted'>) => {
        try {
            return await db.put({ _id: uuid(), ...params, deleted: false });
        } catch (e) {
            throw new Error('error adding ticket');
        }
    }
}