import { TicketPouchDb, Ticket } from "../../PouchWrapper";

export function getTickets(db: TicketPouchDb) {
    return async function(): Promise < Ticket[] > {
        try {
            const ticketsResult = await db.find({
                selector: { 
                    
                 }
            });
            return ticketsResult.docs;
        } catch(e) {
            throw new Error('error fetching tickets');
        }
    }
}