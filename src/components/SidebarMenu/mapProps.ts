import { AppState } from "@headless/store";
import { RouteComponentProps } from "react-router";
import { get } from "lodash";

export const mapStateToProps = (state: AppState, ownProps: RouteComponentProps) => {
    return {
        currentPath: get(ownProps, 'location.pathname') as string | undefined,
    };
};

export type Props = ReturnType<typeof mapStateToProps>;

export const mapDispatchToProps = {

};

export type Actions = typeof mapDispatchToProps;