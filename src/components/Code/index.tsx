import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';
import { Button } from '@material-ui/core';
import { getRemoteDb } from "@headless/database/pouch";

interface Props {
    code: string;
    loadCode?: () => void;
    saveCode: (newCode: string) => void;
}

export class Code extends React.Component<Props> {

    state = {
        tickets: [],
        console: '',
        evalComponents: []
    }

    componentDidMount() {
        this.props.loadCode && this.props.loadCode();
    }

    onCodeChange(newCode: string) {
        this.props.saveCode(newCode);
    }

    consoleLog(text: string) {
        this.setState({console: text});
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
            this.setState({evalComponents});
        } catch(e) {

        }
        // eval(`(${this.props.code})('created with eval function')`);
    }

    getEvalComponent({type, value}: {type: string; value: any;}) {
        switch(type) {
            case 'label':
                return <h1>{value}</h1>
            default: 
                return null;
        }
    }

    render() {
        return (
            <React.Fragment>
            <MonacoEditor
                width="800"
                height="600"
                language="javascript"
                theme="vs-dark"
                value={this.props.code}
                onChange={this.onCodeChange.bind(this)}
            />
            <Button onClick={this.run.bind(this)}>Run</Button>
            <textarea value={this.state.console} />
            {this.state.evalComponents.map(evalComponent => {
                return this.getEvalComponent(evalComponent);
            })}
            </React.Fragment>
        );
    }
}
