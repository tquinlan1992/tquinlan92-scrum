import * as React from 'react';
import { Props, Actions, mapStateToProps, mapDispatchToProps } from './mapProps';
import { connect } from "react-redux";
import { Button } from '@material-ui/core';



export class ExportButton extends React.Component<Props & Actions> {

    render() {
        return (
            <Button onClick={this.props.exportTickets}> Export </Button>
        );
    }
}

export const ConnectedExportButton = connect<Props, Actions>(mapStateToProps, mapDispatchToProps)(ExportButton);

