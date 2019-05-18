import { AppStateThunkDispatch } from "@src/utils";
import { Item } from "@components/DraggableList/DroppableId";
import { AppState, BacklogTicket, SprintTicket } from "@headless/store/types";
import { storeActions } from "@headless/store";

export const mapStateToProps = ({ ticketList }: AppState) => {
    const { backlogTickets, sprintTickets } = ticketList;
    return {
        backlogTickets,
        sprintTickets
    };
};

export type Props = ReturnType<typeof mapStateToProps>;

export const mapDispatchToProps = (dispatch: AppStateThunkDispatch) => ({
    openAddTicketDialog: () => dispatch(storeActions.ticketList.openAddTicketDialog()),
    updatePriorities: (newItems: Item[], id?: string) => dispatch(storeActions.ticketList.updatePriorities(newItems as BacklogTicket[], id)),
    addToSprint: (id: string) => dispatch(storeActions.ticketList.addTicketToSprint(id)),
    updateSprintPriorities: (sprintTickets: Item[], id?: string) => dispatch(storeActions.ticketList.updateSprintPriorities(sprintTickets as SprintTicket[], id)),
    closeTicket: (id: string) => dispatch(storeActions.ticketList.closeTicket(id)),
    openEditTicket: (id: string) => dispatch(storeActions.ticketList.openEditTask(id))
});

export type Actions = ReturnType<typeof mapDispatchToProps>;