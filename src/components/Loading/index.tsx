import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from "@headless/store";
import { actions as loadingActions } from './redux';
import { AppBarConnected } from '../AppBar';
import { Routes } from '@components/Routes';

interface ComponentActions {
    loadApp: typeof loadingActions.loadApp;
}

export class Loading extends React.Component<StateProps & ComponentActions> {
    componentDidMount() {
        this.props.loadApp();
    }

    render() {
        const loading = null;

        const app =
            <React.Fragment>
                <AppBarConnected />
                <Routes />
            </React.Fragment>;
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

export const LoadingConnected = connect<StateProps, ComponentActions>(mapStateToProps, mapDispatchToProps)(Loading);
