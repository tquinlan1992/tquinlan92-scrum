import { AppState } from "@headless/store";
import { ticketListActions, BacklogTicket, SprintTicket } from "../redux";
import { AppStateThunkDispatch } from "@src/utils";
import { Item } from "@components/DraggableList/DroppableId";

export const mapStateToProps = ({ ticketList }: AppState) => {
    const { backlogTickets, sprintTickets } = ticketList;
    return {
        backlogTickets,
        sprintTickets
    };
};

export type Props = ReturnType<typeof mapStateToProps>;

export const mapDispatchToProps = (dispatch: AppStateThunkDispatch) => ({
    openAddTicketDialog: () => dispatch(ticketListActions.openAddTicketDialog()),
    updatePriorities: (newItems: Item[], id?: string) => dispatch(ticketListActions.updatePriorities(newItems as BacklogTicket[], id)),
    addToSprint: (id: string) => dispatch(ticketListActions.addTicketToSprint(id)),
    updateSprintPriorities: (sprintTickets: Item[], id?: string) => dispatch(ticketListActions.updateSprintPriorities(sprintTickets as SprintTicket[], id))
});

export type Actions = ReturnType<typeof mapDispatchToProps>;