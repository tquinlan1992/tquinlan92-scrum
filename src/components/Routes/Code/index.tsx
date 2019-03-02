import React from 'react';
import { EditCodeConnected } from "./EditCode";
import { history } from '@src/headless/store/middleware/router';
import { Button } from '@material-ui/core';
import { paths } from '../paths';

function CreateNewCodeButton() {
    return (
        <Button onClick={() => { history.push(paths.code.children.newEntry.path) }}>
            Create New Code
        </Button>
    ); 
}

export function CodePage() {
    return (
        <React.Fragment>
            <CreateNewCodeButton />
            <br/>
            <EditCodeConnected />
        </React.Fragment>
    )
}