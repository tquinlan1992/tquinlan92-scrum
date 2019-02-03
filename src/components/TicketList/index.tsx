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
import { ConnectedExportButton } from './ExportButton';

const mapStateToProps = ({ ticketList }: AppState, ownProps: any) => {
    const { showAddTicketDialog, showCloseSprintDialog } = ticketList;
    return {
        showAddTicketDialog,
        ...pick(ticketList, 'sprintTickets', 'closedTickets'),
        showCloseSprintDialog
    };
};

type TicketListProps = ReturnType<typeof mapStateToProps>;

const mapActionsToProps = {
    ...pick(ticketListActions, 'fetchTickets', 'closeTicket', 'addTicketToSprint'),
    setTicketListState: ticketListActions.set,
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
        this.props.setTicketListState({ showAddTicketDialog: false });
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

                <ConnectedExportButton />
                
                <AddTicketDialogConnected
                    open={this.props.showAddTicketDialog}
                    onRequestClose={(this.closeAddticketDialog.bind(this))}
                    onSubmit={() => {this.props.setTicketListState({showAddTicketDialog: false});}}
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
