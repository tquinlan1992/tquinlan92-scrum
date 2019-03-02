import * as React from 'react';
import { Props, Actions, mapStateToProps, mapDispatchToProps } from './mapProps';
import { connect } from 'react-redux';


export class Component extends React.Component<Props & Actions> {

    render() {
        return (
            <h1>Component</h1>
        );
    }
}

export const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Component);

