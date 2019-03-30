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
import { getTicketById } from "./getTicketById/getTicketById";
import { editTask } from "./editTask";

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
    getTicketById,
    editTask
} 

export type MethodsReturnTypes = { [P in keyof typeof methods]: ReturnType<typeof methods[P]> };
