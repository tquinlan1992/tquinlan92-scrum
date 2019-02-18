import * as React from 'react';
import { Props, Actions, mapStateToProps, mapDispatchToProps } from './mapProps';
import { Paper, Button } from '@material-ui/core';
import { DraggableList } from '@components/DraggableList';
import { connect } from "react-redux";
import { AppState } from '@headless/store';
import { Omit } from 'lodash';

interface ActionsNoThunk extends Omit<Actions, 'openAddTicketDialog' | 'updatePriorities'> {
    openAddTicketDialog: () => void;
    updatePriorities: (newTickets: any[]) => void;
}

export class BacklogListComponent extends React.Component<Props & ActionsNoThunk> {

    render() {
        return (
            <Paper style={{margin: '5px auto'}}>
            <DraggableList title='Backlog' listItems={this.props.backlogTickets} updateItems={this.props.updatePriorities.bind(this)}/>
            <Button title='Add Ticket' onClick={this.props.openAddTicketDialog}> Add Ticket </Button>
            </Paper>
        );
    }
}

export const BacklogListConnected = connect<Props, Actions, void, AppState>(mapStateToProps, mapDispatchToProps)(BacklogListComponent);

