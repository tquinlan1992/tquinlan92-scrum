import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from "@headless/store";
import { Switch, Route, Redirect } from 'react-router';
import TicketList from '../TicketList';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { actions as loadingActions } from './redux';
import AppBar from '../AppBar';

interface ComponentActions {
    loadApp: typeof loadingActions.loadApp;
}

function Routes({withComponents}: {withComponents: boolean;}) {
    return (
        <Switch>
            <Route exact path={"/feed"} component={withComponents ? TicketList : undefined} />
            { !withComponents ? <Redirect to='/feed' /> : null }
        </Switch>
    );
}

export class Loading extends React.Component<StateProps & ComponentActions> {
    componentDidMount() {
        this.props.loadApp();
    }

    render() {
        const loading =
            <div>
                <Routes withComponents={false}/>
                <h1> Loading </h1>
                <CircularProgress size={50} />
            </div>;

        const app =
            <React.Fragment>
                <AppBar />
                <Routes withComponents={true}/>
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

export default connect<StateProps, ComponentActions>(mapStateToProps, mapDispatchToProps)(Loading);
