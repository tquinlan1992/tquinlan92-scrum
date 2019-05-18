import { AppState } from "@headless/store/types";
import { storeActions } from "@headless/store";

export function mapStateToProps({ addTicket }: AppState) {
    return {
        storyPoint: addTicket.storyPoint
    };
};

export type Props = ReturnType<typeof mapStateToProps>;

export const mapDispatchToProps = {
    setAddTicketState: storeActions.addTicket.set
};

export type Actions = typeof mapDispatchToProps;