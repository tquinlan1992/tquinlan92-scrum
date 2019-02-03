import * as React from 'react';
import { Props, Actions, mapStateToProps, mapDispatchToProps } from './mapProps';
import { connect } from "react-redux";
import { Input } from '@material-ui/core';


export class ImportTickets extends React.Component<Props & Actions> {
    getFile() {
        const input = document.getElementById('import');
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
            <Input placeholder='Import Tickets' type="file" id="import" onChange={this.getFile.bind(this)} />
        );
    }
}

export const ConnectedImportTickets = connect<Props, Actions>(mapStateToProps, mapDispatchToProps)(ImportTickets);

