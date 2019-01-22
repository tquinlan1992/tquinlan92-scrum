import * as React from 'react';
import { Props, Actions, mapStateToProps, mapDispatchToProps } from './mapProps';
import { connect } from "react-redux";


export class Component extends React.Component<Props & Actions> {

    render() {
        return (

        );
    }
}

export const connectedComponent = connect<Props, Actions>(mapStateToProps, mapDispatchToProps)(Component);

