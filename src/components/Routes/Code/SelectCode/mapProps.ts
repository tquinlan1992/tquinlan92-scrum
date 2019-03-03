import { AppState } from "@headless/store";
import { selectCodeActions } from "./redux";
import { AppStateThunkDispatch } from "@src/utils";

export const mapStateToProps = (state: AppState) => {
    return {
        options: state.codeState.selectCode.options
    };
};

export type Props = ReturnType<typeof mapStateToProps>;

export function mapDispatchToProps(dispatch: AppStateThunkDispatch) {
    return {
        loadCodeOptions: () => dispatch(selectCodeActions.loadCodeOptions())
    }
};

export type Actions = ReturnType<typeof mapDispatchToProps>;