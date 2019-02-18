import { AppState } from "@headless/store";
import { codeActions } from './redux'

export const mapStateToProps = ({codeState}: AppState) => {
    return {
        code: codeState.code
    };
};

export type Props = ReturnType<typeof mapStateToProps>;

export const mapDispatchToProps = {
    setCode: (code: string) => codeActions.set({code})
};

export type Actions = typeof mapDispatchToProps;