import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, BacklogTicket } from "@headless/store/types";
import { AddTicketDialogConnected} from '../AddTicketDialog';
import { pick, Omit } from 'lodash';
import { CloseSprintDialogConnected } from '../CloseSprintDialog';
import { BacklogListConnected } from './BacklogList';
import { storeActions } from '@headless/store';

const mapStateToProps = ({ ticketList, addTicket }: AppState, ownProps: any) => {
    const { showCloseSprintDialog } = ticketList;
    return {
        showAddTicketDialog: addTicket.open,
        ...pick(ticketList, 'sprintTickets', 'closedTickets'),
        showCloseSprintDialog
    };
};

type TicketListProps = ReturnType<typeof mapStateToProps>;

const mapActionsToProps = {
    ...pick(storeActions.ticketList, 'fetchTickets', 'closeTicket', 'addTicketToSprint'),
    setTicketListState: storeActions.ticketList.set,
    setAddTicketDialogState: storeActions.addTicket.set,
    onRemoveFromSprint: storeActions.ticketList.removeFromSprint,
    openCloseSprintDialog: storeActions.ticketList.openCloseSprintDialog,
    updatePriorities: storeActions.ticketList.updatePriorities
};

type TicketListActions = typeof mapActionsToProps;

interface ActionsNoThunk extends Omit<TicketListActions, 'onRemoveFromSprint' | 'fetchTickets' | 'closeTicket' | 'addTicketToSprint' | 'openCloseSprintDialog' | 'updatePriorities'> {
    onRemoveFromSprint: (id: string) => void;
    fetchTickets: () => void;
    closeTicket: (id: string) => void;
    addTicketToSprint: (id: string) => void;
    openCloseSprintDialog: () => void;
    updatePriorities: (newTickets: BacklogTicket[]) => void;
} 

export class TicketList extends React.Component<TicketListProps & ActionsNoThunk> {

    async componentDidMount() {
        await this.props.fetchTickets();
    }

    closeAddticketDialog() {
        this.props.setAddTicketDialogState({ open : false });
    }

    onClickClose(id: string) {
        this.props.closeTicket(id);
    }

    render() {
        return (
            <div>
                
                <BacklogListConnected />

                <AddTicketDialogConnected
                    open={this.props.showAddTicketDialog}
                    onRequestClose={(this.closeAddticketDialog.bind(this))}
                    onSubmit={() => {this.props.setAddTicketDialogState({open: false});}}
                />

                <CloseSprintDialogConnected  
                    open={this.props.showCloseSprintDialog} 
                    onRequestClose={() => this.props.setTicketListState({ showCloseSprintDialog: false })}
                    onSubmit={() => this.props.setTicketListState({ showCloseSprintDialog: false })}
                />
            </div>
        );
    }
}

export const TicketListConnected = connect(mapStateToProps, mapActionsToProps)(TicketList);
