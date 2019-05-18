import * as React from 'react';
import { Props, Actions, mapStateToProps, mapDispatchToProps } from './mapProps';
import { connect, Omit } from "react-redux";
import { Button } from '@material-ui/core';

interface ComponentActionsNoThunk extends Omit<Actions, 'exportTickets'> {
    exportTickets: () => void;
}

export class ExportButton extends React.Component<Props & ComponentActionsNoThunk> {

    render() {
        return (
            <Button color="primary" variant="contained" onClick={this.props.exportTickets}> Export </Button>
        );
    }
}

export const ConnectedExportButton = connect(mapStateToProps, mapDispatchToProps)(ExportButton);

