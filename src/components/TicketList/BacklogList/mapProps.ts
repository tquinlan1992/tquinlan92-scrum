import { AppState } from "@headless/store";
import { ticketListActions } from "../redux";

export const mapStateToProps = ({ ticketList }: AppState) => {
    const { backlogTickets } = ticketList;
    return {
        backlogTickets
    };
};

export type Props = ReturnType<typeof mapStateToProps>;

export const mapDispatchToProps = {
    openAddTicketDialog: ticketListActions.openAddTicketDialog,
    updatePriorities: ticketListActions.updatePriorities
};

export type Actions = typeof mapDispatchToProps;