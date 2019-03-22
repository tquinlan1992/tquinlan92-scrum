import * as React from 'react';
import { Props, Actions, mapStateToProps, mapDispatchToProps } from './mapProps';
import { connect } from "react-redux";
import { Button } from '@material-ui/core';
import { Omit } from 'lodash';
import { Ticket } from '@headless/database/PouchWrapper';

interface ActionsNoThunk extends Omit<Actions, 'importTickets'> {
    importTickets: (tickets: Ticket[]) => void;
}

export class ImportTickets extends React.Component<Props & ActionsNoThunk> {
    getFile() {
        const input = document.getElementById('file-upload-button');
        if (input) {
            var reader = new FileReader();
            reader.onload = () => {
                var text = reader.result;
                const tickets = JSON.parse(text as string);
                this.props.importTickets(tickets);
            };
            const file = (input as any).files[0];
            if (file) {
                reader.readAsText(file);
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <input
                    id="file-upload-button"
                    type="file"
                    hidden
                    onChange={this.getFile.bind(this)}
                />
                <label htmlFor="file-upload-button">
                    <Button color="primary" variant="contained" component="span" >
                        Import
                    </Button>
                </label>
            </React.Fragment>
        );
    }
}

export const ConnectedImportTickets = connect(mapStateToProps, mapDispatchToProps)(ImportTickets);

