import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from "@headless/store";
import { AppBar as MaterialUiAppBar, Toolbar, Button } from '@material-ui/core';
import { ticketListActions } from '@components/TicketList/redux';

interface StateProps {
}

export class AppBar extends React.Component<StateProps & ComponentActions> {
    addTicket() {
        this.props.openAddTicketDialog();
    }

    render() {
        return (
            <MaterialUiAppBar position="static">
                <Toolbar>
                    <Button onClick={this.addTicket.bind(this)}> Add Ticket </Button>
                </Toolbar>
            </MaterialUiAppBar>
        );
    }
}

const mapStateToProps = ({ loading }: AppState) => {
    return {
        loading: loading.value
    };
};

const mapDispatchToProps = {
    openAddTicketDialog: ticketListActions.openAddTicketDialog
};

type ComponentActions = typeof mapDispatchToProps;

export const AppBarConnected = connect<StateProps, ComponentActions>(mapStateToProps, mapDispatchToProps)(AppBar);
