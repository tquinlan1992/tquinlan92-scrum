import * as React from "react";
import { Route, Redirect, Switch } from "react-router";
import { map } from "lodash";
import { paths } from "./paths";

interface Paths {
    [index: string]: Path
} 

interface Path {
    path: string;
    component: any;
    children?: Paths;
}

function getRoutesFromPaths(paths: Paths) {
    return map(paths, path => {
        let routesFromPath= [<Route exact path={path.path} component={path.component} />];
        if (path.children) {
            routesFromPath = routesFromPath.concat(...getRoutesFromPaths(path.children))
        }
        return routesFromPath;
    });
}

const routes = getRoutesFromPaths(paths)

export function Routes() {
    return (
            <Switch>
                {routes}
                <Redirect to='/feed'/>
            </Switch>
    );
}
