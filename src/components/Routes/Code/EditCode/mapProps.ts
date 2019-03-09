import { AppState } from "@headless/store";
import { editCodeActions } from './redux'
import { AppStateThunkDispatch } from "@src/utils";

export const mapStateToProps = ({codeState}: AppState) => {
    const { code, _id } = codeState.editCode;
    return {
        code,
        _id
    };
};

export type Props = ReturnType<typeof mapStateToProps>;

export function mapDispatchToProps(dispatch: AppStateThunkDispatch) {
    return {
        loadCode: (id: string) => { dispatch(editCodeActions.loadCode(id)) },
        saveCode: (newCode: string) => { dispatch(editCodeActions.saveCode(newCode)) }
    }
};

export type Actions = ReturnType<typeof mapDispatchToProps>;