import { TicketListConnected } from "@components/TicketList";
import * as React from "react";
import { Route, Redirect, Switch } from "react-router";
import { ConnectedImportExport } from "./ImportExport";
import { ConnectedCode } from "./Code";

export const paths = {
    feed: {
        path: '/feed'
    },
    import_export: {
        path: '/import_export'
    },
    code: {
        path: '/code'
    }
}

export function Routes() {
    return (
            <Switch>
                <Route exact path={paths.feed.path} component={TicketListConnected} />
                <Route exact path={paths.import_export.path} component={ConnectedImportExport} />
                <Route exact path={paths.code.path} component={ConnectedCode} />
                <Redirect to='/feed'/>
            </Switch>
    );
}
