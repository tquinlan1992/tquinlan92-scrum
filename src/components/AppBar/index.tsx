import * as React from 'react';
import { connect, Omit } from 'react-redux';
import { AppState } from "@headless/store/types";
import { AppBar as MaterialUiAppBar, Button, Theme, WithStyles, withStyles, Grid, Typography, Tabs, Tab } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import logo from './logo.png';
import { navigateTo } from '@src/utils';
import { paths } from '@components/Routes/paths';
import { withRouter, RouteComponentProps } from "react-router";
import { isNil } from 'lodash';
import { storeActions } from '@headless/store';


type CreateStylesReturnTheme<C extends string> = Record<C, CSSProperties>;

type GetThemeCallback<C extends string> = (theme: Theme) => CreateStylesReturnTheme<C>;

function getTheme<C extends string>(getThemeCallback: GetThemeCallback<C>) {
    return (theme: Theme) => getThemeCallback(theme);
}
const styles = getTheme(theme => {
    const center: CSSProperties = {
        padding: theme.spacing.unit,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
    return {
        appBar: {
            zIndex: theme.zIndex.drawer + 1
        },
        center
    }
})

interface StateProps {
}

interface ComponentActionsNoThunk extends Omit<ComponentActions, 'openAddTicketDialog'> {
    openAddTicketDialog: () => void;
}

export class AppBar extends React.Component<StateProps & ComponentActionsNoThunk & WithStyles<typeof styles> & RouteComponentProps<{}>> {
    addTicket() {
        this.props.openAddTicketDialog();
    }

    handleTabChange(event: React.ChangeEvent<{}>, value: number) {
        switch(value) {
            case 0:
                navigateTo(paths.closed.path);
                break;
            case 1:
                navigateTo(paths.feed.path)
                break;
        }
    }

    getTabValue() {
        let value = null;
        switch(this.props.location.pathname) {
            case paths.closed.path:
                value = 0;
                break;
            case paths.feed.path:
                value = 1;
                break;
        }
        return {
            value,
            disabled: value === null
        }
    }

    render() {
        const { value: tabValue, disabled } = this.getTabValue();
        console.log('tabValue', tabValue);
        return (
            <MaterialUiAppBar color="secondary" position="fixed" className={this.props.classes.appBar}>
                <Grid container style={{ height: '67px' }}>
                    <Grid className={this.props.classes.center} item style={{ width: '10%', margin: 'auto', cursor: 'pointer' }}>
                        <img style={{ height: '55px', margin: 'auto' }} src={logo} />
                    </Grid>
                    <Grid item style={{ width: '80%' }}>
                        <Tabs
                            onChange={this.handleTabChange}
                            value={tabValue}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="Closed" disabled={disabled} />
                            <Tab label="Open" disabled={disabled} />
                        </Tabs>
                    </Grid>
                    <Grid className={this.props.classes.center} style={{ width: '10%', backgroundColor: '#00D036', height: '67px', cursor: 'pointer' }} onClick={this.addTicket.bind(this)} item>
                        <Typography style={{ color: 'white', fontSize: '17px', fontWeight: 'bold', lineHeight: '47px' }}>+ New Task</Typography>
                    </Grid>
                </Grid>
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
    openAddTicketDialog: storeActions.ticketList.openAddTicketDialog
};

type ComponentActions = typeof mapDispatchToProps;

export const AppBarConnected = withRouter(connect(mapStateToProps, mapDispatchToProps)(AppBarStyled));
