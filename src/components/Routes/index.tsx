import { TicketListConnected } from "@components/TicketList";
import * as React from "react";
import { Route, Redirect, Switch } from "react-router";

export function Routes() {
    return (
        <Switch>
            <Route exact path={"/feed"} component={TicketListConnected} />
            <Redirect to='/feed' />
        </Switch>
    );
}