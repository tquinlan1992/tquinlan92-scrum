import * as React from 'react';
import { Props, Actions } from './mapProps';
import { Paper, Button } from '@material-ui/core';
import { DraggableList } from '@components/DraggableList';


export class BacklogListComponent extends React.Component<Props & Actions> {

    render() {
        return (
            <Paper style={{margin: '5px auto'}}>
            <DraggableList title='Backlog' listItems={this.props.backlogTickets} updateItems={this.props.updatePriorities.bind(this)}/>
            <Button title='Add Ticket' onClick={this.props.openAddTicketDialog}> Add Ticket </Button>
            </Paper>
        );
    }
}
