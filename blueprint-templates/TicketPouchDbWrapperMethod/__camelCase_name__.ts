import { TicketPouchDb } from "../../PouchWrapper";

export function wrapperMethod(db: TicketPouchDb) {
    return async (id: string) => {
        // method using db
    }
}