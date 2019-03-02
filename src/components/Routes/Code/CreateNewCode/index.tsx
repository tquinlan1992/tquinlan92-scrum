import * as React from 'react';
import { Props, Actions, mapStateToProps, mapDispatchToProps } from './mapProps';
import { appStateConnect } from '@src/utils';


export class CreateNewCode extends React.Component<Props & Actions> {

    render() {
        return (
            <h1>Hey From the Create New Code Page</h1>
        );
    }
}

export const CreateNewCodeConnect = appStateConnect<Props, Actions, {}>(mapStateToProps, mapDispatchToProps)(CreateNewCode);

