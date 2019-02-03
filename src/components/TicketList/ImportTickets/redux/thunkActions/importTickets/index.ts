import { AppThunkAction } from "@headless/store";
import { Tickets } from "@headless/database/PouchWrapper";
import { getRemoteDb } from "@headless/database/pouch";

export function importTickets(tickets: Tickets): AppThunkAction {
    return async () => {
        const db = await getRemoteDb();
        await db.importTickets(tickets);
    }
}