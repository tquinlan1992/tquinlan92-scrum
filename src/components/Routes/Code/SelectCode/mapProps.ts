import { AppState } from "@headless/store";
import { selectCodeActions } from "./redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from 'typescript-fsa';

export const mapStateToProps = (state: AppState) => {
    return {
    };
};

export type Props = ReturnType<typeof mapStateToProps>;

export function mapDispatchToProps(dispatch: ThunkDispatch<AppState, undefined, AnyAction>) {
    return {
        loadCodeOptions: () => dispatch(selectCodeActions.loadCodeOptions)
    }
};

export type MapDispatchToProps = typeof mapDispatchToProps;

export type Actions = ReturnType<typeof mapDispatchToProps>;