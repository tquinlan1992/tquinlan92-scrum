import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from "@headless/store";
import { Button, Paper } from "@material-ui/core";
import { AddTicketDialogConnected} from '../AddTicketDialog';
import { ticketListActions } from './redux';
import { pick } from 'lodash';
import { CloseSprintDialogConnected } from '../CloseSprintDialog';
import { TicketTable } from '@components/Table';
import { BacklogListConnected } from './BacklogList';
import { addTicketDialogActions } from '@components/AddTicketDialog/redux';

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
    ...pick(ticketListActions, 'fetchTickets', 'closeTicket', 'addTicketToSprint'),
    setTicketListState: ticketListActions.set,
    setAddTicketDialogState: addTicketDialogActions.set,
    onRemoveFromSprint: ticketListActions.removeFromSprint,
    openCloseSprintDialog: ticketListActions.openCloseSprintDialog,
    updatePriorities: ticketListActions.updatePriorities
};

type TicketListActions = typeof mapActionsToProps;

export class TicketList extends React.Component<TicketListProps & TicketListActions> {

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
                
                <Paper style={{margin: '5px auto'}}>
                <TicketTable title='Closed' tickets={this.props.closedTickets} />
                </Paper>

                <Paper style={{margin: '5px auto'}}>
                <TicketTable title='Sprint' onClose={this.onClickClose.bind(this)} onRemoveFromSprint={this.props.onRemoveFromSprint.bind(this)} tickets={this.props.sprintTickets} />
                <Button title='Close Sprint' onClick={() => this.props.openCloseSprintDialog()}> Close Sprint </Button>
                </Paper>

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

export const TicketListConnected = connect<TicketListProps, TicketListActions>(mapStateToProps, mapActionsToProps)(TicketList);
