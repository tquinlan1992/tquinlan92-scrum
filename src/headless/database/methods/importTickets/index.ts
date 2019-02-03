import { TicketPouchDb, Tickets, Ticket } from "../../PouchWrapper";
import { omit } from "lodash";
import { deleteAllTickets } from "../deleteAllTickets";

export function importTickets(db: TicketPouchDb) {
    return async (tickets: Tickets) => {
        await deleteAllTickets(db)();
        await db.compact();
        const ticketsWithoutRev = tickets.map(ticket => {
            return omit(ticket, '_rev') as Ticket;
        })
        await db.bulkDocs(ticketsWithoutRev);
    }
}