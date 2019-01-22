import { AppState } from "@headless/store";
import { actions } from './redux';

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
    addTicket: actions.addTicket,
    setAddTicketState: actions.set,
    reset: actions.reset
};

export type ComponentActions = typeof mapDispatchToProps;