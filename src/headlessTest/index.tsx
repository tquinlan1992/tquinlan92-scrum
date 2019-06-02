import { store } from '../headless';
import { loadingThunkActions } from '../components/Loading/redux/thunkActions/index';
import { Dispatch } from 'redux';
import ReactDOM from 'react-dom';
import React from 'react';
import 'mocha/mocha.css';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Button } from '@material-ui/core';

const getState = store.getState;
const dispatch: Dispatch<any> = store.dispatch;

function MochaCode() {
    return (
        <React.Fragment>
            <div id="mocha"></div>
        </React.Fragment>
    );
}

function sum(a: number, b: number) {
    return a + b;
}

function mochaRun() {
    mocha.setup('bdd');
    mocha.checkLeaks();
    mocha.run();
}

ReactDOM.render(
    <React.Fragment>
        <Button color="primary" variant="contained" onClick={mochaRun}> Start Tests </Button>
        <MochaCode />
    </React.Fragment>
    , document.getElementById('app')
);

mocha.setup('bdd');
mocha.checkLeaks();

describe('test backlog tickets', () => {
    it('should have zero tickets', async () => {
        await dispatch(loadingThunkActions.loadApp('dev'));
        const state = getState();
        const backlogTickets = state.ticketList.backlogTickets;
        console.log('state', getState());
        expect(backlogTickets.length).to.equal(0);
    });
});
