import * as React from 'react';
import { Props, Actions, mapStateToProps, mapDispatchToProps } from './mapProps';
import { connect, Omit } from "react-redux";
import { getRemoteDb } from "@headless/database/pouch";
import { SelectCodeConnect } from '../SelectCode';
import { Code } from '@components/Code';

interface ActionsNoThunk extends Omit<Actions, 'loadCode' | 'saveCode'> {
    loadCode: () => void;
    saveCode: (newCode: string) => void;
}

export class EditCode extends React.Component<Props & ActionsNoThunk> {

    state = {
        tickets: [],
        console: '',
        evalComponents: []
    }

    componentDidMount() {
        this.props.loadCode();
    }

    onCodeChange(newCode: string) {
        this.props.saveCode(newCode);
    }

    consoleLog(text: string) {
        this.setState({ console: text });
    }

    async run() {
        const db = await getRemoteDb();
        const consoleLog = this.consoleLog.bind(this);
        consoleLog;
        db;
        db.getTickets()
        const evalCode = eval(`(function evalThis(){${this.props.code}})()`);
        let data = [];
        try {
            data = await evalCode.data();
            const evalComponents = evalCode.components(data);
            this.setState({ evalComponents });
        } catch (e) {

        }
        // eval(`(${this.props.code})('created with eval function')`);
    }

    getEvalComponent({ type, value }: { type: string; value: any; }) {
        switch (type) {
            case 'label':
                return <h1>{value}</h1>
            default:
                return null;
        }
    }

    render() {
        const codeProps = {
            code: this.props.code,
            saveCode: this.props.saveCode,
            loadCode: this.props.loadCode
        }
        return (
            <React.Fragment>
                <SelectCodeConnect />
                <Code {...codeProps} />
            </React.Fragment>
        );
    }
}

export const EditCodeConnected = connect(mapStateToProps, mapDispatchToProps)(EditCode);

