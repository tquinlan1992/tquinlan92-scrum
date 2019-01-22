import { AppState } from "@headless/store";
import { addTicketDialogActions } from './redux';

export interface AddTicketDialogOwnProps {
    onRequestClose: () => void;
    open: boolean;
    onSubmit: () => void;
}

export const mapStateToProps = ({ addTicket }: AppState, ownProps: AddTicketDialogOwnProps) => {
    return {
        ...addTicket,
        ...ownProps
    };
};

export type Props = ReturnType<typeof mapStateToProps>; 

export const mapDispatchToProps = {
    addTicket: addTicketDialogActions.addTicket,
    setAddTicketState: addTicketDialogActions.set,
    reset: addTicketDialogActions.reset
};

export type ComponentActions = typeof mapDispatchToProps;