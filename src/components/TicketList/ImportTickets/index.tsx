import * as React from 'react';
import { Props, Actions, mapStateToProps, mapDispatchToProps } from './mapProps';
import { connect } from "react-redux";


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
            reader.readAsText(file);
        }
    }

    render() {
        return (
            <React.Fragment>
                <input type="file" id="import" onChange={this.getFile.bind(this)} />
            </React.Fragment>
        );
    }
}

export const ConnectedImportTickets = connect<Props, Actions>(mapStateToProps, mapDispatchToProps)(ImportTickets);

