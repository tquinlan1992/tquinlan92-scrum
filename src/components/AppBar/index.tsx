import * as React from 'react';
import { connect, Omit } from 'react-redux';
import { AppState } from "@headless/store";
import { AppBar as MaterialUiAppBar, Button, Theme, WithStyles, withStyles } from '@material-ui/core';
import { ticketListActions } from '@components/TicketList/redux';
import { CSSProperties } from '@material-ui/core/styles/withStyles';


type CreateStylesReturnTheme<C extends string> = Record<C, CSSProperties>;

type GetThemeCallback<C extends string> = (theme: Theme) => CreateStylesReturnTheme<C>;

function getTheme<C extends string>(getThemeCallback: GetThemeCallback<C>) {
    return (theme: Theme) => getThemeCallback(theme);
}
const styles = getTheme(theme => {
    return {
        appBar: {
            zIndex: theme.zIndex.drawer + 1
        }
    }
})

interface StateProps {
}

interface ComponentActionsNoThunk extends Omit<ComponentActions, 'openAddTicketDialog'> {
    openAddTicketDialog: () => void;
}  

export class AppBar extends React.Component<StateProps & ComponentActionsNoThunk & WithStyles<typeof styles>> {
    addTicket() {
        this.props.openAddTicketDialog();
    }

    render() {
        return (
            <MaterialUiAppBar position="fixed" className={this.props.classes.appBar}>
                <Button onClick={this.addTicket.bind(this)}> Add Ticket </Button>
            </MaterialUiAppBar>
        );
    }
}

const AppBarStyled = withStyles(styles)(AppBar); 

export function mapStateToProps({ loading }: AppState) {
    return {
        loading: loading.value
    };
};

const mapDispatchToProps = {
    openAddTicketDialog: ticketListActions.openAddTicketDialog
};

type ComponentActions = typeof mapDispatchToProps;

export const AppBarConnected = connect<StateProps, ComponentActions, void, AppState>(mapStateToProps, mapDispatchToProps)(AppBarStyled);
