import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from "@headless/store";
import { actions as stateActions } from './redux';
import { AppBar as MaterialUiAppBar, Toolbar, Button } from '@material-ui/core';

interface StateProps {
}

interface ComponentActions {
    openAddTicketDialog: typeof stateActions.openAddTicketDialog;
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

const mapDispatchToProps = stateActions;

export default connect<StateProps, ComponentActions>(mapStateToProps, mapDispatchToProps)(AppBar);
