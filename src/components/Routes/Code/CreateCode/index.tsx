import * as React from 'react';
import { Props, Actions, mapStateToProps, mapDispatchToProps } from './mapProps';
import { Code } from '@components/Code';
import { connect } from 'react-redux';


export class CreateCode extends React.Component<Props & Actions> {

    render() {
        const codeProps = {
            code: this.props.code,
            loadCode: () => this.props.saveCode(''),
            saveCode: this.props.saveCode
        }
        return (
            <Code {...codeProps}/>
        );
    }
}

export const CreateCodeConnect = connect(mapStateToProps, mapDispatchToProps)(CreateCode);

