import { AppState } from "@src/headless/store/types";
import { AppStateThunkDispatch } from "@src/utils";

export const mapStateToProps = (state: AppState) => {
    return {
        closedTickets: state.ticketList.closedTickets
    };
};

export type Props = ReturnType<typeof mapStateToProps>;

export function mapDispatchToProps(dispatch: AppStateThunkDispatch) {
    return {
        
    }
};

export type Actions = ReturnType<typeof mapDispatchToProps>;