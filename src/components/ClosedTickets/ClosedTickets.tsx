import * as React from 'react';
import { Props, Actions, mapStateToProps, mapDispatchToProps } from './mapProps';
import { connect } from 'react-redux';
import { TicketTable } from '@components/Table';


export class ClosedTickets extends React.Component<Props & Actions> {

    render() {
        return (
            <TicketTable title='Closed' tickets={this.props.closedTickets} />
        );
    }
}

export const ClosedTicketsConnected = connect(mapStateToProps, mapDispatchToProps)(ClosedTickets);

