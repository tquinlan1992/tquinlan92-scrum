import { Omit } from "react-router";
import { TicketPouchDb, Ticket, DocTypes } from "../../PouchWrapper";
import { v4 as uuid } from "uuid";

export function addTicket(db: TicketPouchDb) {
    return async (params: Omit<Ticket, '_id' | 'deleted' | 'type'>) => {
        try {
            return await db.put({ _id: uuid(), ...params, deleted: false, type: DocTypes.ticket });
        } catch (e) {
            throw new Error('error adding ticket');
        }
    }
}