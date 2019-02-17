import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Theme } from '../Theme';
// import TopAppBar from '../TopAppbar';
import { LoadingConnected } from '../Loading';

export const App =  (store: any) => {
    return ReactDOM.render(
        <Provider store={store}>
            <Theme>
                <LoadingConnected/>
            </Theme>
        </Provider>
        , document.getElementById('app')
    );
};
