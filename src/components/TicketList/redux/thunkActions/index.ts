import { fetchTickets } from './fetchTickets';
import { deleteTicket } from './deleteTicket';
import { closeTicket } from './closeTicket';
import { addTicketToSprint } from './addTicketToSprint';
import { openAddTicketDialog } from './openAddTicketDialog';
import { removeFromSprint } from './removeFromSprint';
import { openCloseSprintDialog } from './openCloseSprintDialog';
import { updatePriorities } from './updatePriorities';

export const ticketListThunkActions = {
    fetchTickets,
    deleteTicket,
    closeTicket,
    addTicketToSprint,
    openAddTicketDialog,
    removeFromSprint,
    openCloseSprintDialog,
    updatePriorities
};
