import { AppState } from "@headless/store";

export const mapStateToProps = (state: AppState) => {
    return {
    };
};

export type Props = ReturnType<typeof mapStateToProps>;

export const mapDispatchToProps = {

};

export type Actions = typeof mapDispatchToProps;