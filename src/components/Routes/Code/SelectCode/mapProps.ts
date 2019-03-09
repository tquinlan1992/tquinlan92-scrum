import { AppState } from "@headless/store";
import { selectCodeActions } from "./redux";
import { AppStateThunkDispatch } from "@src/utils";
import { editCodeActions } from "../EditCode/redux";

export const mapStateToProps = (state: AppState) => {
    return {
        options: state.codeState.selectCode.options,
        _id: state.codeState.editCode._id
    };
};

export type Props = ReturnType<typeof mapStateToProps>;

export function mapDispatchToProps(dispatch: AppStateThunkDispatch) {
    return {
        loadCodeOptions: () => dispatch(selectCodeActions.loadCodeOptions()),
        selectCode: (id: string) => dispatch(editCodeActions.loadCode(id))
    }
};

export type Actions = ReturnType<typeof mapDispatchToProps>;