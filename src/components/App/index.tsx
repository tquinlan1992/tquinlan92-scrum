import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Theme } from '../Theme';
// import TopAppBar from '../TopAppbar';
import { LoadingConnected } from '../Loading';

export const App =  (store: any) => {
    return ReactDOM.render(
        <Provider store={store}>
            <Theme>
                <Router>
                    <LoadingConnected/>
                </Router>
            </Theme>
        </Provider>
        , document.getElementById('app')
    );
};
