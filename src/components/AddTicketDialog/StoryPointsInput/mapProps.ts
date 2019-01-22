import { AppState } from "@headless/store";
import { addTicketDialogActions } from '../redux';

export const mapStateToProps = ({ addTicket }: AppState) => {
    return {
        storyPoint: addTicket.storyPoint
    };
};

export type Props = ReturnType<typeof mapStateToProps>;

export const mapDispatchToProps = {
    setAddTicketState: addTicketDialogActions.set
};

export type Actions = typeof mapDispatchToProps;