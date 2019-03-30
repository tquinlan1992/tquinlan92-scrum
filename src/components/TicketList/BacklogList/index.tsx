import * as React from 'react';
import { Props, Actions, mapStateToProps, mapDispatchToProps } from './mapProps';
import { Paper, Button } from '@material-ui/core';
import { DraggableList } from '@components/DraggableList';
import { connect } from "react-redux";
import { Omit } from 'lodash';

export class BacklogListComponent extends React.Component<Props & Actions> {

    render() {
        const { backlogTickets, updatePriorities, sprintTickets, updateSprintPriorities } = this.props;
        const firstTable = {
            elementId: 'backlog',
            title: 'Backlog',
            items: backlogTickets,
            update: updatePriorities
        }
        const secondTable = {
            elementId: 'sprint',
            title: 'Sprint',
            items: sprintTickets,
            update: updateSprintPriorities
        }
        const menuItems = [
            {
                onClick: this.props.openEditTicket,
                label: 'Edit'
            },
            {
                onClick: this.props.closeTicket,
                label: 'Close'
            }
        ]
        return (
            <React.Fragment>
                <DraggableList menuItems={menuItems} secondTable={secondTable} firstTable={firstTable} />
                <Button color="primary" variant="raised" title='Add Ticket' onClick={this.props.openAddTicketDialog}> Add Ticket </Button>
            </React.Fragment>
        );
    }
}

export const BacklogListConnected = connect(mapStateToProps, mapDispatchToProps)(BacklogListComponent);

