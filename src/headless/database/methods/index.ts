import { updateDoc } from "./updateDoc";
import { getTickets } from "./getTickets";
import { addTicket } from "./addTicket";
import { deleteTicket } from "./deleteTicket";
import { markTicketInSprint } from "./markTicketInSprint";
import { markTicketPriority } from "./markTicketPriority";
import { closeTicket } from "./closeTicket";
import { removeFromSprint } from "./removeFromSprint";
import { closeTicketsWithSprintID } from "./closeTicketsWithSprintId";

export const methods = {
    updateDoc, 
    getTickets,
    addTicket,
    deleteTicket,
    markTicketInSprint,
    markTicketPriority,
    closeTicket,
    removeFromSprint,
    closeTicketsWithSprintID
} 

export type MethodsReturnTypes = { [P in keyof typeof methods]: ReturnType<typeof methods[P]> };
