import { TicketListConnected } from "@components/TicketList";
import * as React from "react";
import { Route, Redirect, Switch } from "react-router";
import { ConnectedImportExport } from "./ImportExport";

export function Routes() {
    return (
            <Switch>
                <Route exact path={"/feed"} component={TicketListConnected} />
                <Route exact path={"/import_export"} component={ConnectedImportExport} />
                <Redirect to='/feed'/>
            </Switch>
    );
}
