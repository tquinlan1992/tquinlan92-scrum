import { updateDoc } from "./updateDoc";
import { getTickets } from "./getTickets";
import { addTicket } from "./addTicket";
import { deleteTicket } from "./deleteTicket";
import { markTicketInSprint } from "./markTicketInSprint";
import { markTicketPriority } from "./markTicketPriority";
import { closeTicket } from "./closeTicket";
import { removeFromSprint } from "./removeFromSprint";
import { closeTicketsWithSprintID } from "./closeTicketsWithSprintId";
import { importTickets } from './importTickets';
import { deleteAllTickets } from './deleteAllTickets';
import { saveCode } from "./saveCode";
import { getCode } from './getCode';
import { getCodes } from "./getCodes";

export const methods = {
    updateDoc, 
    getTickets,
    addTicket,
    deleteTicket,
    markTicketInSprint,
    markTicketPriority,
    closeTicket,
    removeFromSprint,
    closeTicketsWithSprintID,
    importTickets,
    deleteAllTickets,
    saveCode,
    getCode,
    getCodes
} 

export type MethodsReturnTypes = { [P in keyof typeof methods]: ReturnType<typeof methods[P]> };
