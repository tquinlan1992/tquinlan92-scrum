import { Omit } from "react-router";
import { TicketPouchDb, Ticket, DocTypes } from "../../PouchWrapper";

export function editTask(db: TicketPouchDb) {
    return async (params: Omit<Ticket, 'deleted' | 'type'>) => {
        try {
            const task = await db.get(params._id);
            const newTask = {
                ...task,
                ...params
            }
            return await db.put(newTask);
        } catch (e) {
            console.log('e', e);
            throw new Error('error adding ticket');
        }
    }
}