import * as React from 'react';
import { Props, Actions, mapStateToProps, mapDispatchToProps } from './mapProps';
import { connect } from "react-redux";
import { ConnectedExportButton } from './ExportButton';
import { ConnectedImportTickets } from './ImportTickets';
import { AppState } from '@headless/store';


export class ImportExport extends React.Component<Props & Actions> {

    render() {
        return (
            <React.Fragment>
                <ConnectedImportTickets />
                <ConnectedExportButton />
            </React.Fragment>
        );
    }
}

export const ConnectedImportExport = connect<Props, Actions, void, AppState>(mapStateToProps, mapDispatchToProps)(ImportExport);

