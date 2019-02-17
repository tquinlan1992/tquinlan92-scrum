import { AppThunkAction } from "@headless/store";
import { getRemoteDb } from "@headless/database/pouch";
import exportFromJSON from 'export-from-json';

export function exportTickets(): AppThunkAction {
    return async function (dispatch) {
        const db = await getRemoteDb();
        const tickets = await db.getTickets();
        exportFromJSON({data: tickets, fileName: 'tickets', exportType: 'json'});
    };
}