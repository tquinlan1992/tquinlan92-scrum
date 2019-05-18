import * as React from 'react';
import { connect, ResolveThunks } from 'react-redux';
import { AppState } from "@headless/store/types";
import { Routes } from '@components/Routes';
import { StyledSidebar } from '../Sidebar/index';
import { SidebarMenuConnected } from '@components/SidebarMenu';
import { Router } from 'react-router';
import { history } from '../../headless/store/middleware/router';
import { Omit } from 'lodash';
import { storeActions } from '@headless/store';

interface ComponentActions {
    loadApp: typeof storeActions.loading.loadApp;
}

export class Loading extends React.Component<StateProps & ResolveThunks<ComponentActions>> {
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

const mapDispatchToProps = storeActions.loading;

export const LoadingConnected = connect(mapStateToProps, mapDispatchToProps)(Loading);
