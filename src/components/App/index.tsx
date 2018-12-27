import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Theme from '../Theme';
// import TopAppBar from '../TopAppbar';
import Loading from '../Loading';

export default (store: any) => {
    return ReactDOM.render(
        <Provider store={store}>
            <Theme>
                <Router>
                    <Loading/>
                </Router>
            </Theme>
        </Provider>
        , document.getElementById('app')
    );
};
