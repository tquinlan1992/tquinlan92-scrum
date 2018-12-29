import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from "@headless/store";
import { Button, Paper } from "@material-ui/core";
import AddTicketDialog from '../AddTicketDialog';
import { actions as ticketListActions, ClosedTicket, BacklogTicket, SprintTicket } from './redux';
import { pick } from 'lodash';
import CloseSprintDialog from '../CloseSprintDialog';
import DraggableList from '../DraggableListMaterial';
import { TicketTable } from '@components/Table';

interface TicketListProps {
    showAddTicketDialog: boolean;
    backlogTickets: BacklogTicket[];
    sprintTickets: SprintTicket[];
    closedTickets: ClosedTicket[];
    showCloseSprintDialog: boolean;
}

const mapStateToProps = ({ ticketList }: AppState, ownProps: any): TicketListProps => {
    const { showAddTicketDialog, showCloseSprintDialog } = ticketList;
    return {
        showAddTicketDialog,
        ...pick(ticketList, 'backlogTickets', 'sprintTickets', 'closedTickets'),
        showCloseSprintDialog
    };
};

const mapActionsToProps = {
    ...pick(ticketListActions, 'fetchTickets', 'closeTicket', 'addTicketToSprint'),
    setTicketListState: ticketListActions.set,
    openAddTicketDialog: ticketListActions.openAddTicketDialog,
    onRemoveFromSprint: ticketListActions.removeFromSprint,
    openCloseSprintDialog: ticketListActions.openCloseSprintDialog,
    updatePriorities: ticketListActions.updatePriorities
};

type TicketListActions = typeof mapActionsToProps;

export class TicketList extends React.Component<TicketListProps & TicketListActions> {

    async componentDidMount() {
        await this.props.fetchTickets();
    }

    openAddticketDialog() {
        this.props.openAddTicketDialog();
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

                <Paper style={{margin: '5px auto'}}>
                <DraggableList title='Backlog' listItems={this.props.backlogTickets} updateItems={this.props.updatePriorities.bind(this)}/>
                <Button title='Add Ticket' onClick={this.openAddticketDialog.bind(this)}> Add Ticket </Button>
                </Paper>

                <AddTicketDialog
                    open={this.props.showAddTicketDialog}
                    onRequestClose={(this.closeAddticketDialog.bind(this))}
                    onSubmit={() => {this.props.setTicketListState({showAddTicketDialog: false});}}
                />

                <CloseSprintDialog 
                    open={this.props.showCloseSprintDialog} 
                    onRequestClose={() => this.props.setTicketListState({ showCloseSprintDialog: false })}
                    onSubmit={() => this.props.setTicketListState({ showCloseSprintDialog: false })}
                />
            </div>
        );
    }
}

export default connect<TicketListProps, TicketListActions>(mapStateToProps, mapActionsToProps)(TicketList);
