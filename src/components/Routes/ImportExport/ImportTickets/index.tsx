import * as React from 'react';
import { Props, Actions, mapStateToProps, mapDispatchToProps } from './mapProps';
import { connect } from "react-redux";
import { Button } from '@material-ui/core';

export class ImportTickets extends React.Component<Props & Actions> {
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
                    <Button component="span" >
                        Import
                    </Button>
                </label>
            </React.Fragment>
        );
    }
}

export const ConnectedImportTickets = connect<Props, Actions>(mapStateToProps, mapDispatchToProps)(ImportTickets);

