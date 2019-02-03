import { TicketPouchDb } from "../../PouchWrapper";

export function deleteAllTickets(db: TicketPouchDb) {
    return async () => {
        const allDocs = await db.allDocs();
        const deleteDocs = allDocs.rows.map(({id, value}) => {
            return {_id: id, _rev: value.rev, _deleted: true};
        });
        await db.bulkDocs(deleteDocs as any);
    }
}