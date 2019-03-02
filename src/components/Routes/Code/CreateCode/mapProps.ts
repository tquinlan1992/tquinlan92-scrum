import { AppState } from "@headless/store";
import { createCodeActions } from "./redux";

export const mapStateToProps = (state: AppState) => {
    return {
        code: state.codeState.createCode.code
    };
};

export type Props = ReturnType<typeof mapStateToProps>;

export const mapDispatchToProps = {
    saveCode: createCodeActions.code
};

export type Actions = typeof mapDispatchToProps;