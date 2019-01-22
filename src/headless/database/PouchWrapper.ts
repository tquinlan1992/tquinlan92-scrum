import { mapValues } from 'lodash';
import { methods, MethodsReturnTypes } from "./methods";

export interface Ticket {
    title: string;
    storyPoint: null | number;
    description: string;
    deleted: boolean;
    closed?: boolean;
    sprint?: boolean;
    sprintName?: string;
    priority?: number;
    _id: string;
}

export type Tickets = Ticket[];

export type TicketPouchDb = PouchDB.Database<Ticket>;

class PouchWrapper {

    db: TicketPouchDb;

    actions: MethodsReturnTypes;

    getMethodsWithDb(methodsToConnectToDb: typeof methods) {
        return (mapValues(methodsToConnectToDb, method => {
            return method(this.db);
        }) as any) as MethodsReturnTypes;
    }

    constructor({ pouchDb }: {pouchDb: TicketPouchDb}) {
        this.db = pouchDb;
        this.actions = this.getMethodsWithDb(methods);
    }

}

export { PouchWrapper };
