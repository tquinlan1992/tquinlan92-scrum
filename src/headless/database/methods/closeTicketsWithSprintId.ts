import { TicketPouchDb } from "../PouchWrapper";

export function closeTicketsWithSprintID(db: TicketPouchDb) {
    return async ({ ids, sprintName }:{ ids: string[]; sprintName: string; }) => {
        try {
            const ticketDocsPromises = ids.map(async (id) => {
                return db.get(id);
            });
            const ticketDocsResolved = await Promise.all(ticketDocsPromises);
            const closedTicketDocs = ticketDocsResolved.map(ticketDoc => {
                return {
                    ...ticketDoc,
                    sprint: false,
                    sprintName
                };
            });
            const closedTicketDocsPromises = closedTicketDocs.map(async (closedTicket) => {
                return db.put(closedTicket);
            });
            await Promise.all(closedTicketDocsPromises).then(() => {
                return;
            });
        } catch (e) {
            throw new Error('error closing sprint');
        }
    }
}