import * as React from 'react';
import { connect } from 'react-redux';
import { AppStateCore } from "@headless/store";
import { Table, Button, TableHead, TableRow, TableBody, TableCell, TextField } from "@material-ui/core";
import AddTicketDialog from '../AddTicketDialog';
import { actions as ticketListActions, ClosedTicket, BacklogTicket, SprintTicket } from './redux';
import { pick } from 'lodash';
import { Ticket } from '@database/PouchWrapper';
import CloseSprintDialog from '../CloseSprintDialog';
import DraggableList from '../DraggableListMaterial';

type Tickets = Ticket[];

interface TicketListProps {
    showAddTicketDialog: boolean;
    backlogTickets: BacklogTicket[];
    sprintTickets: SprintTicket[];
    closedTickets: ClosedTicket[];
    showCloseSprintDialog: boolean;
}

interface TicketTableParams {
    tickets: Tickets;
    onClose?: (id: string) => void;
    onAddTicketToSprint?: (id: string) => void;
    onRemoveFromSprint?: (id: string) => void;
}

const mapStateToProps = ({ core }: AppStateCore, ownProps: any): TicketListProps => {
    const { showAddTicketDialog, showCloseSprintDialog } = core.ticketList;
    return {
        showAddTicketDialog,
        ...pick(core.ticketList, 'backlogTickets', 'sprintTickets', 'closedTickets'),
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

function TicketTable({ tickets, onClose, onAddTicketToSprint, onRemoveFromSprint }: TicketTableParams) {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Ticket</TableCell>
                    <TableCell>Sprint Name</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {tickets.map(ticket => {
                    return (<TableRow key={ticket._id} draggable={true}>
                        <TableCell>
                            <TextField
                                defaultValue={ticket.title}
                            />
                        </TableCell>
                        <TableCell>
                            {ticket.sprintName}
                        </TableCell>
                        <TableCell>
                            {ticket.closed ? 'Closed' : ''}
                        </TableCell>
                        <TableCell>
                            {ticket.sprint ? 'Sprint' : ''}
                        </TableCell>
                        <TableCell>
                            { onAddTicketToSprint ? <Button title='Add To Sprint' onClick={() => onAddTicketToSprint(ticket._id)}> Add To Sprint </Button> : null}
                            { onRemoveFromSprint ? <Button title='Open Ticket' onClick={() => onRemoveFromSprint(ticket._id)}> Remove From Sprint </Button> : null}
                            { onClose ? <Button title='Close Ticket' onClick={() => onClose(ticket._id)}> Close Ticket </Button> : null}
                        </TableCell>
                    </TableRow>);
                })}
            </TableBody>
        </Table>
    );
}

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
                <h1>Closed</h1>
                <TicketTable tickets={this.props.closedTickets} />

                <h1>Sprint</h1>
                <Button title='Close Sprint' onClick={() => this.props.openCloseSprintDialog()}> Close Sprint </Button>
                <TicketTable onClose={this.onClickClose.bind(this)} onRemoveFromSprint={this.props.onRemoveFromSprint.bind(this)} tickets={this.props.sprintTickets} />

                <h1>Backlog</h1>                
                <DraggableList listItems={this.props.backlogTickets} updateItems={this.props.updatePriorities.bind(this)}/>
                <Button title='Add Ticket' onClick={this.openAddticketDialog.bind(this)}> Add Ticket </Button>

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
