import { Dictionary, mapValues, omit, merge } from "lodash";
import { Reducer, AnyAction } from "redux";
import { makeSimpleReducer, ActionCreator } from "tquinlan92-typescript-redux-utils";

export function getActions<T extends { [key: string]: {actions?: Dictionary<any>} }>(creators: T): { [P in keyof T]: T[P]['actions'] } {
    return mapValues(creators, "actions") as { [P in keyof T]: T[P]['actions'] };
} 

export function makeNestedSimpleReducerSimpleActions<AppState>(state: any) {
    const actionsReducers = mapValues(state, (value, key) => {
        return makeSimpleReducer(key, omit(value, 'actions'));
    });//{ [P in keyof T]: T[P]['actionCreator'] 
    const reducers = mapValues(actionsReducers, 'reducer');
    const actions = getActions(actionsReducers);

    return {
        actions,
        reducers
    } as {
        reducers: {
            [P in keyof AppState]: Reducer<AppState[P], AnyAction>
        };
        actions: {
            [P in keyof AppState]: {
                [A in keyof AppState[P]]: ActionCreator<AppState[P][A]>
            } & {
                reset: ActionCreator<null>;
                setAll: ActionCreator<AppState[P]>;
                set: ActionCreator<Partial<AppState[P]>>;
            } & {
                [A in keyof AppState[P]]: AppState[P][A]
            }
        };
    };
}

export function makeNestedSimpleStore<State, ThunkActions>(state: State, thunkActions?: ThunkActions) {
    const { actions: actions1, reducers: reducers2 } = makeNestedSimpleReducerSimpleActions<State>(state);
    const actionsWithThunks = merge(actions1, thunkActions);
    return {
        actions: actionsWithThunks,
        reducers: reducers2
    }
}