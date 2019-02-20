import { TicketPouchDb, Ticket, DocTypes } from "../../PouchWrapper";

export function getTickets(db: TicketPouchDb) {
    return async function(): Promise < Ticket[] > {
        try {
            const ticketsResult = await db.find({
                selector: { 
                    type: DocTypes.ticket    
                }
            });
            return ticketsResult.docs as Ticket[];
        } catch(e) {
            throw new Error('error fetching tickets');
        }
    }
}