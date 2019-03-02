import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from "@headless/store";
import { actions as loadingActions } from './redux';
import { Routes } from '@components/Routes';
import { StyledSidebar } from '../Sidebar/index';
import { SidebarMenuConnected } from '@components/SidebarMenu';
import { Router } from 'react-router';
import { history } from '../../headless/store/middleware/router';
import { Omit } from 'lodash';

interface ComponentActions {
    loadApp: typeof loadingActions.loadApp;
}

interface ComponentActionsNoThunk extends Omit<ComponentActions, 'loadApp'> {
    loadApp: () => void;
}

export class Loading extends React.Component<StateProps & ComponentActionsNoThunk> {
    componentDidMount() {
        this.props.loadApp();
    }

    render() {
        const loading = null;

        const app =
            <Router history={history}>
                <StyledSidebar sidebar={<SidebarMenuConnected />} main={<Routes />} />
            </Router>
        const loadingOrApp = this.props.loading ? loading : app;
        return (
            <div>
                {loadingOrApp}
            </div>
        );
    }
}

const mapStateToProps = ({ loading }: AppState) => {
    return {
        loading: loading.value
    };
};

interface StateProps {
    loading: boolean;
}

const mapDispatchToProps = loadingActions;

export const LoadingConnected = connect(mapStateToProps, mapDispatchToProps)(Loading);
