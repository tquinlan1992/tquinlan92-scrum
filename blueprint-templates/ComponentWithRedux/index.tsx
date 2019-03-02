import * as React from 'react';
import { Props, Actions, mapStateToProps, mapDispatchToProps } from './mapProps';
import { appStateConnect } from '@src/utils';


export class Component extends React.Component<Props & Actions> {

    render() {
        return (
            <h1>Component</h1>
        );
    }
}

export const ConnectedComponent = appStateConnect<Props, Actions, {}>(mapStateToProps, mapDispatchToProps)(Component);

