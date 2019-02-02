import { TicketPouchDb } from "../PouchWrapper";


export interface GetTicketsParams {
    id: string;
    value: string;
}

export function updateDoc(db: TicketPouchDb) {
    return async function ({ id, value }: GetTicketsParams) {
        const ticketDoc = await db.get(id);
        db.put({
            ...ticketDoc,
            value
        });
    }
}